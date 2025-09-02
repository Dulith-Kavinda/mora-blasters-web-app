import { Button } from "@mui/material";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebase";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import { getValidOwner } from '../api'
import { SyncLoader } from "react-spinners";

const db = getFirestore(app);

export default function SignIn({ handelNext }) {
    const [err, setErr] = useState('')
    const [signining, setSignining] = useState(false)
    const [msg, setMsg] = useState('')

    function handelclick() {
        setMsg('')
        setSignining(true)
        const log = localStorage.getItem('loggedIn')
        if (log == 'true') {
            const user = auth.currentUser;
            if (user){
                localS(user.uid)
            }else{
                setSignining(false)
                setMsg('try again')
            }
            
        } else {
            GoogleSignIn()
        }
    }

    const localS = async (id) => {
        try {
            const result = await getValidOwner(id)
            localStorage.setItem('loggedIn', true)
            if (result) {
                handelNext()
                setSignining(false)
            } else {
                setErr('you alredy have a team')
            }

        } catch (err) {
            setErr(err.message)
        }
    }

    function GoogleSignIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                user && localS(user.uid)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                setErr(err.message)
            });
    }

    return (
        <div className="w-[100%] h-[200px] flex items-center justify-center flex-col">
            <div className="w-[350px] flex flex-col items-center justify-center mb-[40px]">
                <h1 className="font-[600] text-left text-[20px]">Register with three easy steps:</h1>
                <ol className="w-[240px] text-[15px] text-left">
                    <li className="mt-[10px]">01. Sign in with google.</li>
                    <li className="mt-[10px]">02. Fill the Registration form.</li>
                    <li className="mt-[10px]">03. Join Captains group.</li>
                </ol>
            </div>
            {err != '' ? <h1 className="text-red-700 font-[700] text-[16px] text-center">Erorr,{err}</h1> : <Button variant="contained" onClick={handelclick} disabled = {signining}>{signining ? <SyncLoader color="#36d7b7" /> : 'Sign In/Continue'}</Button>}
            {msg && <h1 className="text-[15px] font-[700] mt-[10px] text-indigo-700">{msg}</h1>}
        </div>
    )
}