import React, { useEffect, useState } from 'react'
import Header from './Header';
import axios from 'axios';

function Toggle() {
    const [yt, setYt] = useState(false);
    const [articles, setArticles] = useState(false);
    const [others, setOthers] = useState(false);
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [summaries, setSummaries] = useState([])

    let contentToUse = null;

    const sendMessagePromise = (message) => {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, (response) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError)
                }
                else {
                    resolve(response);
                }
            })
        })
    }

    const handleSummarizeData = async () => {
        console.log("Summary button clicked");
        setIsLoading(true);

        try {
            chrome?.storage?.local?.get(["content"], (result) => {
                console.log("Saved Content:", result.content);
                contentToUse = result.content;
                console.log("Got the contentToUSe from chrome")
            });
            let count = 1;
            for (const ct in contentToUse) {
                try {
                    const response = await sendMessagePromise({
                        type: "summarize",
                        title: contentToUse[ct].title,
                        site: contentToUse[ct].type
                    })
                    console.log("Content Type Check 1- ",contentToUse[ct].type)
                    if (response.success) {
                        const newSumm = { data: response.data, site: contentToUse[ct].type };
                        const summs = [...summaries, newSumm];
                        console.log(`Summary Individual:${count}`, response.data);
                        setSummaries(summs);
                        console.log("Sending data to backend now");
                        await sendSummariesToBackend(newSumm);
                        count++;
                        console.log(`Data Managing done for ${count}`);
                    } else {
                        console.error("Error with individual:", response.error);
                    }
                } catch (error) {
                    console.error("error with all data", error)
                }
            }
        } catch (error) {
            console.error("error getting content from chrome storage", error)
            return
        }

        setIsLoading(false);
        console.log("sent all the data to backend");
    }

    const sendSummariesToBackend = async (data) => {
        console.log("Summary Data Sent from frontend");
        try {
            console.log("Content Type Check 2- ",data.site)
            const response=await axios.post("http://localhost:3000/set-summary", {
                generatedTitle: data.data.generatedTitle,
                insight: data.data.insight,
                tags: data.data.tags,
                site: data.site
            }, { withCredentials: true });
            if(response.success) console.log("Sent the individual data to backend")
        } catch (error) {
            console.error("error realted to sending req for sumamry", error)
        }
        console.log("Backend work done for individual process now");
    }

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

    const toggleChange = (key, valueSetter, currVal) => {
        const newVal = !currVal;
        valueSetter(newVal);
        chrome.storage.sync.set({ [key]: newVal });
    }

    return (
        <>
            <Header />
            <div id="main-body" className='flex flex-col bg-black gap-2 text-white w-[375px] h-[350px] overflow-auto pt-4'>
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
                            {/* <div id="Others" className='flex flex-row justify-center items-center gap-1 border-2 rounded-xl px-3  border-red-500'>
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
                            </div> */}
                        </div>
                    </div>
                </div>
                <div id="footer" className='flex justify-center items-center text-xs py-2 font-semibold space-x-2 gap-1'>
                    Check out your social feed at <p className='font-medium text-black rounded-sm bg-red-500 px-1'> SocialME</p> web app.
                </div>
                <div className='flex justify-center mt-2'>
                    <button
                        onClick={handleSummarizeData}
                        disabled={isLoading}
                        className={`px-2 py-1 rounded-lg text-black  font-bold  hover:opacity-60 transition-all duration-300 ${isLoading
                            ? 'bg-gray-500 cursor-not-allowed '
                            : 'bg-red-500 '
                            }`}
                    >
                        {isLoading ? 'Summarizing...' : 'Summarize All the Data'}
                    </button>
                </div>

            </div>
        </>
    )
}

export default Toggle