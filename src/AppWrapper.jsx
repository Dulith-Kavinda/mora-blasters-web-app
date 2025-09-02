import { Outlet, useNavigation } from "react-router-dom";
import { BarLoader } from "react-spinners";

export default function AppWrapper() {
    const { state } = useNavigation()

    if (state === 'loading') {
        return (<div className="w-[100%] h-[100vh] flex flex-col items-center justify-center bg-white fixed z-[15]">
            <h1 className="loadertext w-[300px] text-center text-[20px] font-[700]">MORA BLASTERS 2024</h1>
            <BarLoader className="barloader" color="#000000" />
        </div>)
    }
    return <Outlet />
}