import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import app from "../firebase";
import { SyncLoader } from "react-spinners";
import ImageUploader from "./uploadImg";




export default function Registerform({ handelNext, handelData }) {
    const [submitting, setSubmitting] = useState(false)
    const [uid, setUid] = useState(null)
    const [isUser, setIsUser] = useState()
    const [err, setErr] = useState('')
    const [pay,setPay] = useState(false)
    const [inputData, setInputData] = useState({
        Team_Name: '',
        select: '',
        Gender: '',
        Owner_Name: '',
        Owner_Number: '',
        Captain: '',
        Vice_Captain: '',
        Player1: '',
        Player2: '',
        Player3: '',
        Player4: '',
        Player5: '',
        Player6: '',
        Registration_fees: '',
        Agree: false,
    })


    const db = getFirestore(app);

    function toggel(event) {
        const { name, value, type, checked } = event.target
        setInputData(prev => {
            return {
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }
        })
    }

    const handelSubmit = async (event) => {
        event.preventDefault()
        try {
            if (isUser && pay) {
                setSubmitting(true)
                const docRef = await addDoc(collection(db, 'Teams'), {
                    id: uid,
                    time: serverTimestamp(),
                    Team_Name: inputData.Team_Name,
                    select: inputData.select,
                    Gender: inputData.Gender,
                    Owner_Name: inputData.Owner_Name,
                    Owner_Number: inputData.Owner_Number,
                    Captain: inputData.Captain,
                    Vice_Captain: inputData.Vice_Captain,
                    Player1: inputData.Player1,
                    Player2: inputData.Player2,
                    Player3: inputData.Player3,
                    Player4: inputData.Player4,
                    Player5: inputData.Player5,
                    Player6: inputData.Player6,
                    Registration_fees: inputData.Registration_fees,
                    Agree: inputData.Agree,
                    status:'pending',

                })
                handelNext()
                setSubmitting(false)
            } else {
                setErr('User not found')
                handelNext()
                setSubmitting(false)
            }
        } catch (e) {
            setSubmitting(false)
            setErr(e.message)
        }

    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUser(true)
                setUid(user.uid)
            } else {
                setUid(null)
                setIsUser(false)
            }
        });
    }, [])

    const dd = handelData

    const register_feeData = dd.length > 1 && dd.filter(i => i.id === 1).map((j, k) => (
        <div key={k} className="font-[400] mt-[5px] flex flex-col">
            {j.pay.map((p, l) => (<h1 key={l}>{p}</h1>))}
        </div>
    ))
    const register_bankData = dd.length > 1 && dd.filter(i => i.id === 2).map((j, k) => (
        <div key={k} className="font-[700] mt-[15px] flex flex-col">
            {j.acc.map((p, l) => (<h1 key={l}>{p}</h1>))}
        </div>
    ))

    const handleUrlChange = (url) => {
        if (url != ''){
            setPay(true)
            setInputData(prev => {
            return {
                ...prev,
                Registration_fees:url
            }
        })}
    };


    return (
        <div className="w-[100%] mt-[50px] flex justify-center">
            <form onSubmit={handelSubmit} className="form w-[650px] h-auto mb-[40px] flex flex-col items-center">
                <fieldset className="w-[100%] h-[400px] rounded-[25px] bg-[#d7dadfb0] flex items-center justify-center flex-col">
                    <h1 className="text-[25px] font-[700] mt-[20px]">Register Your team.</h1>
                    <h1 className=" text-[13px] mt-[20px] text-center"><NavLink className='text-sky-700 text-[13px] hover:underline' to="/info">Click here</NavLink> to read rules and guidlines before registrations.</h1>
                    <div className="input-base w-[80%] flex flex-col mt-[25px]"><label className='font-[600] text-[16px]'>01.Team Name:<sup className="text-red-700 text-[17px]"> *</sup></label>
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="Avengers(EG)"
                            type="text"
                            name='Team_Name'
                            onChange={toggel}
                            required />
                    </div>
                    <div className="input-base w-[80%] flex flex-col mt-[25px]"><label className='font-[600] text-[16px]'>02.What is your badge:<sup className="text-red-700 text-[17px]"> *</sup></label>
                        <select id="bage" className='bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]'
                            onChange={toggel}
                            value={inputData.select}
                            name="select"
                            required
                        >
                            <option className="text-[15px] font-[300] text-gray-500 bg-gray-200" value="" disabled>Select your option</option>
                            <option className="text-[15px] font-[300] text-gray-500 bg-gray-200" value="pre">pre engineering</option>
                            <option className="text-[15px] font-[300] text-gray-500 bg-gray-200" value="2023">2023 intake</option>
                            <option className="text-[15px] font-[300] text-gray-500 bg-gray-200" value="before2023">before 2023 intake</option>
                        </select>
                    </div>
                    <div className="input-base w-[80%] flex flex-col mt-[25px]"><label className='font-[600] text-[16px]'>03.Gender:<sup className="text-red-700 text-[17px]"> *</sup></label>
                        <div className="flex items-center mt-[10px]">
                            <legend className="flex items-center">
                                <label>Male</label>
                                <input className="ml-[15px] size-[20px]"
                                    value='boys'
                                    type="radio"
                                    name='Gender'
                                    onChange={toggel}
                                    required />
                            </legend>
                            <legend className="flex items-center ml-[40px]">
                                <label>Female</label>
                                <input className="ml-[15px] size-[20px]"
                                    value='girls'
                                    type="radio"
                                    name='Gender'
                                    onChange={toggel}
                                    required />
                            </legend>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="w-[100%] h-[720px] rounded-[25px] bg-[#d7dadfb0] mt-[20px] flex items-center justify-center flex-col">
                    <div className="input-base w-[80%] flex flex-col mt-[35px]"><label className='font-[600] text-[16px]'>04.Your Name:<sup className="text-red-700 text-[17px]"> *</sup></label>
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="J.A.R.V.I.S"
                            type="text"
                            name="Owner_Name"
                            onChange={toggel}
                            required />
                    </div>
                    <div className="input-base w-[80%] flex flex-col mt-[35px]"><label className='font-[600] text-[16px]'>05.Your Contact Number:<sup className="text-red-700 text-[17px]"> *</sup></label>
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="071*******"
                            type="text"
                            name="Owner_Number"
                            onChange={toggel}
                            maxLength="12"
                            required />
                    </div>
                    <div className="input-base w-[80%] flex flex-col mt-[25px]"><label className='font-[600] text-[16px]'>06.Players:<sup className="text-red-700 text-[17px]"> *</sup></label>
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] mt-[10px] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="01. Tony Stark (c) *"
                            type="text"
                            name='Captain'
                            onChange={toggel}
                            required />
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] mt-[10px] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="02. Steve Rogers (vc) *"
                            type="text"
                            name='Vice_Captain'
                            onChange={toggel}
                            required />
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] mt-[10px] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="03. Thor Odinson *"
                            type="text"
                            name='Player1'
                            onChange={toggel}
                            required />
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] mt-[10px] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="04. Bruce Banner *"
                            type="text"
                            name='Player2'
                            onChange={toggel}
                            required />
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] mt-[10px] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="05. Peter Benjamin Parker *"
                            type="text"
                            name="Player3"
                            onChange={toggel}
                            required />
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] mt-[10px] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="06. T'Challa *"
                            type="text"
                            name='Player4'
                            onChange={toggel}
                            required />
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] mt-[10px] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="07. Stephen Strange (E)"
                            type="text"
                            name='Player5'
                            onChange={toggel} />
                        <input className="bg-transparent h-[40px] border-b-[2px] border-gray-400 text-[15px] font-[300] mt-[10px] focus-visible:outline-none focus-visible:border-black focus-visible:border-b-[1px]"
                            placeholder="08. James Buchanan  Bames (E)"
                            type="text"
                            name='Player6'
                            onChange={toggel} />
                    </div>
                </fieldset>
                <fieldset className="w-[100%] h-[600px] rounded-[25px] bg-[#d7dadfb0]  mt-[20px] flex items-center justify-center flex-col mb-[30px]">
                    <div className="input-base w-[80%] flex flex-col mt-[35px]"><label className='font-[600] text-[16px]'>07.Pay Registration fees:<sup className="text-red-700 text-[17px]"> *</sup></label></div>
                    <div className="input-base w-[80%] flex flex-col mt-[20px] text-[15px] font-[400]">
                        {register_feeData}
                        {register_bankData}
                        <div className="mt-[10px] flex items-center h-auto">
                            <ImageUploader onDownloadUrlChange={handleUrlChange}/>
                        </div>
                    </div>
                    <div className="input-base w-[80%] flex flex-col mt-[25px]"><label className='font-[600] text-[16px]'>08.Agree To terms and conditions.<sup className="text-red-700 text-[17px]"> *</sup></label></div>
                    <div className="input-base w-[80%] flex  mt-[20px] text-[12px] font-[400] items-center">
                        <h1>I read this rules and conditions
                            and I agree with them.
                        </h1>
                        <input className="ml-[20px] size-[20px]"
                            type="checkbox"
                            name='Agree'
                            checked={inputData.Agree}
                            onChange={toggel}
                            required />
                    </div>
                </fieldset>
                <Button type="submit" variant={submitting ? "outlined" : "contained"} disabled={submitting || inputData.Registration_fees == ''}>{submitting ? <SyncLoader color="#36d7b7" /> : 'submit'}</Button>
                {err != '' && <h1 className=" mt-[10px] text-red-700 font-[700] text-[15px]">{err}</h1>}
            </form>
        </div>
    )
}