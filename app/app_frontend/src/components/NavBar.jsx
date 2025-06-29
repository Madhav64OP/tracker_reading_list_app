import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <>
      <div id="main-nav" className='flex sticky top-0 w-full justify-between items-center flex-row bg-black text-red-500 px-3  z-50'>
        <div id="logo">
          <NavLink to="/main" className='text-xl font-medium text-black rounded-lg bg-red-500 py-2 px-3'>SocialME </NavLink>
        </div>
        <div id="contents" className='flex justify-center items-center gap-8 flex-row'>
          <div id="home" className='hover:opacity-55 transition-opacity duration-300 cursor-pointer text-2xl font-semibold'>
            <NavLink to="/main" className={({isActive})=>` ${isActive ? `opacity-55`: ``} `}>Home</NavLink>
          </div>
          <div id="search" className='hover:opacity-55 transition-opacity duration-300 hover:cursor-pointer text-2xl font-semibold'>
            <NavLink to="/search" className={({isActive})=>` ${isActive ? `opacity-55`: ``} `}>Search</NavLink>
          </div>
        </div>
        <NavLink to="/profile" id="profile" className={({isActive})=>`flex ${isActive ? `opacity-55`: ``} justify-center items-center text-4xl hover:cursor-pointer hover:scale-110 transition-all duration-300 hover:opacity-75`}>
          <i className="fa-solid fa-circle-user"></i>
        </NavLink>
      </div>
        <br className='bg-gray-400'></br>
    </>
  )
}

export default NavBar