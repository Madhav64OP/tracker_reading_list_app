import React, { useEffect, useState } from 'react'
import Header from './Header'
import { nanoid } from 'nanoid';

function Collections() {
    const [collections, setCollections] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        chrome?.storage?.local?.get(['content'], (results) => {
            console.log("Results is this", results)
            if (results.content) {
                setCollections(results.content);
            }
        });
    }, []);

    const handleDeleteChromeData = async () => {
        setIsLoading(true)
        chrome?.storage?.local?.remove(['content'], () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError)
            }
            setCollections([]);
            setIsLoading(false)
        });
    }

    return (
        <>
            <Header />
            <div id="main-collection" className='flex flex-col justify-center items-center bg-black'>
                <div id="btn" className='bg-black justify-center items-center py-1 px-2'>
                    <button className={`px-4 py-2 rounded-lg text-white transition-colors ${isLoading
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600'
                        }`} onClick={handleDeleteChromeData}>Clear My Data</button>
                </div>
                <div id="collections" className='flex flex-col justify-center items-center bg-black w-[375px] h-[350px] overflow-scroll'>
                    {collections.map((item) => (
                        <div key={nanoid()} className='bg-black text-red-500 text-xs flex flex-row justify-center items-center'>
                            <div id="type" className='text-red-500 bg-black py-1 px-2 rounded-xl'>{(item.type)}</div>
                            <div id="title" className='text-white bg-black text-sx py-1 px-3 w-full'>{(item.title)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Collections