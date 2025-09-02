import { redirect } from "react-router-dom";

export async function RequareAuth(request){
    const pathName = new URL(request.url).pathname
    const isLogged = localStorage.getItem("loggedIn")
    if (!isLogged){
        throw redirect(
            `/?message=you must login first&redirectTo=${pathName}`
        )

    }
}