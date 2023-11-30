/* eslint-disable react/no-unescaped-entities */
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])
  return (
    <div className="w-full h-[500px] flex justify-center items-center bg-gradient-to-r from-green-500 to-green-500"
    >
      <div data-aos="zoom-in" className="text-center text-white"
      >
        <h1 data-aos="zoom in" className="text-5xl my-5">Welcome to Happy Hostel</h1>
        <p className="text-lg mb-5 px-5">"Your Ultimate Hub for Hassle-Free Stay! Discover seamless hostel management, secure bookings, and a home away from home. Unlock a world of convenience, safety, and community. Book your spot now and experience modern living in the heart of Brahmanbaria. Your journey begins here!"</p>
        <div className="form-control ">
          <div className="input-group flex justify-center">
            <input type="text" placeholder="Search…" className="text-black px-2" />
            <button className="bg-white text-black py-1 px-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;