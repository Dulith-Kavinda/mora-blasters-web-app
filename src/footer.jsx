import { useLocation } from "react-router-dom"

export default function Footer() {
    const loc = useLocation()
    const tf = loc.pathname === '/'
    return (
        <div className={tf ? "w-[100%] h-auto flex items-center justify-center relative z-[10]" : "w-[100%] h-auto flex items-center justify-center relative z-[10]"}>
            
            {/* I did some changes in footer section before uplod to git hub */}

            <footer className="bg-neutral-100 text-neutral-900 font-sans w-[100%]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-wrap justify-between items-start gap-8">
                        <div className="flex-1 min-w-[220px] mb-8">
                            <img src="/logo.svg" alt="TNW Logo" className="w-28 mb-3" />
                            <div className="text-blue-900 font-semibold text-lg mb-4">the heart of tech</div>
                            <div className="flex gap-3 mb-2">
                                <a href="#" aria-label="Facebook" className="hover:text-blue-900 transition"><i className="fab fa-facebook-f text-xl"></i></a>
                                <a href="#" aria-label="Instagram" className="hover:text-blue-900 transition"><i className="fab fa-instagram text-xl"></i></a>
                                <a href="#" aria-label="Twitter" className="hover:text-blue-900 transition"><i className="fab fa-twitter text-xl"></i></a>
                                <a href="#" aria-label="YouTube" className="hover:text-blue-900 transition"><i className="fab fa-youtube text-xl"></i></a>
                                <a href="#" aria-label="Pinterest" className="hover:text-blue-900 transition"><i className="fab fa-pinterest-p text-xl"></i></a>
                                <a href="#" aria-label="LinkedIn" className="hover:text-blue-900 transition"><i className="fab fa-linkedin-in text-xl"></i></a>
                            </div>
                        </div>
                        <nav className="flex flex-2 gap-10 flex-wrap min-w-[320px]">
                            <div className="min-w-[160px]">
                                <h4 className="text-blue-900 text-base mb-3 tracking-wide font-semibold">MORE TNW</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Media</a></li>
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Events</a></li>
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Programs</a></li>
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Spaces</a></li>
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Newsletters</a></li>
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Deals</a></li>
                                </ul>
                            </div>
                            <div className="min-w-[160px]">
                                <h4 className="text-blue-900 text-base mb-3 tracking-wide font-semibold">ABOUT TNW</h4>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Partner with us</a></li>
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Jobs</a></li>
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Terms &amp; Conditions</a></li>
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Cookie Statement</a></li>
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Privacy Statement</a></li>
                                    <li><a href="#" className="hover:text-blue-900 transition text-sm">Editorial Policy</a></li>
                                </ul>
                            </div>
                            <div className="flex items-start mt-6">
                                <button className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-semibold shadow transition" title="Digital Strategy Consultation">
                                    Digital Strategy Consultation
                                </button>
                            </div>
                        </nav>
                    </div>
                    <div className="text-center py-6 text-sm text-neutral-500 border-t border-neutral-300 mt-8">
                        © 2024 <span role="img" aria-label="love">Mora Blaster</span>. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}