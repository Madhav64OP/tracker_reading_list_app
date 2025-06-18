import React, { useEffect, useState } from 'react'

function Toggle() {
    const [yt, setYt] = useState(false);
    const [articles, setArticles] = useState(false);
    const [others, setOthers] = useState(false);

    useEffect(() => {
      if(chrome?.storage?.sync){
        chrome.storage.sync.get(["yt","articles","others"],(result)=>{
        setYt(result.yt ?? false);
        setArticles(result.articles ?? false);
        setOthers(result.others ?? false);
      });
      }
    }, []);
    

    const toggleChange = (key,valueSetter,currVal)=>{
        const newVal=!currVal;
        valueSetter(newVal);
        chrome.storage.sync.set({[key]:newVal});
    }

    return (
        <>
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
                                    onClick={() => toggleChange("yt",setYt,yt)}
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
                                    onClick={() => toggleChange("articles",setArticles,articles)}
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
                                    onClick={() => toggleChange("others",setOthers,others)}
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