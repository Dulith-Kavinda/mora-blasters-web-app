import { useLoaderData } from "react-router-dom"
import { getPlane } from "../api"
import wattermark from '../../public/watermark.png' 

export async function loader() {
    return getPlane()
}

export default function GamePlane() {
    const dd = useLoaderData()

    const image = dd.length>0 && dd[0].img

    return (
        <div className="mt-[60px] w-[100%] h-auto min-h-[calc(100vh-17px)] flex flex-col justify-center items-center">
            <div className="w-[100%] h-[100vh] min-h-[500px] flex fixed items-center top-[0px] justify-center before:content-[''] before:fixed before:z-[2] before:flex before:w-[100%] before:h-[100vh] before:bg-gradient-to-t from-[#4e4f50f0] to-[#edeeeffa] before:min-h-[500px] before:top-[0px]"><img className="watermark-img  w-[600px] fixed z-[1] h-[600px]" loading="lazy" src={wattermark}/></div>
            {image != '' ? <div className="max-w-[800px] w-[95%] h-auto relative z-[4] flex items-center jutify-center mt-[15px]">
                <div className="absolute z-[8] top-[20px] right-[20px] flex">
                    <a className="w-[170px] h-[30px] flex rounded-lg items-center justify-center bg-slate-200 text-[15px] font-[400] text-sky-800 shadow-lg shadow-sky-700 hover:scale-[1.1] hover:duration-[0.3s] duration-[0.3s]" href={image} target="blank">Open in browser<i className="ml-[10px] fa-solid fa-arrow-up-right-from-square"></i></a>
                </div>
                <img src={image} className="w-auto h-auto max-w-[95%] rounded-lg" loading="lazy" alt="plane"/>
            </div> : <div className="relative z-[4] flex items-center jutify-center w-[250px] h-[200px] bg-sky-200 rounded-[20px]">
                <h1 className="text-[20px] font-[600] text-center">This is not available for now.</h1></div>}
        </div>
    )
}