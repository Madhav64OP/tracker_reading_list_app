import React, { useEffect, useState } from 'react'
import Header from './Header'
import { nanoid } from 'nanoid';

function Collections() {
    const [collections, setCollections] = useState([])

    // const setNewCollections = (newCollect) => {
    //     const currentCollections = [...collections];
    //     currentCollections.push(newCollect)
    //     setCollections(currentCollections);
    // }

    useEffect(() => {
        chrome?.storage?.local?.get(['content'], (results) => {
            console.log("Results is this",results)
            if (results.content) {
                setCollections(results.content);
            }
        });
    }, []);


    return (
        <>
            <Header />
            <div id="collections" className='flex flex-col justify-center items-center bg-black w-[375px] h-[350px] overflow-scroll'>
                {collections.map((item)=>(
                    <div key={nanoid()} className='bg-black text-red-500 text-xs flex flex-row justify-center items-center'>
                        <div id="type" className='text-red-500 bg-black py-1 px-2 rounded-xl'>{(item.type)}</div>
                        <div id="title" className='text-white bg-black text-sx py-1 px-3 w-full'>{(item.title)}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Collections