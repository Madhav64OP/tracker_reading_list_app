import React, { useState } from 'react'
import SummaryCard from './SummaryCard'
import { nanoid } from 'nanoid'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { useEffect } from 'react';

function Profile() {
    const [myProfileData, setMyProfileData] = useState([])
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/logout', {}, { withCredentials: true })
            navigate('/login');
        } catch (error) {
            console.error("logout-error ", error)
        }
    };

    useEffect(() => {
        const getMyProfile = async () => {
            try {
                const response = await axios.get("http://localhost:3000/my-profile", { withCredentials: true });
                if (response.data.success) {
                    console.log(response.data.data)
                    setMyProfileData(response.data.data);
                }
                else {
                    setErrorMsg(response.data.message);
                    setTimeout(() => {
                        setErrorMsg("");
                    }, 2500);
                }
            } catch (error) {
                console.error("Error getting the profile data ", error)
            }
        }
        getMyProfile()
    }, [])

    const date = new Date()

    return (
        <>
            <NavBar />
            <div id="main-body" className='text-red-500 gap-4 py-3 flex justify-center items-center flex-col'>
                <i className="fa-solid fa-arrow-left text-3xl font-bold absolute top-[110px]  left-[110px] hover:opacity-55 transition-all duration-300 cursor-pointer" aria-label="Go back" onClick={() => (navigate(-1))}></i>
                <div id="main-heading" className='flex justify-start w-full max-w-[1100px] animate-glowRed'>
                    <h1 className='text-4xl'>My Profile</h1>
                </div>
                <div id="heading">
                    <h1 className='text-white text-6xl font-bold'>Username: {myProfileData.name}</h1>
                    {errorMsg && (
                        <h1 className='text-white text-6xl font-bold'>Error Getting the Details</h1>
                    )}
                </div>
                <div id="data" className='flex flex-row justify-between gap-3 items-center py-3'>
                    {/* <div id="username" className='text-white text-3xl font-bold'>{myProfileData.name}</div> */}
                    <div id="total-content" className='text-red-500 text-3xl flex flex-row justify-center items-center gap-2'>
                        <p className='text-white'>Total Items:</p>
                        <p className='text-red-500'>  {myProfileData.totalItems}</p>
                    </div>
                </div>
                <div id="sec-section" className='flex flex-row justify-between items-center gap-3 '>
                    <div id="profile-circle">
                        <div id="circle" className="aspect-square rounded-full bg-red-500 flex justify-center items-center w-[200px] h-[200px] text-base text-white font-bold ">
                            {myProfileData.name}
                        </div>
                    </div>
                    <div id="my-feed" className='flex flex-row flex-wrap gap-4 justify-center items-center'>
                        {myProfileData?.summarizedContent?.map((data) => (
                            <SummaryCard data={data} id={nanoid} />
                        ))}
                    </div>
                </div>
                <div id="log-out-del" className='flex flex-row justify-center items-center gap-8'>
                    <div id="joined" className='flex flex-row justify-center items-center gap-3'>
                        <h1 className='text-white text-lg font-bold'>Joined at :</h1>
                        <h1> {new Date(myProfileData?.joinedAt).toDateString()}</h1>
                    </div>
                    <div id="essential-btns" className='flex flex-row justify-center items-center gap-3'>
                        <div id="log-out" className='text-red-500 bg-white py-1 px-2 rounded-lg font-semibold hover:opacity-55 transition-all duration-200 text-xl'>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                        <div id="delete-account" className='text-black bg-red-500 py-1 px-2 rounded-lg font-semibold hover:opacity-55 transition-all duration-200 text-xl'>
                            <button>Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile