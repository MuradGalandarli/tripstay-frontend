import { HiOutlineBars4 } from "react-icons/hi2";
import logo from "../../assets/logo/image.png"
import { IoSearchSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSelectors from "../../features/language/selectors/LanguageSelectors"
import { TbWorld } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useGetTranslationQuery } from "../../features/translation/Api/translationApi"
import { useAppSelector } from "../../shared/hooks/useAppSelector";
import { useLogoutMutation } from "../../features/auth/api/authApi";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { logoutAction } from "../../features/auth/slice/authSlice"

const Header = () => {

  const [isScrolled, setScrolled] = useState(true);
  const [profileMenu, setProfileMenu] = useState(false);
  const [language, setLanguage] = useState(false)
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const result = useGetTranslationQuery();
  const [isHostMode, setIsHostMode] = useState(false);
  const translation = result?.data?.data;

  const dispatch = useAppDispatch();

  let token = useAppSelector(
    (state) => state.auth.accessToken
  );

  const payload = token
    ? JSON.parse(atob(token.split(".")[1]))
    : null;

  const name = payload?.[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
  ];

  const handleLogout = async () => {
    debugger
    await logout().unwrap();

    dispatch(logoutAction());

  }

  const checkAuth = () => {
    setIsHostMode(!isHostMode);
    
    // token != null ? navigate("/listing") : navigate("/login")

    if (token == null) {
      if (isHostMode) {
        navigate("/");
      }
      else {
        navigate("/login");
      }
    } else {
      if (isHostMode) {
        navigate("/");
      }
      else {
        navigate("/createListingWelcome");
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {

      setScrolled(window.scrollY < 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <header>
        <div className="fixed top-0 left-0 w-full z-20 bg-[#fcfeff]">

          <div className='w-[100%] h-[1px] bg-[#f0f3f7]'> </div>
          <div className={`w-[100%] ${!isScrolled ? "h-[100px]" : "h-[200px] bg-[#fcfeff]"}`}>

            <div className=" flex justify-center">
              <div className='w-[94%] h-[100px] flex justify-between'>

                <div className="w-[350px] h-[100px] flex items-center">
                  <img className="bg-[#f0f3f7]" src={logo} alt="logo" />
                </div>

                {isScrolled &&
                  (
                    <div className="w-auto h1-[50px] flex items-center">

                      <img className="w-[70px] h1-[70px]" src="data:image/jpeg;base64,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" alt="" />
                      <p> {translation?.["header.Home"]}</p>
                      <img className="w-[70px] h1-[70px]" src="data:image/jpeg;base64,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" alt="" />
                      <p>{translation?.["header.Deneyimler"]}</p>
                      <img className="w-[70px] h1-[70px]" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYBBAcDAgj/xAA6EAACAgECAwUFBQYHAQAAAAAAAQIDBAUREiExBgcTQVEiMmFxgRQjUnKRQqGxwdHwFyQzQ2Jj4RX/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAwQFAgEG/8QALREBAAIBAwIFAwQCAwAAAAAAAAECAwQRIRIxBRMyQXEiUWEzUqHwQtGBscH/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYbA878irHg7LrI1wXWUnsjyZ27va1m07RCs6l3gaDgycI3zybFy4aIN8/mR+bC9i8N1GTnbaPyjf8Q7LPao0qSh/wBli3/cU8niOOlununp4Te3+UPSHeVg1TUc/CyKf+UPbRZx6muSu8I58Lzc7d1j0rtHpOrRTwc2qb/C3tJfQljJWVTJpsuP1QlU9ztBuyAAAAAAAAAAAAAAAAAAAADDewEB2l7TYuh0z4pKd/Dvw+UV6srZdRFbdFebSuaXR3zT1TxX/v4cl1jX9R1y9u66cafKK5br5EfTMz1Xnd9VpNBTFHZ8aXp6lbH2OnUg1eby6flLqJ7Y4WPwEo9DCc9XsjtRw1Otrh5FrSZpx32c5N/XHsrFlV2Jc7caUq5p77xN3iyTJirkrv8Add+x3eJfVasPVt7ILz6yivVeq+HU58y2Lm3pYGr8PiZ3rxLquJk1ZdEL8eyNlU1vGUXumi3ExMbwxLVms9M93sevAAAAAAAAAAAAAAAAAAARPaTVY6Rp0r0lK6T4aYP9qX9F1K+pzxgxzb3WtHpp1GXp9vf4cT1bMs1LUJRnZKxRlvOf45+v0Kunx9Neq/eX12kw14mI4js2MfHSilsTd2h2Tek0+w57fMyddbe+zLyW3yWlJuHIpbOOpq3w3i1t5DmEtZVrOp9p8vM38N+qkSm0/NNvtwr2fVKuXiQbjKD3i15MsRLjNSLVmF97tu1bxr68XIntiZMuCSb5U2+vyf8AQrY5nBl8uZ4lha3T+bSbR6q/zDr0fiaLDZAAAAAAAAAAAAAAAAAMSA5h3iapL7fk8DbjhVcMef7cv7RkamfO1UY/2voPDsXRppt+5R9Jr2jFvn8fUuW23fSUjaNk1XHpseez287RKc0yG2NH47mJqOckseZ/luNciI3aty6nkpqoDPiuJ8jW0U741jBxe8fEoLPh7O5dhJdF6RNwzbsffZWRcl+aJFq6b4947wzL7VyRP34fobsdqT1Xs7h5UnvY4cFn5o8n/As4L9eOLPnNXi8rNaqaJlYAAAAAAAAAAAAAAAAYl8QOHdsLXY9Qm/283b9JP+hjYOdVefl9dgr048Uf3tLQ033UXpa9eyVr8jmeznJ2lO4PLHh8jDyfqT8smPTDZk+RwQ1bnyZ4mqgtQ99mnofRKbF+rPxCCzehoJr9kFiy4dZx2vx7fqhk/Tlmajjn8w7d3S2uWh5dT6V5clH5OKf8yPw+d8TH8WjbNHwvJeZYAAAAAAAAAAAAAAAAwwOHdsqnVZqlUlt4eXx/Ry3/AJmLi+nV2h9bp774cdv72lFadb7KL8tWk8JWuw5ns6nmJT+DP/LV/Iw8v6k/LKrH0w2ZT5HBs1Lp9eZ4nrCD1Kz2zU0Pol3j4yz8Qr+bZyfMvw7vKFwfvNZp9E3L9EM1tscs7NzMR+Xc+6alw0DIvaf32VJr6JL+RxoK7YmR4tbfPEfaF4LrLAAAAAAAAAAAAAAAAGGBzDvK0zwtSldwtU59LhJ+k0jK1dfKzVyw3vDMvXimk945c3wLZVy4LOUoPaSfqXJ55beLJvEJiu7pzOdlibcLDptvFjQ59DE1EbZZUq14bcrORA6irVusPE1aq7ql33j5mzo67YnFJ+u8q/nZGyfMuxDm9nhoNMrb7boreT+6rXq3/aK2st9MUjvKlSYm/VPaH6S7Mab/APJ0LDwn71da4/zPmy7ip0Uir5zUZfNy2ulSRAAAAAAAAAAAAAAAAAAEV2l0iGt6VbiSajNriqn+Ca6Mhz4oy0msp9NnnBli8Pz9ruLfp+oylkVOublw3R8lNef1K+nmenonvD6XFljeNu0vrHyOJJ7kq9W6w6Lk71cLb6mRrq7X3R4/Vav95SUreRSTxVpZN+yezERvL20xEKvqOTvbL2ttnsfQ4q9NIhUx2+jf78oDJslfbGqvnKT2SJu0bygzZIiHVO6rsq8i+rUMiC+x4n+mn/u2+vyX8Sthp5mTzJ7ezN1mo8rF5Ueqe/4dgS26l9isgAAAAAAAAAAAAAAAAADDW4FQ7edkatexp348I/bIx22fJWr0fx9GQZcW89de65ptT5f0W7f+uFXV3abmSxslTi0+Tmtn8n8Tys9UN/Dm37pjR8nhtSb5NlTWY+qm/wBk0W2yxb2lPTsexj7LqOzb+CuUm+STJ9Nj6skK+ottSY/4U3Oyd5dfaZvQrWt01hcO7nsTk61k/aMiEqsdP7yxrovwr4v9xHbfLxHZmZtRWkdc9/b/AG73hYtOFjV42NXGuquKjGMV0RZiIiNoY9rzeeq3eXueuQAAAAAAAAAAAAAAAAAAAMOO4FL7wexVHaHDnfipV50Vuml7/wD6RXp7wt6XUzitETPDi2DC6q/w7ouFkJOEk10fmRXjqrs+h368e8T+VudMvCi9091uYFuJ2X623iJQPaPfHpUH1m99vgaOgr/kqZ5ibxH2fXdz2Pt7T6nLIvUoYeO1xSa959dkaW3VOzK1moinD9B4OHRg41eNi1quqC2UUSxEVjaGNa02neWyeuQAAAAAAAAAAAAAAAAAAAAAD5l5gQmJpGluq22WJVJqc3vHnut2RVpSd+E9st42iJU/VtS0+mNcMSEI7UyT4pqHt7/FnNMVJiN4dWzZYtxZO6BRoutKco4SsaripylW0uLz2fR/Q9rSsTts8tlybcym9F0/C0+3LhgUwqi7FuofJHdIiJlHeZmImUpsdo2QAAAAAAAAAAAAAAAAAAAAAAGtqEVLCyIuTinXLeS6rkc2jeNntZ2lxyNS0+vClp/2mzIsW85LzW/XiXNGfGOGjMpDF1vWsXGtxse2MIxlPirlYt1v+ZbncTkjiLfwjmmOeZj+UbKzP1DEaulk49PHtOcOJ8kvNckxNbT6pext7QsfdjgY+Fr+pRpst5UwajN8pb77vb9CbBSI5Q559nSyyrAAAAAAAAAAAAAAAAAAAAAAAD4tjxQkmt901sD3cryoX01R5rElVOUVf7vDtL3Xt1KUxzLQjtDFco+Pku+zx73vwTjJcl6PkePWtddlN0uc43+3J+DXY2pLyTS5M92ebrX3eR48rVchVwUOOFcZRil0XNfRsnwxwrZ55XYmQAAAAAAAAAAAAAAAAAAAAAAADyyPE8GzwUnZwvg36b7cjwjvy49PG13KsseqabmynOxuxUw2g5fL0KFqZ9+y9W+Lp7srT9TqnbKvE1CLt95Ojf8AQ86c37XXXj+7xen6lRVB4unakpxUuFqHD1e73PenNPs88zFHutPdVVrlH2+vUcSWPguSnV4kOGbse/F9Nti1ii8R9SrltEzw6ETIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=" alt="" />
                      <p>{translation?.["header.Hizmetler"]}</p>

                    </div>
                  )}



                {!isScrolled && (<div className='w-[500px] h-[100px] flex items-center '>
                  <div className='w-[500px] h-[50px] shadow-xl/30  bg-white rounded-[50px] flex justify-around items-center'>
                    <img className="w-[40px] h-[40px]"
                      src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240  "
                      alt="Home logo"
                    />
                    <p>{translation?.["header.BirYer"]}</p>
                    <p> | </p>
                    <p>{translation?.["header.BirZaman"]}</p>
                    <p> | </p>
                    <p>{translation?.["header.Misafir"]}</p>
                    <div className="w-[35px] h-[35px] rounded-[100%] bg-[#c7283d] flex items-center justify-center">
                      <IoSearchSharp className="text-white" />
                    </div>
                  </div>
                </div>)}

                <div className="">

                </div>

                <div className="w-[220px] h-[100px] flex gap-2 content-center items-center ">
                  <h1 onClick={() => (checkAuth())} className="text-[12px]">{isHostMode && token == null ? translation?.["header.Mod"] : translation?.["heder.HomeMode"]}</h1>
                  <div>
                    <div className="flex gap-2">
                      <div onClick={() => navigate("/login")} className="w-[40px] h-[40px] rounded-[100%] bg-amber-200 flex items-center justify-center">
                        <h1>{name?.toUpperCase() == null ? <TbWorld /> : name[0]?.toUpperCase()}</h1>
                      </div>
                      <div onClick={() => { setProfileMenu(!profileMenu) }} className="w-[40px] h-[40px] rounded-[100%] relative bg-[#e3dfde] flex items-center justify-center">
                        <HiOutlineBars4 />
                      </div>
                      {
                        profileMenu && (
                          <div className="absolute top-[80px] right-[40px] w-[250px] h-[0px] rounded-2xl shadow-xl/30 bg-white">
                            <ul className="p-7 flex flex-col gap-3  bg-white">

                              <li className="flex items-center gap-2" onClick={()=>(navigate("/favorite"))}> <FaRegHeart /> {translation?.["Menu.Favorites"]}</li>
                              <li className="flex items-center gap-2" onClick={() => (setLanguage(true), setProfileMenu(!profileMenu))}><TbWorld /> {translation?.["Menu.Language"]}  </li>
                              <li onClick={() => (handleLogout())} className="flex items-center gap-2"><RiLogoutBoxLine /> {translation?.["Menu.CloseSession"]}</li>

                            </ul>

                          </div>
                        )
                      }
                      {
                        language && (

                          <div className="absolute top-20 right-70">

                            <LanguageSelectors onClose={() => setLanguage(false)} />
                          </div>
                        )
                      }

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isScrolled && (
              <div className='w-[100%] h-[100px] flex justify-center items-center '>

                <div className="w-[800px] h-[60px] shadow-xl/30 bg-white rounded-[100px] flex justify-around items-center">

                  <div>
                    <p >{translation?.["header.Yer"]}</p>
                    <p className="text-[#b5b0b0]">{translation?.["header.Gidilecek"]}</p>
                  </div>
                  <div className=" w-[1px] h-[30px]  bg-[#b5b0b0]"></div>
                  <div>
                    <p>{translation?.["header.zaman"]}</p>
                    <p className="text-[#b5b0b0]">{translation?.["header.Tarih"]}</p>
                  </div>
                  <div className=" w-[1px] h-[30px]  bg-[#b5b0b0]"></div>
                  <div>
                    <p >{translation?.["header.Kişiler"]}</p>
                    <p className="text-[#b5b0b0]">{translation?.["header.Misafir"]}</p>
                  </div>
                  <div className="w-[40px] h-[40px] rounded-[100%] bg-[#c7283d] flex items-center justify-center">
                    <IoSearchSharp className="text-white" />
                  </div>

                </div>
              </div>
            )}
            <div className='w-[100%] h-[1px] bg-[#e6e6e6]'> </div>
          </div>
        </div>


        <div className={`${isScrolled ? "h-[200px]" : "h-[200px]"}`}></div>
      </header>

    </div>
  )
}

export default Header


