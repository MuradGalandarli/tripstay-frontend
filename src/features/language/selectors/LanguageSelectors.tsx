import { useAppDispatch } from "../../../shared/hooks/useAppDispatch"
import { setLanguage } from "../slice/languageSlice";
import type { close } from "../types/LanguageSelectorsType";
import { useGetLanguagesQuery } from "../api/languageApi"
import { baseApi } from "../../../shared/api/baseApi";

const LanguageSelectors = ({ onClose }: close) => {
  const dispatch = useAppDispatch();

  const result = useGetLanguagesQuery();
  console.log(result?.data?.data)

  const handleLanguage = (languageCode: string, languageName:string) => {
    console.log(languageCode);
    dispatch(setLanguage({
      languageCode:languageCode,
      languageName:languageName
    }));
     dispatch(baseApi.util.resetApiState());
   onClose();
  }

  return (
    <div className="w-[900px] h-[600px]  overflow-x-auto shadow-xl/30 items-start p-10 rounded-2xl bg-white flex flex-col">

      <button className="text-[25px]" onClick={onClose}>X</button>
      <div className="w-full h-[500px] flex flex-wrap ">
        {
          result?.data?.data?.map(item => (
            <ul key={item.id}>
              <li className="flex w-[200px] items-center justify-center" onClick={() => handleLanguage(item.code,item.countryName)}>
              <div className="m-5 w-[200px] h-[60px] border-1 flex flex-col items-center justify-center rounded-3xl "> 
                  <div>  {item.name}</div>
                  {item.countryName}
              </div>
              </li>
            </ul>


          ))
        }
      </div>
    </div>
  )
}

export default LanguageSelectors
