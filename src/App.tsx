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
import PropertyImageUpload from './features/listing/components/PropertyImageUpload'
import PropertyTitle from './features/listing/components/PropertyTitle'
import PropertyLocationSelector from './features/listing/components/PropertyLocationSelector'
import PropertyDetailsSelector from './features/listing/components/PropertyDetailsSelector'
import PropertyPriceSelector from './features/listing/components/PropertyPriceSelector'
import CreateListingWelcome from './features/listing/components/CreateListingWelcome'
import PropertyCreatedSuccess from './features/listing/components/PropertyCreatedSuccess'
import PropertyCreatedFailed from './features/listing/components/PropertyCreatedFailed'
import PropertyDetailPage from './features/propertyDetails/page/PropertyDetailPage'
import FavoritePage from './features/fovorite/page/FavoritePage'
import ChatPage from './features/chat/page/ChatPage'
import ConversationPage from './features/chat/page/ConversationPage'
import MessageWindow from './features/chat/components/MessageWindow'

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
            <Route path="/detailProperty/:propertyId" element={<PropertyDetailPage />} />
            <Route path='/favorite' element={<FavoritePage />} />
            <Route path='/chatPage/:propertyId' element={<ChatPage />} />
            <Route path='/conversationPage' element={<ConversationPage />} />
            <Route path="/messagePage/:conversationId" element={<MessageWindow />}
/>
          </Route>
          <Route path='/listing' element={<CreatePropertyPage />} />
          <Route path='/propertyType' element={<PropertyTypeSelector />} />
          <Route path='/propertySpace' element={<PropertySpaceTypeSelector />} />
          <Route path='/amenitySelector' element={<AmenitySelector />} />
          <Route path='/propertyImageUpload' element={<PropertyImageUpload />} />
          <Route path='/propertyTitle' element={<PropertyTitle />} />
          <Route path='/propertyLocationSelector' element={<PropertyLocationSelector />} />
          <Route path='/propertyDetailsSelector' element={<PropertyDetailsSelector />} />
          <Route path='/propertyPriceSelector' element={<PropertyPriceSelector />} />
          <Route path='/createListingWelcome' element={<CreateListingWelcome />} />
          <Route path='/propertyCreatedSuccess' element={<PropertyCreatedSuccess />} />
          <Route path='/propertyCreatedFailed' element={<PropertyCreatedFailed />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


