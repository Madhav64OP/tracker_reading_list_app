import React from 'react'
import { NavLink } from 'react-router-dom'
import NavBar from './NavBar'

function Home() {
  return (
    <>
    <NavBar/>
      <div id="main-body" className='flex-col flex py-6 gap-4'>
        <div id="heading-welcome" className='text-7xl text-white font-bold text-left animate-glowRed' >Welcome to the App</div>
        <div id="view-your-profile" className=''>
          <h1 className='text-5xl py-6 mt-4 text-white font-bold text-right'>View Your Personal Profile/Feed now !!</h1>
          <NavLink to="/profile" className='rounded-xl text-black hover:scale-110 transition-all duration-300 animate-glowRed bg-red-500 font-semibold py-2 text-xl px-2 justify-end hover:opacity-65'>My Profile</NavLink>
        </div>
        <div id="search-others">
          <h1 className='text-5xl py-6 mt-4 text-white font-bold text-left'>Explore other Users !</h1>
          <NavLink to="/search" className='rounded-xl text-black hover:scale-110 transition-all duration-300 animate-glowRed bg-red-500 font-semibold py-2 text-xl px-2 justify-end hover:opacity-65'>Search Now</NavLink>
        </div>
      </div>
    </>
  )
}

export default Home