import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './shared/layouts/MainLayout'
import Card from "./features/listingCard/page/Card"
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import CreateListing from './features/listing/components/CreateListing'
import { setCredentials } from './features/auth/slice/authSlice'
import { useAppDispatch } from './shared/hooks/useAppDispatch'
import {useRefreshMutation}  from "./features/auth/api/authApi"

function App() {

  const dispatch = useAppDispatch();
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const data = await refresh().unwrap();
debugger

        dispatch(
          setCredentials({
            accessToken: data,
            user: data.user,
          })
        );
      } catch {
        // Login deyil
      }
    };

    initializeAuth();
  }, []);

 


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<MainLayout />}>
            <Route path='/' element={<Card />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/listing' element={<CreateListing />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App


