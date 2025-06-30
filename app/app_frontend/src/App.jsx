import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Search from './components/Search'
import Home from './components/Home'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import OtherProfile from './components/OtherProfile'

function App() {
  const [navbarOk, setNavbarOk] = useState(false)

  // useEffect(() => {
  //   axios.get('http://localhost:3000/check-auth', { withCredentials: true })
  //     .then(result => {
  //       if (result.data.loggedIN) {
  //         setNavbarOk(true)
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error)
  //       setNavbarOk(false)
  //     })
  // }, [])

  return (
    <>
      <Outlet />
      {/* <Search/> */}
      {/* <Home/> */}
      {/* <OtherProfile/> */}
    </>
  )
}

export default App
