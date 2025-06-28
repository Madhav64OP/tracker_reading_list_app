import React, { useState } from 'react'
import SummaryCard from './SummaryCard'
import { nanoid } from 'nanoid'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function Profile() {
    const [myProfileData, setMyProfileData] = useState(
        {
            name: "Op Boi",
            totalItems: 3,
            types: ["youtube", "articles"],
            joinedAt: "22/12/2000",
            summarizedContent: [
                {
                    generatedTitle: "Building Autonomous Vehicles",
                    insight: "Learn how ROS and AI come together to power self-driving vehicles.",
                    tags: ["ROS", "Autonomous Vehicles", "AI", "Robotics", "Self-Driving Cars"]
                },
                {
                    generatedTitle: "Create Social App with MERN",
                    insight: "Understand the full-stack process of building a social media platform using MongoDB, Express, React, and Node.js.",
                    tags: ["MERN", "Web Development", "Social Media App", "Full Stack", "React"]
                },
                {
                    generatedTitle: "Transformers Explained from Scratch",
                    insight: "Grasp the foundational architecture behind transformers by building it from the ground up.",
                    tags: ["Transformers", "Deep Learning", "NLP", "AI Architecture", "Machine Learning"]
                },
            ]
        }
    )

    const navigate=useNavigate()

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/logout', {}, { withCredentials: true })
            navigate('/login');
        } catch (error) {
            console.error("logout-error ", error)
        }
    };

    return (
        <>
        <NavBar/>
            <div id="main-body" className='text-red-500 gap-4 py-3 flex justify-center items-center flex-col'>
                <div id="heading">
                    <h1 className='text-white text-6xl font-bold'>{myProfileData.name}</h1>
                </div>
                <div id="data" className='flex flex-row justify-between gap-3 items-center py-3'>
                    {/* <div id="username" className='text-white text-3xl font-bold'>{myProfileData.name}</div> */}
                    <div id="total-content" className='text-red-500 text-3xl flex flex-row justify-center items-center gap-2'>
                        <p className='text-white'>Total :</p>
                        <p className='text-red-500'>  {myProfileData.totalItems}</p>
                    </div>
                    <div id="types" className='flex justify-center items-center flex-row gap-2'>
                        <h1 className='text-3xl ml-3 text-white'>From :</h1>
                        {myProfileData.types.includes("youtube") && (
                            <div className='bg-black border-[1px] border-red-500 text-red-500 rounded-2xl px-1'>YouTube</div>
                        )}
                        {myProfileData.types.includes("articles") && (
                            <div className='bg-yellow-300 border-[1px] border-white text-black rounded-2xl px-1'>Articles</div>
                        )}
                    </div>
                </div>
                <div id="sec-section" className='flex flex-row justify-center items-center gap-5'>
                    <div id="profile-circle">
                        <div id="circle" className="aspect-square rounded-full bg-red-500 flex justify-center items-center w-[200px] h-[200px] text-6xl text-white font-bold ">
                            {myProfileData.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                        </div>
                    </div>
                    <div id="my-feed" className='flex flex-row flex-wrap gap-4 justify-center items-center'>
                        {myProfileData.summarizedContent.map((data) => (
                            <SummaryCard data={data} id={nanoid} />
                        ))}
                    </div>
                </div>
                <div id="log-out-del" className='flex flex-row justify-center items-center gap-4'>
                    <div id="log-out" className='text-red-500 bg-white py-1 px-2 rounded-lg font-semibold hover:opacity-55 transition-all duration-200 text-xl'>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div id="delete-account" className='text-black bg-red-500 py-1 px-2 rounded-lg font-semibold hover:opacity-55 transition-all duration-200 text-xl'>
                        <button>Delete Account</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile