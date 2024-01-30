import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import gallery1 from "../../../assets/gallery1.jpg"
import gallery2 from "../../../assets/gallery2.jpg"
import gallery3 from "../../../assets/gallery3.jpg"
import gallery4 from "../../../assets/gallery4.png"
import gallery5 from "../../../assets/gallery5.jpg"
import gallery6 from "../../../assets/gallery6.jpg"
import gallery7 from "../../../assets/gallery7.jpg"
import Marquee from "react-fast-marquee";

const HostelGallery = () => {
    return (
        <div>
            <div className="pt-12 pb-4"><SectionTitle heading='Hostel Gallery'></SectionTitle></div>
            <div className="mb-10">
                <img className="w-full" src={gallery1} alt="" />
                <h4 className="md:text-xl text-center font-medium mt-2  ">The main building of the hostel</h4>
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
                </Marquee>
                <h4 className="md:text-xl text-center font-medium mt-2 mb-10  ">Other Hostel Facilities</h4>
            </div>
        </div>
    );
};

export default HostelGallery;