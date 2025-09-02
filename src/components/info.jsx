import { useLoaderData } from "react-router-dom"
import { getInfo } from "../api"
import wattermark from '../../public/watermark.png'

export async function loader() {
    return getInfo()
}

export default function Info() {
    const dd = useLoaderData()

    const boysRules = dd && dd.filter(i => i.name == 'boys')
    const girlsRules = dd && dd.filter(i => i.name == 'girls')
    const importantData = dd && dd.filter(i => i.name == 'importance')
    const informationData = dd && dd.filter(i => i.name == 'information')

    const boysRulesData = boysRules && boysRules[0].rules.map((i, k) => (
        <li className="mt-[10px]" key={k}>{i}</li>
    ))

    const girlsRulesData = girlsRules && girlsRules[0].rules.map((i, k) => (
        <li className="mt-[10px]" key={k}>{i}</li>
    ))
    
    const importantDatas = importantData && importantData[0].importance.map((i, k) => (
        <p key={k}>{i}</p>
    ))

    return (
        <div>
            <div className="w-[100%] h-[100vh] min-h-[500px] flex fixed items-center justify-center before:content-[''] before:fixed before:z-[2] before:flex before:w-[100%] before:h-[100vh] before:bg-gradient-to-t from-[#4e4f50f0] to-[#edeeeffa] before:min-h-[500px]"><img className="watermark-img  w-[600px] fixed z-[1] h-[600px]" loading="lazy" src={wattermark} /></div>
            <div className="relative z-[4]">
                <div className="info-top w-[100%] overflow-hidden mt-[60px] flex  justify-center ">
                    <div className="top-left w-[700px] mr-[10px] mt-[30px] ml-[10px] flex flex-col">
                        <>
                            <div className="flex flex-col">
                                <h1 className="text-[20px] font-[700]">Date:</h1>
                                <p className="text-[15px] font-[400] mt-[10px]">{informationData && informationData[0].date}</p>
                            </div>
                            <div className="flex flex-col mt-[30px]">
                                <h1 className="text-[20px] font-[700]">Place:</h1>
                                <p className="text-[15px] font-[400] mt-[10px]">{informationData && informationData[0].place}</p>
                                <iframe className="map mt-[25px] w-[400px] h-[200px] rounded-[25px] shadow-lg shadow-gray-800" src={informationData && informationData[0].map} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </>
                        <div className="flex flex-col mt-[30px]">
                            <h1 className="text-[20px] font-[700]">Rules and Regulations:</h1>
                            <h1 className="underline font-[600]">Boys</h1>
                            <ul className="list-disc font-[400] text-[15px] ml-[15px]">
                                {boysRulesData}
                            </ul>
                        </div>
                    </div>
                    <div className="parallax top-right w-[450px] h-[450px] rounded-[60px] ml-[50px] mt-[100px] overflow-hidden mr-[10px] shadow-xl shadow-sky-700">D</div>
                </div>
                <div className="info-bottom w-[100%] overflow-hidden mt-[10px] flex items-center justify-center">
                    <div className="parallaxb bottom-left w-[450px] h-[450px] rounded-[60px] ml-[20px] overflow-hidden mr-[50px] shadow-xl shadow-sky-700">K</div>
                    <div className="bottom-right w-[700px] h-[700px] ml-[20px] mt-[30px] ml-[20px] mr-[10px] flex flex-col">
                        <div className="bottom-text flex flex-col mt-[100px]">
                            <h1 className="underline font-[600]">Girls</h1>
                            <ul className="list-disc font-[400] text-[15px] ml-[15px]">
                                {girlsRulesData}
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="info-important w-[100%] h-auto flex items-center justify-center">
                    <div className="w-[90%] h-auto flex flex-col text-[18px] font-[400]">
                        <h1 className="text-red-800 font-[700] mb-[15px]">Important:</h1>
                        <p> A team can have maximum of two extra players. Players cannot be changed
                        after the registration.</p>
                        <p>(Rules may change according to the circumstances. If you have any doubt about the rules, please clarify them with the umpires before the tournament starts)</p>
                        <ul className="text-red-800 list-disc ml-[15px]">
                            <li>Respect the umpires’ decision</li>
                            <li>Respect the game and the opponents</li>
                        </ul>
                    </div>
                </div>
                <div className="w-[100%] flex flex-col items-center justify-center mt-[40px]">
                    <div className="mb-[50px] w-[90%]">
                        {importantDatas}
                    </div>
                </div>
            </div>
        </div>
    )
}