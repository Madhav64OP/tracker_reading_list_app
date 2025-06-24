import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function SignUp() {
    const [isVisible, setIsVisible] = useState(false);
    return (
        <>
            <div id="main-signup" className='w-[375px] h-[350px] overflow-auto bg-black text-white flex flex-col justify-center items-center gap-2'>
                <div id="heading" className='text-xl font-semibold text-red-500  flex justify-start items-center'>
                    Sign Up Now
                </div>
                <div id="main-body" className='flex flex-col justify-center items-center gap-3 text-red-500'>
                    <input type="text" placeholder='email' className='bg-gray-800 w-full placeholder:text-red-500 outline-none placeholder:opacity-60 py-1 px-3 rounded-lg' id='email' />
                    <div id="password" className='bg-gray-800 rounded-lg w-full px-2 flex justify-center items-center'>
                        <input type={isVisible?'text':'password'} className='bg-transparent outline-none py-1 placeholder:text-red-500 placeholder:opacity-60 px-1 rounded-lg' placeholder='password' id='pass' />
                        <div id="eye" className='hover:opacity-50 transition-opacity duration-200 cursor-pointer'>

                        {!isVisible ?<i class="fa-solid fa-eye-slash" onClick={()=>setIsVisible(!isVisible)}></i> :<i class="fa-solid fa-eye" onClick={()=>setIsVisible(!isVisible)}></i>}
                        </div>
                        
                    </div>
                    <button id="sign-up" className=' bg-red-500 text-black w-full flex justify-center items-center font-bold rounded-lg py-1 hover:opacity-50 transition-opacity duration-200'>Sign Up</button>
                </div>
                <div id="login-option" className='text-blue-600 text-xs flex  justify-center items-center gap-2'>
                    <p id="text" className=''>Already have an account ?</p>
                    <NavLink to="/login" id="login-btn" className='hover:opacity-50 transition-opacity duration-200 cursor-pointer font-bold underline'>Login Now</NavLink>
                </div>
            </div>
        </>
    )
}

export default SignUp