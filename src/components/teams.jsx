import { useState } from "react"
import { NavLink, useLoaderData } from "react-router-dom"
import { getTeams } from "../api"
import wattermark from '../../public/watermark.png'


export async function loader(){
    return getTeams()
}

export default function Teams() {
    const [data, setData] = useState(true)
    const [search, setSearch] = useState('')

    const dd = useLoaderData()

    const filter =dd.length > 0 && dd.filter((i) => {
        return search.toLowerCase() === '' ? i : i.Team_Name.toLowerCase().includes(search)
    })
    const out =filter.length>0 ? filter.map((i, k) =>(<div key={k} className="w-[300px] h-[400px] rounded-[20px] bg-[#d7dadfb0] mt-[10px] mb-[10px] mr-[10px] ml-[10px] flex flex-col relative justify-center items-center">
            <i className={i.status==='erorr' ? "absolute text-red-800 top-[5px] right-[10px] text-[20px] font-[700] fa-regular fa-circle-xmark" : i.status === 'pending' ? "absolute text-green-600 top-[5px] right-[10px] text-[20px] font-[700] fa-solid fa-spinner" : "absolute text-green-600 top-[5px] right-[10px] text-[20px] font-[700] fa-regular fa-circle-check"}></i>
            <h1 className={i.Gender ==='boys' ? "absolute top-[2px] w-[80px] h-[25px] rounded-[25px] bg-blue-800 text-slate-200 flex items-center justify-center text-[12px]" : "absolute top-[2px] w-[80px] h-[25px] rounded-[25px] bg-pink-700 text-slate-200 flex items-center justify-center text-[12px]"}>Team {k+1}</h1>
            <div className="w-[97%] absolute top-[50px]"><h1 className="text-[20px] font-[700] text-center overflow-hidden truncate">{i.Team_Name}</h1></div>
            <fieldset className="w-[97%] mt-[40px] flex flex-col justify-center ml-[60px]">
                <div className="flex text-[12px] mb-[10px]"><h1 className="max-w-[200px] text-left overflow-hidden truncate">01. {i.Captain}</h1><h1> (C)</h1></div>
                <div className="flex text-[12px] mb-[10px]"><h1 className="max-w-[200px] text-left overflow-hidden truncate">02. {i.Vice_Captain}</h1><h1> (VC)</h1></div>
                <div className="flex text-[12px] mb-[10px]"><h1 className="max-w-[200px] text-left overflow-hidden truncate">03. {i.Player1}</h1></div>
                <div className="flex text-[12px] mb-[10px]"><h1 className="max-w-[200px] text-left overflow-hidden truncate">04. {i.Player2}</h1></div>
                <div className="flex text-[12px] mb-[10px]"><h1 className="max-w-[200px] text-left overflow-hidden truncate">05. {i.Player3}</h1></div>
                <div className="flex text-[12px] mb-[10px]"><h1 className="max-w-[200px] text-left overflow-hidden truncate">06. {i.Player4}</h1></div>
                <div className="flex text-[12px] mb-[10px]"><h1 className="max-w-[200px] text-left overflow-hidden truncate">07. {i.Player5 ? i.Player5 : 'No Extra Player1'}</h1></div>
                <div className="flex text-[12px] mb-[10px]"><h1 className="max-w-[200px] text-left overflow-hidden truncate">08. {i.Player6 ? i.Player6 : 'No Extra Player2'}</h1></div>
            </fieldset>
            <fieldset className="w-[100%] h-[60px] flex items-center justify-center absolute bottom-[5px] mt-[15px]">
                <div className={i.status === 'erorr' ? "border-[2px] border-red-800 rounded-[25px] h-[45px] w-[92%] flex items-center justify-center" : "border-[2px] border-green-600 rounded-[25px] h-[45px] w-[92%] flex items-center justify-center"}>
                    <h1 className={i.status === 'erorr' ? "text-[15px] overflow-hidden text-center text-red-800" : "text-[15px] overflow-hidden text-center text-green-600"}>{i.status=== 'pending' ? 'Your Request is pending' : i.status==='erorr' ? 'Please contact us' : 'Sucsessfully Registered'}</h1>
                </div>
            </fieldset>
        </div>)) : (<h1 className="text-[22px] font-[700] text-red-800 w-[100%] flex justify-center">Not Found</h1>)

    return (
        <div className="mt-[60px]">
            <div className="w-[100%] h-[100vh] min-h-[500px] flex fixed items-center justify-center before:content-[''] before:fixed before:z-[2] before:flex before:w-[100%] before:h-[100vh] before:bg-gradient-to-t from-[#4e4f50f0] to-[#edeeeffa] before:min-h-[500px]"><img className="watermark-img  w-[600px] fixed z-[1] h-[600px]" loading="lazy" src={wattermark} /></div>
            {!data ? (
                <div className="h-[calc(100vh-77px)] min-h-[400px] w-[100%] flex flex-col items-center justify-center relative z-[4] overflow-hidden">
                    <h1 className="mb-[15px] text-center">There are no teams to apply registration.</h1>
                    <NavLink className="flex items-center justify-center mb-[35px] w-[220px] h-[40px] rounded-[25px] bg-gradient-to-l from-sky-800 to-blue-900 text-slate-200 font-[700] hover:scale-[1.1] hover:duration-[0.3s] hover:drop-shadow-2xl hover:drop-shadow-sky-700 duration-[0.3s]" to='/registration' >
                        <i className="mr-[20px] fa-regular fa-id-card"></i>Be First Team
                    </NavLink>
                </div>
            ) : (
                <div className="min-h-[calc(100vh-77px)] h-auto w-[100%] overflow-hidden relative z-[4] flex flex-col items-center justify-center">
                    <div className="w-[100%] h-[60px] bg-gray-200 fixed top-[60px] z-[5] flex items-center">
                        <div className="text-[15px]"><input className=" ml-[40px] h-[30px] w-[280px] bg-gray-300 focus-visible:outline-none focus-visible:border-b-[1px] focus-visible:border-stone-700" type="text" placeholder="🔍serch..." onChange={e => setSearch(e.target.value.toLowerCase())} /></div>
                    </div>
                    <div className="teams-structure flex h-[100%] w-[100%] mt-[65px] w-[95%] flex-wrap justify-start">
                        {out}
                    </div>
                </div>
            )}
        </div>
    )
}