/* eslint-disable react/no-unescaped-entities */
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Marquee from "react-fast-marquee";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const NoticeBoard = () => {
    useEffect(() => {
        AOS.init({
            duration: 3000
        })
    }, [])
    return (
        <div className="bg-primary-500 py-5">
            <div className="max-w-7xl mx-auto ">
                <SectionTitle heading="Notice Board"></SectionTitle>
                <div className="pt-3 mb-5  ">
                    <Marquee speed={70} >
                        <p className="mr-5 font-semibold">"Meeting tomorrow, 7 PM. Please attend."</p>
                        <p className="mr-5 font-semibold">"Maintenance next week. Tidy rooms, secure belongings."</p>
                        <p className="mr-5 font-semibold">"Movie night this Friday, 8 PM. Bring snacks!"</p>
                        <p className="mr-5 font-semibold">"Fee deadline soon. Clear dues by week's end."</p>
                        <p className="mr-5 font-semibold">"Update emergency contact at front desk."</p>
                        <p className="mr-5 font-semibold">"Guests overnight? Notify administration beforehand. Thank you."</p>
                        <p className="mr-5 font-semibold">"Lost keys found. Claim at front desk."</p>
                        <p className="mr-5 font-semibold">"Internet interruption on Saturday, 10 AM to 12 PM."</p>
                        <p className="mr-5 font-semibold">"Community clean-up on Sunday, 9 AM. Join us!"</p>
                        <p className="mr-5 font-semibold">"Share feedback in box near entrance. Thank you!"</p>
                    </Marquee>
                </div>
                <div
                    data-aos="zoom-in"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    <div className="card bg-gray-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Enhanced Security Measures</h2>
                            <p>     We are excited to announce that we have implemented advanced security measures across the hostel premises. The new security system includes CCTV cameras, access control systems, and increased staff vigilance to ensure the safety and well-being of all residents.</p>
                        </div>
                    </div>
                    <div className="card bg-gray-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Cozy Study Lounges</h2>
                            <p>  Introducing brand new study lounges equipped with comfortable seating, ample desk space, and high-speed internet access. These dedicated spaces are designed to provide students with a quiet and focused environment for academic success.</p>
                        </div>
                    </div>
                    <div className="card bg-gray-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Online Room Selection</h2>
                            <p> We've upgraded our room selection process to make it even more convenient for residents. Now you can log in to your hostel management account and choose your preferred room online, streamlining the allocation process and giving you more control over your living space.</p>
                        </div>
                    </div>
                    <div className="card bg-gray-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Hostel Talent Show</h2>
                            <p>  Get ready for a night of talent and entertainment! We're organizing a hostel-wide talent show where residents can showcase their skills, whether it's singing, dancing, comedy, or any other talent. Stay tuned for more details on how to participate and show off your abilities!</p>
                        </div>
                    </div>
                    <div className="card bg-gray-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Volunteer Opportunities</h2>
                            <p>    As part of our commitment to community engagement, we're offering volunteer opportunities for hostel residents. Join us in giving back to the local community through various outreach programs and make a positive impact together.</p>
                        </div>
                    </div>
                    <div className="card bg-gray-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title"> Room Repairs</h2>
                            <p> Our maintenance team has completed a thorough inspection of all rooms and common areas. Any reported issues have been addressed, ensuring that the hostel facilities are in top-notch condition. We appreciate your cooperation and patience during this process.</p>
                        </div>
                    </div>
                    <div className="card bg-gray-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Stress Management</h2>
                            <p>  Taking care of your mental health is important. Join us for an upcoming wellness workshop focused on stress management techniques. Learn valuable strategies to cope with academic pressures and maintain a healthy work-life balance.</p>
                        </div>
                    </div>
                    <div className="card bg-gray-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Academic Honors</h2>
                            <p>   Congratulations to the residents who have achieved academic excellence! We're proud to recognize and celebrate your accomplishments. Look out for upcoming events to honor and showcase the academic achievements of our talented residents.</p>
                        </div>
                    </div>
                    <div className="card bg-gray-200 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Mobile App Launch</h2>
                            <p> Exciting news! We're thrilled to announce the launch of our new mobile app designed exclusively for hostel residents. The app offers a range of features, including instant notifications for important announcements, real-time chat for better communication, and a user-friendly interface to manage your hostel experience on the go. Download the app today to stay connected and make the most out of your hostel life!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeBoard;