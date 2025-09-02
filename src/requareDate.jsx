import { redirect } from "react-router-dom";
import { getHome } from "./api";

export async function RequareDate(request) {
    const pathName = new URL(request.url).pathname
    const ress = await getHome('r')
    if (ress) {
        throw redirect(
            `/?message=Registration Closed, you can't acsess=${pathName}`
        )

    }

}