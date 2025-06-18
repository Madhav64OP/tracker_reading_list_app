import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Toggle from './components/Toggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toggle/>
    </>
  )
}

export default App
