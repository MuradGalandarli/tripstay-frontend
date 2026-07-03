 
import Header from '../../components/Header/Header'
import { Outlet } from "react-router-dom"
import Footer from '../../components/Footer/Footer'

const MainLayout = () => {
  return (
    <>
    <div className='grid grid-cols-[3%_94%_3%]'>
      <div></div>
     <div>
       <Header/>
      <Outlet/>
      
     
       <div></div>
     </div>
       
    </div>
     <Footer/>
     </>
  )
}

export default MainLayout
