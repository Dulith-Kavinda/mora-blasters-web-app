import NotFoundimg from "../../public/notfound.png"

export default function NotFound(){
    return (
        <div className="w-[100%] min-h-[450px] h-[calc(100vh-17px)] flex flex-col items-center justify-center">
            <img className="w-[300px] h-[300px] rounded-lg" loading="lazy" src={NotFoundimg} alt="notfound"/>
            <h1 className="text-[17px] text-red-700 mt-[20px]">Not Found Page.(404 ERROR)</h1>
        </div>
    )
}