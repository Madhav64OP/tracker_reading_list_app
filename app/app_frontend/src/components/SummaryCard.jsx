import { nanoid } from 'nanoid'
import React from 'react'

function SummaryCard({ data }) {
  return (
    <>
      {data.generatedTitle && data.insight  &&  (
        <div id="main-card" className='w-[300px] h-[250px] bg-gray-800 text-white rounded-2xl px-4 py-4 w-250px h-350px max-w-[300px] max-h-[400px] overflow-hidden gap-3 flex justify-center items-center flex-col'>
        <div id="title" className='text-xl text-white font-bold'>{data.generatedTitle}</div>
        <div id="insghts" className='text-sm'>{data.insight}</div>
        <div id="tags" className='flex flex-row flex-wrap gap-2'>
          {data.tags.map((tag) => (
            <div id={nanoid()} className='bg-black  animate-glowRed text-red-500 text-xs font-[700] py-1 px-2 rounded-xl'>{tag}</div>
          ))}
          <div id="types" className='flex justify-center items-center flex-row gap-2 flex-wrap'>
            <h1 className='text-sm ml-3 text-white font-bold'>From :</h1>
            {data.site==="youtube" && (
              <div className='bg-black border-[1px] border-red-500 text-red-500 rounded-2xl px-1'>YouTube</div>
            )}
            {data.site==="article" && (
              <div className='bg-yellow-300 border-[1px] border-white text-black rounded-2xl px-1'>Articles</div>
            )}
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default SummaryCard