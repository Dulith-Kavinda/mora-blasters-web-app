import { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { getHome } from "../api";
import morahome from "../../public/homemain.png"

export async function loader() {
    return getHome()
}

export default function Home() {
    const [currentTime, setCurrentTime] = useState(new Date())


    const dd = useLoaderData()

    const dates = dd.length > 0 && dd.filter(i => i.id === 'date')
    const tshirt = dd.length > 0 && dd.filter(i => i.id === 'tshirt')
    const gameplanes = dd.length > 0 && dd.filter(i => i.id === 'gameplane')
    const registrations = dd.length > 0 && dd.filter(i => i.id === 'registration')
    const header = dd.length > 0 && dd.filter(i => i.id === 'header')
    const caption = dd.length > 0 && dd.filter(i => i.id === 'caption')

    const starts = dates.length > 0 && dates[0].start === 'no'

    const targetDate = dates.length > 0 ? new Date(dates[0].date2) : new Date('2024-05-28T16:58:00Z')///should U-5.30

    const [register, setRegister] = useState(new Date() < targetDate)


    const handleMouseMove = (e) => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
        e.target.style.setProperty('--x', `${x}px`);
        e.target.style.setProperty('--y', `${y}px`);
    };




    useEffect(() => {
        const intervalId = setInterval(() => {
            setRegister(true)
            const currentTime = new Date()
            if (currentTime >= targetDate) {
                setRegister(false)
                clearInterval(intervalId)
            }
            setCurrentTime(new Date())
        }, 1000)


        return () => clearInterval(intervalId)
    }, [])


    const milisecondsLeft = (targetDate - currentTime) > 0 ? targetDate - currentTime : 0;
    const secondsLeft = Math.floor(milisecondsLeft / 1000) % 60;
    const minutesLeft = Math.floor(milisecondsLeft / 1000 / 60) % 60;
    const hoursLeft = Math.floor(milisecondsLeft / 1000 / 60 / 60) % 24;
    const daysLeft = Math.floor(milisecondsLeft / 1000 / 60 / 60 / 24);

    return (
        <div className="home w-full min-h-screen bg-neutral-100 flex flex-col max-w-[2100px]">
            <section className="relative flex flex-col items-center justify-center h-[65vh] min-h-[450px] overflow-hidden">
                <img
                    src={morahome}
                    alt="Mora Home"
                    className="absolute inset-0 w-full h-full object-cover brightness-75 z-[0]" // reduced brightness by lowering opacity
                    loading="lazy"
                    style={{ filter: "brightness(0.7)" }} // further reduce brightness
                />

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
                        {header && header[0].value}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 font-medium mb-6">
                        {caption && caption[0].value}
                    </p>
                    <NavLink
                        to="info"
                        className="btn mb-[20px] px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
                        onMouseMove={handleMouseMove}
                    >
                        More Info
                    </NavLink>
                    <div className="home-timer-main w-full max-w-xl rounded-2xl bg-white/80 shadow-xl p-6 flex flex-col items-center">
                        {starts ? (
                            <h1 className="font-bold text-center text-lg text-blue-900">Registration will start soon.</h1>
                        ) : (
                            <div className="flex flex-col md:flex-row items-center justify-between w-full">
                                <span className="font-semibold text-blue-900 mb-2 md:mb-0">
                                    {register ? 'Registration closes in:' : 'Registration closed'}
                                </span>
                                <div className="flex space-x-2 md:mx-4">
                                    <TimerBox label="Days" value={daysLeft} />
                                    <TimerBox label="Hours" value={hoursLeft.toString().padStart(2, '0')} />
                                    <TimerBox label="Min" value={minutesLeft.toString().padStart(2, '0')} />
                                    <TimerBox label="Sec" value={secondsLeft.toString().padStart(2, '0')} />
                                </div>
                                <span className="text-blue-900 font-medium">{dates.length > 0 && dates[0].date1}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <div className="-translate-y-[50px] z-10 flex flex-wrap justify-center w-full px-4 gap-6">
                <HomeCard
                    to="/registration"
                    icon="fa-regular fa-id-card"
                    title="Register Now"
                    description={registrations.length > 0 ? registrations[0].data : ""}
                    disabled={!register}
                />
                <HomeCard
                    to="/tshirt"
                    icon="fa-solid fa-tshirt"
                    title="T-Shirt"
                    description={tshirt.length > 0 ? tshirt[0].data : ""}
                    extra={tshirt.length > 0 ? tshirt[0].Contact : ""}
                />
                <HomeCard
                    to="/gameplane"
                    icon="fa-solid fa-diagram-project"
                    title="Game Plan"
                    description={gameplanes.length > 0 ? gameplanes[0].data : ""}
                    extra={gameplanes.length > 0 ? gameplanes[0].data1 : ""}
                />
            </div>
        </div>
    );

    // Helper Components
    function TimerBox({ label, value }) {
        return (
            <div className="w-14 h-16 rounded-lg bg-blue-100 flex flex-col items-center justify-center shadow">
                <div className="text-xl font-bold text-blue-900">{value}</div>
                <div className="text-xs font-medium text-blue-700">{label}</div>
            </div>
        );
    }

    function HomeCard({ to, icon, title, description, extra, disabled }) {
        const cardClass = `relative w-80 h-56 rounded-2xl shadow-lg flex flex-col p-6 bg-gradient-to-br from-white to-blue-50 transition-all ${disabled ? "opacity-60 pointer-events-none" : "hover:scale-105"
            }`;
        return (
            <NavLink to={to} className={cardClass}>
                <i className={`text-4xl text-cyan-700 mb-4 ${icon}`}></i>
                <h2 className="font-bold text-lg text-blue-900 mb-2">{title}</h2>
                <p className="text-sm text-slate-700 mb-2">{description}</p>
                {extra && <p className="text-xs text-blue-700">{extra}</p>}
                {disabled && (
                    <div className="absolute inset-0 bg-white/70 rounded-2xl flex items-center justify-center text-blue-900 font-bold text-lg">
                        Registration Closed
                    </div>
                )}
            </NavLink>
        );
    }
}