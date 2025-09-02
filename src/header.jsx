import { NavLink, useLocation } from "react-router-dom"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"
import { getValidOwner } from "./api"
import profile from '../public/mora.png'

gsap.registerPlugin(ScrollTrigger)

/*whatts app captains link,contacts*/

export default function Header() {
  const [display, setDisplay] = useState(false)
  const [display1, setDisplay1] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [validu, setValidu] = useState(false)
  const [displayName, setDisplayName] = useState('Friend')
  const [photoURL, setPhotoUrl] = useState(profile)
  const navigate = useLocation()


  const registerPath = navigate.pathname === '/registration'

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(true)
        const valid = getValidOwner(user.uid)
        setValidu(valid)

        const displayName = user.displayName;
        const photoURL = user.photoURL;
        setDisplayName(displayName)
        setPhotoUrl(photoURL)
      } else {
        setIsUser(false)
        setDisplayName('friend')
        setPhotoUrl(profile)
      }
    });
  }, [])

  function handleDisplay(i){
    if (i == 'b1'){
      setDisplay(false)
      setDisplay1(pre => !pre)
    }else if (i == 'b2'){
      setDisplay1(false)
      setDisplay(pre => !pre)
    }
  }


  return (
    <>
      <div className="bg-[#00000d] h-[60px] w-[100%] overflow-hidden fixed top-[0px] flex items-center text-slate-200 justify-between text-[20px] z-[20]">
        <NavLink to='.' className="ml-[10px] h-[100%] w-[120px]"><img className="h-[100%] w-auto" src="./morablasterlogo.png" alt="logo" /></NavLink>
        <div className="flex w-[130px] justify-between mr-[20px] font-bold">
          <NavLink to='/teams' className={({ isActive }) => isActive ? "flex flex-col after:content-[''] after:w-[100%] after:duration-[0.4s] after:w-[100%] after:h-[3px] after:bg-gradient-to-r from-slate-400 to-slate-200" : "flex flex-col after:content-[''] after:w-[0%] hover:after:w-[100%] after:duration-[0.4s] after:h-[3px] after:bg-gradient-to-r from-slate-400 to-slate-200"}>Teams</NavLink>
          <NavLink to='/info' className={({ isActive }) => isActive ? "flex flex-col after:content-[''] after:w-[100%] after:duration-[0.4s] after:w-[100%] after:h-[3px] after:bg-gradient-to-r from-slate-400 to-slate-200" : "flex flex-col after:content-[''] after:w-[0%] hover:after:w-[100%] after:duration-[0.4s] after:h-[3px] after:bg-gradient-to-r from-slate-400 to-slate-200"}>Info</NavLink>
        </div>
      </div>


      <div  className={display1 ? "quick-icon w-[50px] h-[50px] rounded-[25px] cursor-pointer fixed z-[7] bottom-[130px] right-[10px] flex items-center justify-center overflow-hidden " : "overflow-hidden quick-icon bg-sky-700 display w-[50px] h-[50px] rounded-[25px] cursor-pointer fixed z-[7] bottom-[130px] right-[10px] flex items-center justify-center"} onClick={e => handleDisplay(e.target.id)}>
        {display1 ? <i  id='b1' className="user fa-x fa-solid text-[20px] text-red-700 font-[700] duration-[0.4s]"></i> : <i  id='b1' className="user fa-solid fa-phone text-[20px] w-[45px] h-[45px] text-sky-700 bg-slate-200 rounded-full flex items-center justify-center font-[700] duration-[0.4s]"></i>}
      </div>
      <div className={display1 ? "display bg-slate-200 w-[250px] h-[250px] rounded-[25px] duration-[0.4s] fixed z-[6] bottom-[130px] right-[10px] flex items-center justify-center overflow-hidden" : "display bg-slate-200 w-[250px] h-[250px] rounded-[25px] duration-[0.4s] fixed z-[6] bottom-[130px] right-[10px] translate-x-[270px] flex items-center justify-center overflow-hidden"}>
        <div className="w-[60px] h-[60px] absolute top-[23px] flex items-center justify-center text-[20px] font-[700] rounded-full bg-sky-700 overflow-hidden">
          <i className="fa-solid fa-phone"></i>
        </div>
          <div className="mt-[30px] w-[90%] flex flex-col">
            <h1 className="font-[700] text-[18px]">Contact:</h1>
            <h1 className="font-[600] text-[15px] mt-[5px]">Mindiya:- 071 965 5430</h1>
            <h1 className="font-[600] text-[15px] mt-[5px]">Kaveesha:- 071 572 9105</h1>
          </div>
      </div>


      <div className={display ? "quick-icon w-[50px] h-[50px] rounded-[25px] cursor-pointer fixed z-[8] bottom-[50px] right-[10px] flex items-center justify-center overflow-hidden " : "overflow-hidden quick-icon bg-sky-700 display w-[50px] h-[50px] rounded-[25px] cursor-pointer fixed z-[8] bottom-[50px] right-[10px] flex items-center justify-center"} onClick={e => handleDisplay(e.target.id)}>
        {display ? <i id="b2" className="user fa-x fa-solid text-[20px] text-red-700 font-[700] duration-[0.4s]"></i> : <img id="b2" className="user duration-[0.4s] text-[20px] w-[45px] h-[45px] rounded-full" loading="lazy" src={photoURL} alt="p" />}
      </div>
      <div className={display ? "display bg-slate-200 w-[250px] h-[250px] rounded-[25px] duration-[0.4s] fixed z-[7] bottom-[50px] right-[10px] flex items-center justify-center overflow-hidden" : "display bg-slate-200 w-[250px] h-[250px] rounded-[25px] duration-[0.4s] fixed z-[7] bottom-[50px] right-[10px] translate-x-[270px] flex items-center justify-center overflow-hidden"}>
        <div className="flex flex-col items-center justify-center relative h-[100%] w-[100%]">
          <h1 className="text-[12px] font-[700] text-sky-800 max-w-[230px] truncate absolute top-[2px] left-[15px] text-left"><span className="text-black">Hello, </span>{displayName.toString()}</h1>
          <div className="w-[60px] h-[60px] absolute top-[23px] rounded-full bg-sky-700 overflow-hidden">
            <img src={photoURL} alt="p" />
          </div>
          <h1 className="w-[90%] text-[12px] text-center mt-[55px]">If you are a team captain you can join us here.</h1>
          {isUser ? <div className="flex w-[90%] justify-center items-center mt-[10px]">
            {validu && <a href="https://chat.whatsapp.com/LcOu5mYb75ILqsvmXHsihB" target="blank" className="w-[100px] mr-[5px] h-[35px] flex items-center justify-center text-slate-200 text-[12px] rounded-[20px] transition ease-in-out delay-150 bg-sky-700 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-700 duration-300 font-[700]">join us</a>}
            {!registerPath && <NavLink className="w-[100px] ml-[5px] h-[35px] flex items-center justify-center font-[700] text-[12px] text-slate-200 rounded-[20px] transition ease-in-out delay-150 bg-sky-700 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-700 duration-300" to='/signout'>Sign Out</NavLink>}
          </div> : <h1 className="text-[13px] text-[700] text-indigo-600">You aren’t a verified user.</h1>}
          <h1 className="w-[90%] text-[12px] mt-[10px]">If you have any feedback about this website <a href="https://t.me/+b16RnQFRj_hiYjhl" target="blank" className="text-sky-800 underline">contact</a> developer.</h1>
        </div>
      </div>
    </>

  )
}

