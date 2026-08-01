import { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './shared/layouts/MainLayout'
import Card from "./features/listingCard/page/Card"
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import { setCredentials } from './features/auth/slice/authSlice'
import { useAppDispatch } from './shared/hooks/useAppDispatch'
import { useRefreshMutation } from "./features/auth/api/authApi"
import CreatePropertyPage from './features/listing/page/CreatePropertyPage'
import AmenitySelector from './features/listing/components/AmenitySelector'
import PropertyTypeSelector from './features/listing/components/PropertyTypeSelector'
import PropertySpaceTypeSelector from './features/listing/components/PropertySpaceTypeSelector'

function App() {

  const dispatch = useAppDispatch();
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const data = await refresh().unwrap();

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
            <Route path='/amenity' element={<AmenitySelector />} />
          </Route>
          <Route path='/listing' element={<CreatePropertyPage />} />
           <Route path='/propertyType' element={<PropertyTypeSelector />} />
           <Route path='/propertySpace' element={<PropertySpaceTypeSelector />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


