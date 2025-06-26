import React, { useCallback, useEffect, useState } from 'react'
import Header from './Header';
import * as webllm from "@mlc-ai/web-llm";

// import useWebLLMSummarizer from '../web-llm/WebLLMSummarizer';

function Toggle() {
    const [yt, setYt] = useState(false);
    const [articles, setArticles] = useState(false);
    const [others, setOthers] = useState(false);
    const [content, setContent] = useState([]);
    const [engine, setEngine] = useState(null);

    // const summarize = useWebLLMSummarizer();

    //web-llm code
    
    useEffect(() => {
        const selectedModel = "gemma-2-2b-it-q4f16_1-MLC";
        webllm.CreateMLCEngine(
            selectedModel,
            {
            initProgressCallback: (initProgress) => {
                console.log("initProgress",initProgress);
            }
        }).then(engine => {
            setEngine(engine)
        })
    }, [])

//     const generate = useCallback(async (data) => {
//         if (!data || !engine) return;
//         const engineeredPromt = `You're an intelligent summarizer for a productivity and learning platform.

// Given only the title of a video or article, generate:
// - a self-created short **label or title** that reflects the main theme of the content (but is not a copy of the original)
// - a one-line **insight** that reflects the user’s interest or takeaway
// - relevant **tags**

// Return in JSON:

// {
//   "generatedTitle": "<short headline, 3–6 words>",
//   "insight": "<reflective line about interest or takeaway>",
//   "tags": ["...", "..."]
// }

// If the input is vague like just "YouTube", return { "skip": true }

// Input:
// Title: ${data.title}
// `
//         const reply = await engine.chat.completions.create({
//             messages: [{ role: "user", content: engineeredPromt }],
//             stream: false,
//         });
//         // setOutput(reply)
//         console.log(reply);
//         return reply.choices[0]?.message?.content || null;
//     },[engine])
    

    useEffect(() => {
        if (chrome?.storage?.sync) {
            chrome.storage.sync.get(["yt", "articles", "others"], (result) => {
                setYt(result.yt ?? false);
                setArticles(result.articles ?? false);
                setOthers(result.others ?? false);
            });
        }
    }, []);

    useEffect(() => {
        chrome?.storage?.local?.get(["content"], (result) => {
            console.log("Saved Content:", result.content);
            // const new_contents=[...content]
            // new_contents.push(content)
            // setContent(result.new_contents)
            if (result.content) {
                setContent(result.content)
            }
        })
    }, [])

    // useEffect(() => {
    //     //   SummarizeWithLLM(content)
    //     const summarizeAll = async () => {
    //         for (const c of content) {
    //             const output = await generate(c.title);
    //             console.log("LLM Summary Output", output);
    //         }
    //     };
    //     if (content.length > 0 && generate) {
    //         summarizeAll()
    //     }
    // }, [content, generate]);

    // const SummarizeWithLLM=(contents)=>{
    //     for(let c in contents){
    //         const output=useWebLLMSummarizer(c.title);
    //         console.log(output);
    //     }
    // }



    const toggleChange = (key, valueSetter, currVal) => {
        const newVal = !currVal;
        valueSetter(newVal);
        chrome.storage.sync.set({ [key]: newVal });
    }

    return (
        <>
            <Header />
            <div id="main-body" className='flex flex-col bg-black text-white w-[375px] h-[350px] overflow-auto pt-4'>
                <div id="heading" className='flex flex-row justify-center items-baseline gap-2 py-3 px-4'>
                    <h1 className='text-xl font-medium text-black rounded-lg bg-red-500 py-2 px-3'>SocialME </h1>
                    <p className='text-red-500 bg-black px-2 py-2 rounded-lg'>Extension</p>
                </div>
                <div id="options-menu" className='flex flex-col justify-center items-center px-3 py-2'>
                    <div id="sub-heading-menu" className='text-2xl pb-2 font-bold'>
                        Select the Options
                    </div>
                    <div id="options">
                        {/* YT Switch */}
                        <div className="flex flex-col items-center gap-2" id="options-main">
                            <div id="yt" className='flex flex-row justify-center items-center gap-1 border-2 rounded-xl px-3  border-red-500'>
                                <span className='font-semibold'>Track YouTube</span>
                                <div
                                    className={`w-14 h-8 scale-50 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300  ${yt ? 'bg-red-500' : 'bg-white'
                                        }`}
                                    onClick={() => toggleChange("yt", setYt, yt)}
                                >
                                    <div
                                        className={`bg-black w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${yt ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    ></div>
                                </div>
                            </div>
                            <div id="articles" className='flex flex-row justify-center items-center gap-1 border-2 rounded-xl px-3  border-red-500'>
                                <span className='font-semibold'>Track Articles</span>
                                <div
                                    className={`w-14 h-8 scale-50 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300  ${articles ? 'bg-red-500' : 'bg-white'
                                        }`}
                                    onClick={() => toggleChange("articles", setArticles, articles)}
                                >
                                    <div
                                        className={`bg-black w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${articles ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    ></div>
                                </div>
                            </div>
                            <div id="Others" className='flex flex-row justify-center items-center gap-1 border-2 rounded-xl px-3  border-red-500'>
                                <span className='font-semibold'>Track Others</span>
                                <div
                                    className={`w-14 h-8 scale-50 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300  ${others ? 'bg-red-500' : 'bg-white'
                                        }`}
                                    onClick={() => toggleChange("others", setOthers, others)}
                                >
                                    <div
                                        className={`bg-black w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${others ? 'translate-x-6' : 'translate-x-0'
                                            }`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="footer" className='flex justify-center items-center text-xs py-2 font-semibold space-x-2 gap-1'>
                    You can also check out your social feed at <p className='font-medium text-black rounded-sm bg-red-500 px-1'> SocialME</p> web app.
                </div>
            </div>
        </>
    )
}

export default Toggle