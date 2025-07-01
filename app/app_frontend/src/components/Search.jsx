import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Search() {
    const [searchInput, setSearchInput] = useState("")
    const [users, setUsers] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/search-users?q=${searchInput}`,{withCredentials:true})
            if (response.data.success) {
                setUsers(response.data.users)
            }
            else {
                setErrorMsg(response.data.message)
                setTimeout(() => {
                    setErrorMsg("")
                }, 2500);
            }
        } catch (error) {
            console.error("Error realted to search", error)
        }
    }

    const searchBoxHandler = async (e) => {
        setSearchInput(e.target.value);
        handleSearch();
        console.log("Executed Search")
    }

    return (
        <>
            <NavBar />
            <div id="main-search" className='flex justify-center items-center gap-3 flex-col text-red-500'>
                <div id="heading" className='flex justify-start'>
                    <h1 className='text-6xl font-bold py-3 text-white'>Search for Users</h1>
                </div>
                <div id="search-box" className='flex justify-between my-3 px-4 py-2 items-center gap-2 rounded-2xl w-full md:max-w-[600px] border-gray-600 border-[1.6px] text-white'>
                    {errorMsg && (
                        <h1 className='text-3xl font-bold py-3 text-white'>{errorMsg}</h1>
                    )}
                    <input type="text" value={searchInput} onChange={searchBoxHandler} className='bg-transparent outline-none w-full' placeholder='Search for Users' />
                    <i className="fa-solid fa-xmark hover:cursor-pointer hover:scale-105 hover:text-red-500 text-lg transition-all duration-200 px-1" onClick={() => setSearchInput("")}></i>
                    <i className="fa-solid fa-magnifying-glass hover:cursor-pointer hover:scale-105 hover:text-red-500 text-lg transition-all duration-200 px-1" onClick={handleSearch}></i>
                </div>
                <div id="results-heading" className='flex'>
                    {users?.length > 0 && (
                        <h1 className='flex justify-start text-2xl text-white'>Results for the Search</h1>
                    )}
                </div>
                <div id="search-results" className='flex flex-col justify-center items-center w-full md:max-w-[700px] border-2 border-gray-600 rounded-lg  px-2'>
                    {users?.map((user) => (
                        <div id={nanoid()} onClick={() => navigate(`/profile/${user.id}`)} className='bg-black text-red  w-full border-b-gray-600 py-2 px-2 border-b-[0.1px] flex flex-row justify-between items-center hover:opacity-55 transition-all duration-300 hover:cursor-pointer'>
                            <div id="username" className=''>{user.name}</div>
                            <div id="tags" className='  flex flex-row gap-3'>
                                {user.type?.includes("youtube") && <div className='bg-black border-[1px] border-red-500 text-red-500 rounded-2xl px-1'>YouTube</div>}
                                {user.type?.includes("article") && <div className='bg-yellow-300 text-black rounded-2xl px-1'>Articles</div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Search