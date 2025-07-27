


const Footer = () => {
    return (
        <div className="bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-200 text-white pt-10">
            <footer className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-10 rounded-t-3xl shadow-2xl bg-black/70 font-semibold">
                <nav>
                    <header className="footer-title text-lg text-yellow-300 mb-2 tracking-wide">Services</header>
                    <a className="block link link-hover text-white/90 hover:text-yellow-300 transition-colors">Foods</a>
                    <a className="block link link-hover text-white/90 hover:text-yellow-300 transition-colors">Sleep Room</a>
                    <a className="block link link-hover text-white/90 hover:text-yellow-300 transition-colors">Library</a>
                    <a className="block link link-hover text-white/90 hover:text-yellow-300 transition-colors">Sports Equipment</a>
                </nav>
                <nav>
                    <header className="footer-title text-lg text-yellow-300 mb-2 tracking-wide">Hostel</header>
                    <a className="block link link-hover text-white/90 hover:text-yellow-300 transition-colors">About us</a>
                    <a className="block link link-hover text-white/90 hover:text-yellow-300 transition-colors">Contact</a>
                    <a className="block link link-hover text-white/90 hover:text-yellow-300 transition-colors">Seat Bookings</a>
                </nav>
                <nav>
                    <header className="footer-title text-lg text-yellow-300 mb-2 tracking-wide">Legal</header>
                    <a className="block link link-hover text-white/90 hover:text-yellow-300 transition-colors">Terms of use</a>
                    <a className="block link link-hover text-white/90 hover:text-yellow-300 transition-colors">Privacy policy</a>
                    <a className="block link link-hover text-white/90 hover:text-yellow-300 transition-colors">Cookie policy</a>
                </nav>
            </footer>
            <footer className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6 border-t border-yellow-300 bg-black/80 rounded-b-3xl shadow-xl">
                <aside className="flex items-center gap-4 mb-4 md:mb-0">
                    <img className="w-20 drop-shadow-lg" src="/logoo.png" alt="HappyHostel Logo" />
                    <div>
                        <p className="font-bold text-yellow-200 text-lg">HappyHostel</p>
                        <p className="text-white/80 text-sm">Providing reliable service since 1992</p>
                    </div>
                </aside>
                <nav>
                    <div className="flex gap-6">
                        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="fill-yellow-300 hover:fill-white transition-colors"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                        </a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="fill-yellow-300 hover:fill-white transition-colors"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="fill-yellow-300 hover:fill-white transition-colors"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;