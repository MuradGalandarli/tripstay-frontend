import { TbWorld } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <footer>
      <div className="w-[100%] h-[550px] bg-[#f2f6f7] flex justify-center">
        <div className="w-[90%] h-[550px] bg-[#f2f6f7]">
          <div className="w-[100%] h-[400px] flex items-center" >
            <div className="w-[35%] h-[300px] flex flex-col gap-3 ">

              <h1 className="font-[500]">Destek</h1>
              <ul className="flex flex-col gap-2.5">
                <li><a className="hover:underline" href="#">Yardım Merkezi</a></li>
                <li><a className="hover:underline" href="#">Güvenlik sorunuyla ilgili yardım alın</a></li>
                <li><a className="hover:underline" href="#">AirCover</a></li>
                <li><a className="hover:underline" href="#">Ayrımcılık yapmama</a></li>
                <li><a className="hover:underline" href="#">Engellilik desteği</a></li>
                <li><a className="hover:underline" href="#">İptal seçenekleri</a></li>
                <li><a className="hover:underline" href="#">Semtinizdeki sorunu bildirin</a></li>
              </ul>
            </div>

            <div className="w-[35%] h-[300px] flex flex-col gap-3 ">

              <h1 className="font-[500]">Ev sahipliği</h1>
              <ul className="flex flex-col gap-2.5">
                <li><a className="hover:underline" href="#">Evinizi Airbnb'ye taşıyın</a></li>
                <li><a className="hover:underline" href="#">Ev sahipleri için AirCover</a></li>
                <li><a className="hover:underline" href="#">Ev sahipliği kaynakları</a></li>
                <li><a className="hover:underline" href="#">Topluluk forumu</a></li>
                <li><a className="hover:underline" href="#">Sorumlu ev sahipliği</a></li>
                <li><a className="hover:underline" href="#">Ücretsiz bir ilan sahipliği dersine katılın</a></li>
                <li><a className="hover:underline" href="#">Yardımcı ilan sahibi bulun</a></li>
                <li><a className="hover:underline" href="#">Bir ilan sahibi yönlendirin</a></li>
              </ul>
            </div>


            <div className="w-[35%] h-[300px] flex flex-col gap-3 ">

              <h1 className="font-[500]">Airbnb</h1>
              <ul className="flex flex-col gap-2.5">
                <li><a className="hover:underline" href="#">2026 Yaz Sürümü</a></li>
                <li><a className="hover:underline" href="#">Basın odası</a></li>
                <li><a className="hover:underline" href="#">Kariyer</a></li>
                <li><a className="hover:underline" href="#">Yatırımcılar</a></li>
                <li><a className="hover:underline" href="#">Airbnb.org acil konaklamaları</a></li>

              </ul>
            </div>

          </div>
          <div className="w-[100%] h-[100px] flex flex-col gap-4.5">
            <div className="w-[100%] h-[1px] bg-[#cacccf]"></div>
            <div className="w-[100%] h-[98px] bg-amber-[#e4e6eb] flex justify-between">
              <div className="flex gap-2">
                © 2026 Airbnb, Inc.
                <ul className="flex gap-2.5 ">
                  <li className="hover:underline"><a href="#">Gizlilik</a></li>
                  <li className="hover:underline"><a href="#">Şartlar</a></li>
                </ul>
              </div>
              <div className="w-[250px] h-[25px] flex gap-3 items-center">
                <TbWorld />
                <h1 className="font-medium">Türkçe (TR)</h1>
                <h1 className="font-medium">$ USD</h1>
                <FaFacebook />
                <h1>X</h1>
                <FaInstagram />


              </div>



            </div>


          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
