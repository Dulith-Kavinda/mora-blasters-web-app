import { NavLink, useRouteError } from "react-router-dom"
import errimg from "../../public/err.png"


export default function Error(){
    const error = useRouteError()

    return (
        <div className="w-[100%] min-h-[500px] h-[calc(100vh-17px)] flex flex-col items-center justify-center">
            <img className="w-[300px] h-[300px] rounded-lg" loading="lazy" src={errimg} alt="notfound"/>
            <h1 className="text-[17px] text-red-700 mt-[20px] text-center">Error: {error.message}</h1>
            <pre className="text-red-700 font-bold text-center">{error.status} - {error.statusText}</pre>
            <NavLink className='mt-[10px] text-indigo-700 text-[15px] hover:underline hover:duration-[0.2s] duration-[0.2s]' to='/'>Go to Home Page</NavLink>
        </div>
    )
}

