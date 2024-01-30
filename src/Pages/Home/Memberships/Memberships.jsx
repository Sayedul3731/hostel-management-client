import silver from "../../../assets/silver.png"
import gold from "../../../assets/gold.png"
import platinum from "../../../assets/platinum.png"
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const Memberships = () => {
    return (
        <div>
            {/* <h1 className="text-center font-semibold text-4xl mt-16 mb-2">MEMBERSHIPS</h1> */}
            <div className="pt-10">
                <SectionTitle heading='memberships'></SectionTitle>
            </div>
            <p className="text-center  ">
                We provide quality services to our students. Below are three types of service <br /> packages. Purchase any of the following packages to avail our maximum benefits.
            </p>
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
                <Link to="/checkout/Silver" >
                    <div className="card bg-base-100 shadow-xl hover:shadow-red-500 hover:bg-green-500 cursor-pointer hover: ">
                        <div className=" lg:h-[400px] md:h-[376px]">
                            <figure><img className="h-full object-cover md:mb-0 p-3" src={silver} alt="Shoes" /></figure>
                        </div>
                        <div className="card-body">
                            <div className="flex  justify-between items-center">
                                <p className="card-title">Silver</p>
                                <p className="font-semibold flex justify-end items-center gap-[1px]">Price: 300 <HiOutlineCurrencyBangladeshi /></p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to="/checkout/Gold">
                    <div className="card bg-base-100 shadow-xl hover:shadow-green-500 hover:bg-red-500 cursor-pointer hover: ">
                        <div className=" lg:h-[400px]">
                            <figure><img className="h-full object-cover  p-3" src={gold} alt="Shoes" /></figure>
                        </div>
                        <div className="card-body">
                            <div className="flex justify-between items-center">
                                <p className="card-title">Gold</p>
                                <p className="font-semibold flex justify-end items-center gap-[1px]">Price: 400 <HiOutlineCurrencyBangladeshi /> </p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link to="/checkout/Platinum">
                    <div className="card bg-base-100 shadow-xl hover:shadow-red-500 hover:bg-green-500 cursor-pointer hover: ">
                        <div className=" lg:h-[400px]">
                            <figure><img className="h-full object-cover  p-3" src={platinum} alt="Shoes" /></figure>
                        </div>
                        <div className="card-body">
                            <div className="flex justify-between items-center">
                                <p className="card-title">Platinum</p>
                                <p className="font-semibold flex justify-end items-center gap-[1px]">Price: 500 <HiOutlineCurrencyBangladeshi /> </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Memberships;