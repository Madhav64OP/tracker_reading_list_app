import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import NavBar from './NavBar'

function Search() {
    const [searchInput, setSearchInput] = useState("")
    const [users, setUsers] = useState([
        {
            name: "abc",
            type: ["youtube", "articles"]
        },
        {
            name: "xyz",
            type: ["youtube"]
        },
        {
            name: "pqr",
            type: ["youtube", "articles"]
        }
    ])

    return (
        <>
        <NavBar/>
            <div id="main-search" className='flex justify-center items-center gap-3 flex-col text-red-500'>
                <div id="heading" className='flex justify-start'>
                    <h1 className='text-6xl font-bold py-3 text-white'>Search for Users</h1>
                </div>
                <div id="search-box" className='flex justify-between my-3 px-4 py-2 items-center gap-2 rounded-2xl w-full md:max-w-[600px] border-gray-600 border-[1.6px] text-white'>
                    <input type="text" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} className='bg-transparent outline-none w-full' placeholder='Search for Users' />
                    <i className="fa-solid fa-xmark hover:cursor-pointer hover:scale-105 hover:text-red-500 text-lg transition-all duration-200 px-1" onClick={()=>setSearchInput("")}></i>
                    <i className="fa-solid fa-magnifying-glass hover:cursor-pointer hover:scale-105 hover:text-red-500 text-lg transition-all duration-200 px-1"></i>
                </div>
                <div id="results-heading" className='flex'>
                    {users.length > 0 && (
                        <h1 className='flex justify-start text-2xl text-white'>Results for the Search</h1>
                    )}
                </div>
                <div id="search-results" className='flex flex-col justify-center items-center w-full md:max-w-[700px] border-2 border-gray-600 rounded-lg  px-2'>
                    {users.map((user) => (
                        <div id={nanoid()} className='bg-black text-red  w-full border-b-gray-600 py-2 px-2 border-b-[0.1px] flex flex-row justify-between items-center hover:opacity-55 transition-all duration-300 hover:cursor-pointer'>
                            <div id="username" className=''>{user.name}</div>
                            <div id="tags" className='  flex flex-row gap-3'>
                                {user.type.includes("youtube") && <div className='bg-black border-[1px] border-red-500 text-red-500 rounded-2xl px-1'>YouTube</div>}
                                {user.type.includes("articles") && <div className='bg-yellow-300 text-black rounded-2xl px-1'>Articles</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Search