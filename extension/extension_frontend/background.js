import { nanoid } from "nanoid";

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

// const handleYouTubeTab = (tab) => {
//     chrome.scripting.executeScript({
//         target:{tabID: tab.id},
//         func:()=>document.title,
//     },(results)=>{

//     }
// return new Promise((resolve)=>{

//     const getTitleFromDOM=()=>{
//         const element=document.querySelector('ytd-watch-metadata h1.ytd-watch-metadata yt-formatted-string');
//         return element?.textContent.trim() || document.title;
//     }

//     let lastTitle=getTitleFromDOM();
//     let stableCount=0;

//     const interval=setInterval(()=>{
//         const current =getTitleFromDOM();
//         if(current!=lastTitle){
//             lastTitle=current;
//             stable=0;
//         }
//         else{
//             stable++;
//         }

//         if(stable>=3){
//             clearInterval(interval);
//             resolve(current);
//         }

//     },100);

// });
// }
//     })
// }

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


// const handleYouTubeTab = async (tab) => {
//     setTimeout(() => {
//         chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             func: () => document.title,
//         }, (results) => {
//             const titleFromDom = results?.[0]?.result || "Untitled";


//             const vidID = new URL(tab.url).searchParams.get("v");
//             if (!vidID) return;

//             const data = {
//                 type:"youtube",
//                 url: tab.url,
//                 title: titleFromDom,
//                 time: Date.now(),
//                     vidID
//         }

//     chrome.storage.local.get(['content'], (res) => {
//             const newData = res.content || [];

//             const alreadyExists = newData.some(
//                 (item) => item.type == "youtube" && item.vidID == vidID
//             );

//             if (!alreadyExists) {
//                 newData.push(data);
//                 chrome.storage.local.set({ content: newData });
//             } else {
//                 console.log("Duplicate Video Skipped", vidID);
//             }

//         })
//         });

// },1000)
// }

const saveArticleData = async (tab) => {
    setTimeout(() => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => document.title
        }, (results) => {
            const titleFromDom=results?.[0]?.result || "Untitled";

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
    },1000)
}