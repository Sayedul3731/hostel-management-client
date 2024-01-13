/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useUsers from "../../../hooks/useUsers";


const MyProfile = () => {

    const user = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [identifiedUser, setIdentifiedUser] = useState({});
    const { register, handleSubmit, reset } = useForm();
    const [userData, setUserData] = useState({});
    const [, refetch] = useUsers();

    useEffect(() => {
        axiosPublic.get(`/users/${user?.email}`)
            .then(res => {
                setIdentifiedUser(res.data[0])
            })
    }, [axiosPublic, user.email])

    useEffect(() => {
        axiosSecure.get(`/userProfiles/${user?.email}`)
            .then(res => {
                console.log('user biodata', res.data);
                setUserData(res.data)
            })
    }, [axiosSecure, user?.email])


    console.log(user);
    const onSubmit = async (data) => {
        console.log(data);
        console.log('userData Email', userData?.email);
        if (userData?.email) {
            await axiosSecure.patch(`/userProfiles/${userData?.email}`, data)
                .then(res => {
                    console.log(res.data);
                    if (res.data) {
                        Swal.fire({
                            title: "Success!",
                            text: "Your Address Updated Successfully.",
                            icon: "success"
                        });
                        refetch()
                        reset();
                    }
                })
        } else {
            await axiosSecure.post(`/userProfiles`, data)
                .then(res => {
                    console.log(res.data);
                    if (res.data) {
                        Swal.fire({
                            title: "Success!",
                            text: "Your Address Added Successfully.",
                            icon: "success"
                        });
                        refetch()
                        reset();
                    }
                })
        }
    }
    console.log(userData);

    return (
        <div>
            <SectionTitle heading="my profile"></SectionTitle>
            <div className="card bg-base-100 shadow-xl mx-10">
                <figure><img src={user?.photoURL} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{user?.displayName}</h2>
                    <p> <span className="font-semibold">Email:</span> {user?.email}</p>
                    <p><span className="font-semibold">Badge:</span> {identifiedUser?.Badge}</p>
                </div>
            </div>


            <div className="p-10 space-y-[2px] text-white">
                <h1 className="text-4xl font-semibold text-center my-5">About Me</h1>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">Full Name</h5> <span className="font-semibold md:mr-3">:</span> {userData.fullName}</p>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">Father's Name</h5> <span className="font-semibold md:mr-3">:</span> {userData.fathersName}</p>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">Mother's Name</h5> <span className="font-semibold md:mr-3">:</span> {userData.mothersName}</p>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">Gender </h5> <span className="font-semibold md:mr-3">:</span> {userData.gender}</p>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">Date of Birth</h5> <span className="font-semibold md:mr-3">:</span> {userData.birth}</p>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">Nationality </h5> <span className="font-semibold md:mr-3">:</span> {userData.nationality}</p>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">Marital Status </h5> <span className="font-semibold md:mr-3">:</span> {userData.marital}</p>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">Address </h5> <span className="font-semibold md:mr-3">:</span> {userData.address}</p>
                <p className="flex"> <h5 className="font-semibold  md:w-[180px] ">Phone Number </h5> <span className="font-semibold md:mr-3">:</span>{userData.phone}</p>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">Email Address </h5> <span className="font-semibold md:mr-3">:</span> {userData.email}</p>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">University Name </h5> <span className="font-semibold md:mr-3">:</span> {userData.university}</p>
                <p className="flex"><h5 className="font-semibold  md:w-[180px] ">University ID Number </h5> <span className="font-semibold md:mr-3">:</span> {userData.idNumber}</p>
            </div>
            <div className="my-5 px-10 mb-10 flex justify-center">
                <button onClick={() => document.getElementById('update_modal').showModal()} type="submit" className="px-10 bg-[#00F531] py-2 text-white font-semibold rounded-sm">Edit</button>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="update_modal" className="modal modal-bottom bg-[#281617] sm:modal-middle">
                <div className="modal-box bg-[#6C0A0F] ">
                    <h1 className="text-4xl font-semibold text-center my-5 text-white">About Me</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="md:p-8 mr-2 mt-3 bg-[#6C0A0F]">
                        <div className="flex flex-col md:flex-row gap-5 w-full justify-center items-center relative">

                            <p className="w-full md:w-1/2">
                                <input type='text' className='w-full my-4 px-3 py-1' placeholder='Full Name' {...register('fullName', { required: true })} />
                            </p>
                            <p className="w-full md:w-1/2">
                                <input type='text' className='w-full my-4 px-3 py-1' placeholder="Father's Name" {...register("fathersName", { required: true })} />
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <p className="w-full md:w-1/2">
                                <input className='w-full my-4 px-3 py-1' placeholder="Mother's Name" {...register('mothersName', { required: true })} />
                            </p>
                            <p className="w-full md:w-1/2">
                                <input className='w-full my-4 px-3 py-1' placeholder='Gender' {...register('gender', { required: true })} />
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <p className="w-full md:w-1/2">
                                <input className='w-full my-4 px-3 py-1' placeholder="Date of Birth" {...register('birth', { required: true })} />
                            </p>
                            <p className="w-full md:w-1/2">
                                <input className='w-full my-4 px-3 py-1' placeholder='Nationality' {...register('nationality', { required: true })} />
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <p className="w-full md:w-1/2">
                                <input className='w-full my-4 px-3 py-1' placeholder="Marital Status" {...register('marital', { required: true })} />
                            </p>
                            <p className="w-full md:w-1/2">
                                <input className='w-full my-4 px-3 py-1' placeholder='Address' {...register('address', { required: true })} />
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <p className="w-full md:w-1/2">
                                <input className='w-full my-4 px-3 py-1' placeholder="Phone Number" {...register('phone', { required: true })} />
                            </p>
                            <p className="w-full md:w-1/2">
                                <input className='w-full my-4 px-3 py-1' placeholder='Email' {...register('email', { required: true })} />
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <p className="w-full md:w-1/2">
                                <input className='w-full my-4 px-3 py-1' placeholder="University Name" {...register('university', { required: true })} />
                            </p>
                            <p className="w-full md:w-1/2">
                                <input className='w-full my-4 px-3 py-1' placeholder='University ID Number' {...register('idNumber', { required: true })} />
                            </p>
                        </div>
                        <button type="submit" className='text-center modal-backdrop font-semibold text-white w-full mt-5 btn btn-outline py-2 hover:bg-[#00F531] hover:border-white'>
                            Submit
                        </button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost text-white absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyProfile;