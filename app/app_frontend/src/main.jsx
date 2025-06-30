import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Search from './components/Search.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import SignUp from './components/SignUp.jsx'
import Login from '../../../extension/extension_frontend/src/components/Login.jsx'
import OtherProfile from './components/OtherProfile.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="" element={<SignUp/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="search" element={<Search/>}/>
      <Route path="main" element={<Home/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="profile/:id" element={<OtherProfile/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
