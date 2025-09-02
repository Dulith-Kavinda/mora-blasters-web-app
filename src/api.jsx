import app from "./firebase";
import { getFirestore, getDocs, collection, query, where, orderBy } from "firebase/firestore";

const db = getFirestore(app);


export async function getHome(i) {
    const querySnapshot = await getDocs(collection(db, "Home"));
    const homeData = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }
    ));
    if (i == 'r') {
        const dates = homeData.filter(i => i.id === 'date')
        const d = new Date(dates[0].date2)
        const now = new Date()
        if (now >= d) {
            return true
        } else {
            return false
        }
    } else {
        return homeData
    }
}



export async function getValidOwner(i) {
    const q = query(collection(db, "Teams"), where("id", "==", i))
    const querySnapshot = await getDocs(q);
    const owner = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }
    ));
    if (owner.length == 0) {
        return true
    } else {
        return false
    }
}

export async function getRegister() {
    const querySnapshot = await getDocs(collection(db, "Register"));
    const registerData = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }
    ));

    return registerData
}

export async function getTeams(){
    const q = query(collection(db, "Teams"), orderBy('time'))
    const querySnapshot = await getDocs(q);
    const teamsData = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }
    ));
    return teamsData

}

export async function getInfo(){
    const querySnapshot = await getDocs(collection(db, "Info"));
    const infoData = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }
    ));

    return infoData

}

export async function getPlane(){
    const q = query(collection(db, "GamePlane"), orderBy('id'))
    const querySnapshot = await getDocs(q);
    const planeData = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }
    ));

    return planeData

}

export async function getTshirt(){
    const q = query(collection(db, "Tshirt"))
    const querySnapshot = await getDocs(q);
    const TshirtData = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }
    ));

    return TshirtData

}