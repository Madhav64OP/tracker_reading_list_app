import { nanoid } from "nanoid";

import * as webllm from "@mlc-ai/web-llm";

let engine = null;
const selectedModel = "gemma-2-2b-it-q4f16_1-MLC";

// Initialize the engine when service worker starts
async function initializeEngine() {
    if (engine) return engine;

    try {
        engine = await webllm.CreateMLCEngine(selectedModel, {
            initProgressCallback: (initProgress) => {
                console.log("Service Worker Init Progress: ", initProgress);
                chrome.runtime.sendMessage({
                    type: 'INIT_PROGRESS',
                    progress: initProgress
                }).catch(() => { });
            }
        });
        console.log("Engine initialized in service worker");
        return engine;
    } catch (error) {
        console.error("Error initializing engine in service worker:", error);
        throw error;
    }
}


async function handleSummarize(data) {
    if (!data?.title) {
        throw new Error("No title provided");
    }

    const currentEngine=await initializeEngine();

    const engineeredPrompt = `You're an intelligent summarizer for a productivity and learning platform.

Given only the title of a video or article, generate:
- a self-created short **label or title** that reflects the main theme of the content (but is not a copy of the original)
- a one-line **insight** that reflects the user's interest or takeaway
- relevant **tags**

Return in JSON:

{
  generatedTitle: "<short headline, 3–6 words>",
  insight: "<reflective line about interest or takeaway>",
  tags: ["...", "..."]
}

If the input is vague like just "YouTube", return { skip: true }

Input:
Title: ${data.title}
`;
    const reply = await currentEngine.chat.completions.create({
            messages: [{ role: "user", content: engineeredPrompt }],
            stream: false,
        });
    
    const content=reply.choices[0]?.message?.content;
    if(!content) throw new Error("No response from the LLM model")
    try {
        return JSON.parse(content)
        // return reply.choices[0]?.message?.content || null;
    } catch (error) {
        console.error("Error during generation:", error);
        return {rawResponse:content,error:"Failed to parse JSON response"}
    }
}

//handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received message:", request);

    if (request.type === "summarize") {
        handleSummarize({ title: request.title })
            .then(result => {
                sendResponse({ success: true, data: result, site:request.site });
            })
            .catch(error => {
                console.error("Summarization failed:", error);
                sendResponse({ success: false, error: error.message,site:request.site });
            });

        return true; // Required to keep the sendResponse async
    }
});


chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    chrome.tabs.get(details.tabId, (tab) => {
        if (!tab || !tab.url.includes("youtube.com/watch")) return;

        chrome.storage.sync.get(["yt"], (prefs) => {
            if (prefs.yt) {
                handleYouTubeTab(tab);
            }
        })
    })
}, { url: [{ hostContains: "youtube.com" }] });


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        chrome.storage.sync.get(["articles"], (prefs) => {
            if (prefs.articles && isLikelyArticle(tab.url)) {
                saveArticleData(tab);
            }
        });
    }
});



const isLikelyArticle = (url) => {
    const articleSites = ["medium.com", "substack.com", "wikipedia.org", "quora.com"]
    return articleSites.some(host => url.includes(host));
};

const handleYouTubeTab = async (tab) => {
    setTimeout(() => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => document.title,
        }, (results) => {
            const titleFromDom = results?.[0]?.result || "Untitled";

            const vidID = nanoid();
            if (!vidID) return;

            const data = {
                type: "youtube",
                url: tab.url,
                title: titleFromDom,
                time: Date.now(),
                vidID
            }

            chrome.storage.local.get(['content'], (res) => {
                const newData = res.content || [];

                const alreadyExists = newData.some(
                    (item) => item.type == "youtube" && item.vidID == vidID
                );

                if (!alreadyExists) {
                    newData.push(data);
                    chrome.storage.local.set({ content: newData });
                } else {
                    console.log("Duplicate Video Skipped", vidID);
                }
            })
        });
    }, 1000)
}



const saveArticleData = async (tab) => {
    setTimeout(() => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => document.title
        }, (results) => {
            const titleFromDom = results?.[0]?.result || "Untitled";

            const data = {
                type: "article",
                url: tab.url,
                title: titleFromDom,
                time: Date.now(),
            };

            chrome.storage.local.get(['content'], (res) => {
                const newData = res.content || [];

                const alreadyExists = newData.some((item) => item.type == "article" && item.url == data.url)

                if (!alreadyExists) {
                    newData.push(data);
                    chrome.storage.local.set({ content: newData });
                }
                else {
                    console.log("Duplicate Article Skipped", data.url)
                }

            });
        })
    }, 1000)
}