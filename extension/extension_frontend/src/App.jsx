import './index.css'
import Toggle from './components/Toggle'
import SignUp from './components/SignUp'
import Login from './components/Login'
import {Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <Outlet/>
      {/* <Toggle/>
      <SignUp/>
      <Login/> */}
    </>
  )
}

export default App
