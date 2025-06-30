import React, { useState } from 'react'
import SummaryCard from './SummaryCard'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { useEffect } from 'react';

function OtherProfile() {
  const [userProfileData, setUserProfileData] = useState({})
  const [errorMsg, setErrorMsg] = useState("")
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`)
        if (response.data.success) {
          console.log(response)
          setUserProfileData(response.data.user)
          console.log(userProfileData)
        }
        else {
          setErrorMsg(response.data.message)
          setTimeout(() => {
            setErrorMsg("")
          }, 2500);
        }
      } catch (error) {
        console.error("Error related to getting user profile", error)
      }
    }
    getUserProfile()
  }, [id])


  return (
    <>
      <NavBar />
      <div id="main-body" className='text-red-500 gap-4 py-3 flex justify-center items-center flex-col'>
        <i className="fa-solid fa-arrow-left text-3xl font-bold absolute top-[110px]  left-[110px] hover:opacity-55 transition-all duration-300 cursor-pointer" aria-label="Go back" onClick={() => (navigate(-1))}></i>
        {/* <div id="top-bar" className='flex flex-row justify-start items-center gap-4'> */}

        <div id="main-heading" className='flex justify-start w-full max-w-[1100px] animate-glowRed'>
          <h1 className='text-4xl'>User Profile</h1>
        </div>
        {/* </div> */}
        <div id="heading">
          <h1 className='text-white text-6xl font-bold'>Username: {userProfileData?.name}</h1>
          {errorMsg && (
            <h1 className='text-white text-6xl font-bold'>Error Getting the Details</h1>
          )}
        </div>
        <div id="data" className='flex flex-row justify-between gap-3 items-center py-3'>
          {/* <div id="username" className='text-white text-3xl font-bold'>{userProfileData.name}</div> */}
          <div id="total-content" className='text-red-500 text-3xl flex flex-row justify-center items-center gap-2'>
            <p className='text-white'>Total Items:</p>
            <p className='text-red-500'> {userProfileData?.totalItems}</p>
          </div>
        </div>
        <div id="sec-section" className='flex flex-row justify-between items-center gap-3 '>
          <div id="profile-circle">
            <div id="circle" className="aspect-square rounded-full bg-red-500 flex justify-center items-center w-[200px] h-[200px] text-base text-white font-bold ">
              {userProfileData.name}
            </div>
          </div>
          <div id="user-feed" className='flex flex-row flex-wrap gap-4 justify-center items-center'>
            {userProfileData?.summarizedContent?.map((data) => (
              <SummaryCard data={data} id={nanoid} />
            ))}
          </div>
        </div>
        <div id="joined" className='flex flex-row justify-center items-center gap-3'>
          <h1 className='text-white text-lg font-bold'>Joined at :</h1>
          <h1> {new Date(userProfileData?.joinedAt).toDateString()}</h1>
        </div>
      </div>
    </>
  )
}

export default OtherProfile