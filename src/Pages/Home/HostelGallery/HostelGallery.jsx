import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import gallery1 from "../../../assets/gallery1.jpg"
import gallery2 from "../../../assets/gallery2.jpg"
import gallery3 from "../../../assets/gallery3.jpg"
import gallery4 from "../../../assets/gallery4.png"
import gallery5 from "../../../assets/gallery5.jpg"
import gallery6 from "../../../assets/gallery6.jpg"
import gallery7 from "../../../assets/gallery7.jpg"
import gallery14 from "../../../assets/gallery14.avif"
import gallery15 from "../../../assets/gallery15.avif"
import gallery16 from "../../../assets/gallery16.avif"
import Marquee from "react-fast-marquee";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const HostelGallery = () => {
    return (
        <div className="bg-secondary-100 text-black">
            <div className="pt-12 pb-4"><SectionTitle heading='Hostel Gallery'></SectionTitle></div>
            <div className="flex justify-between items-start flex-col-reverse md:flex-col-reverse lg:flex-row px-2 lg:px-20 pt-10">
                <div className="lg:w-2/3 flex justify-center lg:justify-end mb-5 md:mb-10 ">
                    <div>
                        <img className="w-full" src={gallery1} alt="" />
                        <h4 className="md:text-xl text-center font-medium mt-2  ">The main building of the hostel</h4>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center  lg:w-1/3">
                    <p className="px-3 text-justify md:px-10 lg:pt-10">Welcome to our Hostel Management Website! Experience seamless hostel living with our user-friendly platform. Manage your bookings effortlessly, explore room availability, and stay up-to-date with hostel events and announcements. Enjoy the convenience of secure online payments and quick communication with hostel staff. From room preferences to facility requests, our website ensures a hassle-free hostel experience. Dive into a community-driven environment, connect with fellow residents through forums, and make the most of your hostel journey. Discover the ease of hostel life with our comprehensive features. Your comfort and convenience are our priorities. Welcome to a new era of hostel living—simple, interactive, and tailored just for you!</p>
                    <NavLink to="/rooms">
                        <button type="button" className='mt-10 bg-primary-300 px-5 py-2 font-semibold text-white flex justify-center items-center gap-1'>See more <FaArrowRight></FaArrowRight> </button>
                    </NavLink>
                </div>
            </div>
            <div>
                <Marquee>
                    <div className="h-[200px] w-[250px] mr-2">
                        <img className="h-full" src={gallery2} alt="" />
                    </div>
                    <div className="h-[200px] w-[250px] mr-2">
                        <img className="h-full" src={gallery3} alt="" />
                    </div>
                    <div className="h-[200px] w-[250px] mr-2">
                        <img className="h-full" src={gallery4} alt="" />
                    </div>
                    <div className="h-[200px] w-[250px] mr-2">
                        <img className="h-full" src={gallery5} alt="" />
                    </div>
                    <div className="h-[200px] w-[250px] mr-2">
                        <img className="h-full" src={gallery6} alt="" />
                    </div>
                    <div className="h-[200px] w-[250px] mr-2">
                        <img className="h-full" src={gallery7} alt="" />
                    </div>
                    <div className="h-[200px] w-[250px] mr-2">
                        <img className="h-full" src={gallery14} alt="" />
                    </div>
                    <div className="h-[200px] w-[250px] mr-2">
                        <img className="h-full" src={gallery15} alt="" />
                    </div>
                    <div className="h-[200px] w-[250px] mr-2">
                        <img className="h-full" src={gallery16} alt="" />
                    </div>
                </Marquee>
                <h4 className="md:text-xl text-center font-medium mt-2  ">Other Hostel Facilities</h4>
            </div>
        </div>
    );
};

export default HostelGallery;