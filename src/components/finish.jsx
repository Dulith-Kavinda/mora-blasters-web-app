import { NavLink } from "react-router-dom";

export default function Finish(){
    return (
        <div>
            <NavLink className="flex items-center justify-center mb-[35px] w-[220px] h-[40px] rounded-[25px] bg-gradient-to-l from-sky-800 to-blue-900 text-slate-200 font-[700] hover:scale-[1.1] hover:duration-[0.3s] hover:drop-shadow-2xl hover:drop-shadow-sky-700 duration-[0.3s]" to='/teams' >
                <i className="mr-[10px] fa-brands fa-solid fa-whatsapp"></i>See team status
            </NavLink> 
        </div>
    )
}