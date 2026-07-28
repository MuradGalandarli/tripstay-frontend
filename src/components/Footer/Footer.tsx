import { TbWorld } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useGetTranslationQuery } from "../../features/translation/Api/translationApi"
import { useAppSelector } from "../../shared/hooks/useAppSelector"


const Footer = () => {

const result = useGetTranslationQuery();
const languageCountry = useAppSelector((state)=>(state.language))

  const translation = result?.data?.data;

  return (
    <footer>
      <div className="w-[100%] h-[550px] bg-[#f2f6f7] flex justify-center">
        <div className="w-[90%] h-[550px] bg-[#f2f6f7]">
          <div className="w-[100%] h-[400px] flex items-center" >
            <div className="w-[35%] h-[300px] flex flex-col gap-3 ">

              <h1 className="font-[500]">{translation?.["footer.support.Title "]}</h1>
              <ul className="flex flex-col gap-2.5">
                <li><a className="hover:underline" href="#">{translation?.["footer.support.HelpCenter "]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.support.SecurityHelp"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.support.AirCover"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.support.NonDiscrimination"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.support.Accessibility"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.support.CancellationOptions"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.support.ReportNeighborhood"]}</a></li>
              </ul>
            </div>

            <div className="w-[35%] h-[300px] flex flex-col gap-3 ">

              <h1 className="font-[500]">{translation?.["footer.hosting.Hosting"]}</h1>
              <ul className="flex flex-col gap-2.5">
                <li><a className="hover:underline" href="#">{translation?.["footer.hosting.ListYourHome"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.hosting.AirCoverForHosts"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.hosting.HostingResources"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.hosting.CommunityForum"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.hosting.ResponsibleHosting"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.hosting.FreeHostingClass"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.hosting.FindCoHost"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.hosting.ReferHost"]}</a></li>
              </ul>
            </div>


            <div className="w-[35%] h-[300px] flex flex-col gap-3 ">

              <h1 className="font-[500]">{translation?.["footer.airbnb.About"]}</h1>
              <ul className="flex flex-col gap-2.5">
                <li><a className="hover:underline" href="#">{translation?.["footer.airbnb.SummerRelease2026"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.airbnb.PressRoom"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.airbnb.Careers"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.airbnb.Investors"]}</a></li>
                <li><a className="hover:underline" href="#">{translation?.["footer.airbnb.AirbnbOrgEmergencyStays"]}</a></li>

              </ul>
            </div>

          </div>
          <div className="w-[100%] h-[100px] flex flex-col gap-4.5">
            <div className="w-[100%] h-[1px] bg-[#cacccf]"></div>
            <div className="w-[100%] h-[98px] bg-amber-[#e4e6eb] flex justify-between">
              <div className="flex gap-2">
                © 2026 Airbnb, Inc.
                <ul className="flex gap-2.5 ">
                  <li className="hover:underline"><a href="#">{translation?.["footer.legal.Privacy"]}</a></li>
                  <li className="hover:underline"><a href="#">{translation?.["footer.legal.Terms"]}</a></li>
                </ul>
              </div>
              <div className="w-[250px] h-[25px] flex gap-3 items-center">
                <TbWorld />
                <h1 className="font-medium">{languageCountry.languageName} ({languageCountry.languageCode})</h1>
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
