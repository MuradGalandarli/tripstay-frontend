import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './shared/layouts/MainLayout'
import Card from "./features/listingCard/page/Card"
import LoginPage from './features/auth/pages/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<MainLayout />}>
      <Route path='/' element={<Card />} />
      <Route path='/login' element = {<LoginPage/>}/>
    </Route>
  </Routes>
</BrowserRouter>
  
    </>
  )
}

export default App
