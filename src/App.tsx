import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './shared/layouts/MainLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route path='' element={<MainLayout />}>
      {/* <Route path="/" element={<Home />} /> */}
    </Route>
  </Routes>
</BrowserRouter>
  
    </>
  )
}

export default App
