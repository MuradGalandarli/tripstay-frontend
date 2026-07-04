import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './shared/layouts/MainLayout'
import Card from "./features/listingCard/page/Card"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<MainLayout />}>
      <Route path='/' element={<Card />} />
    </Route>
  </Routes>
</BrowserRouter>
  
    </>
  )
}

export default App
