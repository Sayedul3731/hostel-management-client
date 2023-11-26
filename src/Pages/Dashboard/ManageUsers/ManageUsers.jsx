import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUsers from "../../../hooks/useUsers";
import { useForm } from 'react-hook-form';
import { useState } from "react";


const ManageUsers = () => {

    const [users, refetch] = useUsers();
    const [searchingUser, setSearchingUser] = useState([])
    console.log(users);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data?.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is An Admin Now!`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }
    const onSubmit = async (data) => {
        console.log(data);
        const res = await axiosSecure.get(`/users/${data.text}`)
        setSearchingUser(res.data);

    }
    console.log(searchingUser[0]);
    return (
        <div className="p-8">
            <SectionTitle heading='manage users'></SectionTitle>
            <div className="input-group flex justify-end mb-3">
                <form onSubmit={handleSubmit(onSubmit)} className="flex border h-[40px] border-2 justify-center items-center">
                    <input className='w-full h-full my-3 px-3 py-3' placeholder='Search...' {...register('text')} />
                    <button type="submit" className="bg-white text-black  px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>

            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-green-500 text-black">
                            <th>SL.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th className="text-center">Action</th>
                            <th className="text-center">Membership</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {
                           searchingUser.length > 0 && searchingUser[0] !== null ? searchingUser?.map((user, index) => <tr key={user?._id}>
                           <th>{index + 1}</th>
                           <td>{user?.name}</td>
                           <td>{user?.email}</td>
                           <td className="text-center">
                               {
                                   user?.role === 'Admin' ? <button className="bg-green-200 font-semibold px-7 py-1">Admin</button> : <button onClick={() => handleMakeAdmin(user)} className="bg-red-200 font-semibold text-sm px-2 py-1">Make Admin</button>
                               }
                           </td>
                           <td className="text-center">{user?.Badge}</td>
                       </tr>) : users?.map((user, index) => <tr key={user?._id}>
                                <th>{index + 1}</th>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td className="text-center">
                                    {
                                        user?.role === 'Admin' ? <button className="bg-green-200 font-semibold px-7 py-1">Admin</button> : <button onClick={() => handleMakeAdmin(user)} className="bg-red-200 font-semibold text-sm px-2 py-1">Make Admin</button>
                                    }
                                </td>
                                <td className="text-center">{user?.Badge}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;