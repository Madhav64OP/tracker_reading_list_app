import React, { useEffect, useRef, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'

function Header() {
  const [showLogout, setShowLogout] = useState(false);
  const popupRef = useRef(null)
  const navigate = useNavigate();

    const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens)
    console.log('Logged out!');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <div id="main-full-header" className='flex flex-row justify-between px-8 items-center gap-4 bg-black w-[375px] pt-3'>
        <div id="options" className='bg-black text-white w-fit flex flex-row justify-center items-center  gap-3 '>
          <NavLink to="/main" className={({ isActive }) =>
            `${isActive ? `text-red-500` : 'text-white'} hover:opacity-55 transition-opacity duration-200 font-semibold text-xs`
          } id="Home">Home</NavLink>
          <NavLink to="/collections" className={({ isActive }) =>
            `${isActive ? `text-red-500` : 'text-white'} hover:opacity-55 transition-opacity duration-200 font-semibold text-xs`
          } id="Collection">Collections</NavLink>
        </div>
        <div id="user-wraper" className='relative'>
          <div id="user" className='text-red-500 text-lg hover:cursor-pointer bg-black flex justify-center items-center hover:opacity-55 transition-opacity duration-200' onClick={() => setShowLogout(!showLogout)}>
          <i class="fa-solid fa-circle-user"></i>
        </div>
          {showLogout && (
            <div ref={popupRef} className='absolute top-8 right-0 bg-gray-700 text-red-500 rounded shadow-md p-1 w-24 text-sm z-10'>
              <button onClick={handleLogout} className='w-full text-left hover:bg-gray-200 px-2 py-1 rounded'>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Header