import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
      axios.get('http://localhost:3000/check-auth',{withCredentials:true})
      .then(result=>{
        if(result.data.loggedIN){
            navigate("/main")
        }
      })
      .catch(error=>{
        console.error(error)
      })
    }, [])
    

    const signUpHandler = (e) => {
        e.preventDefault()

        if (password.length < 8) {
            setErrorMsg("Password should be atleast 8 character longer")
            setTimeout(() => {
                setErrorMsg("")
            }, 2500)
            return
        }

        axios.post('http://localhost:3000/register', { username: name, email: email, password: password },{withCredentials:true})
            .then(result => {
                console.log(result);
                if (result.data.success) {
                    navigate("/main")
                }
                else {
                    setErrorMsg(result.data.message)
                    setTimeout(() => {
                        setErrorMsg("")
                    }, 2500)
                }
            }
            )
            .catch(err => console.error("Error", err))
    }

    return (
        <>
            <div id="main-signup" className='overflow-auto bg-black text-white flex flex-col justify-center items-center gap-2'>
                <div id="heading" className='text-xl font-semibold text-red-500  flex justify-start items-center'>
                    Sign Up Now
                </div>
                <div id="main-body" className='flex flex-col justify-center items-center gap-3 text-red-500'>
                    <input type="text" placeholder='Name' className='bg-gray-800 w-full placeholder:text-red-500 outline-none placeholder:opacity-60 py-1 px-3 rounded-lg' id='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='Email' className='bg-gray-800 w-full placeholder:text-red-500 outline-none placeholder:opacity-60 py-1 px-3 rounded-lg' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div id="password" className='bg-gray-800 rounded-lg w-full px-2 flex justify-center items-center'>
                        <input type={isVisible ? 'text' : 'password'} className='bg-transparent outline-none py-1 placeholder:text-red-500 placeholder:opacity-60 px-1 rounded-lg' value={password} placeholder='Password' id='pass' onChange={(e) => setPassword(e.target.value)} />
                        <div id="eye" className='hover:opacity-50 transition-opacity duration-200 cursor-pointer'>

                            {!isVisible ? <i className="fa-solid fa-eye-slash" onClick={() => setIsVisible(!isVisible)}></i> : <i className="fa-solid fa-eye" onClick={() => setIsVisible(!isVisible)}></i>}
                        </div>

                    </div>
                    <button id="sign-up" className=' bg-red-500 text-black w-full flex justify-center items-center font-bold rounded-lg py-1 hover:opacity-50 transition-opacity duration-200' onClick={signUpHandler}>Sign Up</button>
                </div>
                <div id="blue-red-msg" className='text-xs flex flex-col  justify-center items-center gap-2'>
                    {errorMsg && (
                        <p id="text" className='text-red-600'>{errorMsg}</p>

                    )}
                    <div id="login-option" className='text-blue-600 text-xs flex  justify-center items-center gap-2'>
                        <p id="text" className=''>Already have an account ?</p>
                        <NavLink to="/login" id="login-btn" className='hover:opacity-50 transition-opacity duration-200 cursor-pointer font-bold underline'>Login Now</NavLink>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SignUp