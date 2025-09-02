 import { useState } from "react";
import { auth } from "../firebase"
import { signOut } from "firebase/auth";
import { RequareAuth } from '../requreAuth.jsx'
import wattermark from '../../public/watermark.png'

export async function loader({ request }){
    await RequareAuth(request)
    return null
}


export default function SignOut(){
    const [err,setErr] = useState('')
    const [msg,setMsg] = useState('')

    function signOutUser() {
        signOut(auth)
        .then(() => {
            localStorage.removeItem('loggedIn')
            setMsg('Sign Out Sucsessfuly!')
        }).catch((error) => {
            setErr(error.message)
        });
      }

    return(
        <div className="mt-[60px] w-[100%] h-[calc(100vh-77px)] min-h-[300px] flex flex-col items-center justify-center ">
            <div className="w-[100%] h-[100vh] min-h-[300px] flex fixed items-center justify-center before:content-[''] before:fixed before:z-[2] before:flex before:w-[100%] before:h-[100vh] before:bg-gradient-to-t from-[#4e4f50f0] to-[#edeeeffa] before:min-h-[300px]"><img className="watermark-img  w-[600px] fixed z-[1] h-[600px]" loading="lazy" src={wattermark} /></div>
            {msg != '' ? <h1 className="text-green-600 font-[700] text-[15px] relative z-[4]">{msg}</h1> : <button onClick={signOutUser} className="flex items-center justify-center mb-[35px] w-[220px] h-[40px] rounded-[25px] bg-gradient-to-l from-sky-800 to-blue-900 text-slate-200 font-[700] hover:scale-[1.1] hover:duration-[0.3s] hover:drop-shadow-2xl hover:drop-shadow-sky-700 duration-[0.3s]  relative z-[4]" to='/teams' >
                <i className="mr-[10px] fa-solid fa-user"></i>Sign Out
            </button> }
            {err && <h1 className="text-red-700 font-[700] text-[15px]">{err}</h1>}
        </div>
    )
}
 

