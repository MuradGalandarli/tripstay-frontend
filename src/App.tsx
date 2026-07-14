import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './shared/layouts/MainLayout'
import Card from "./features/listingCard/page/Card"
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'

function App() {
  

  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<MainLayout />}>
      <Route path='/' element={<Card />} />
      <Route path='/login' element = {<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
    </Route>
  </Routes>
</BrowserRouter>
  
    </>
  )
}

export default App
