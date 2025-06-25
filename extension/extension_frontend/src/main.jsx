import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import Toggle from './components/Toggle.jsx'
import Collections from './components/Collections.jsx'

const router=createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path='' element={<SignUp/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='main' element={<Toggle/>}/>
      <Route path='collections' element={<Collections/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
