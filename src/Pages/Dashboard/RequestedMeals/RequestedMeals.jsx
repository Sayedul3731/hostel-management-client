import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useMeals from "../../../hooks/useMeals";


const RequestedMeals = () => {
    const user = useAuth();
    const axiosSecure = useAxiosSecure();
    const [meals, setMeals] = useState([]);
    const [,refetch] = useMeals();

    console.log(user);

    useEffect( () => {
        axiosSecure.get(`/requestedMeals/${user?.email}`)
        .then(res => {
            console.log(res.data);
            setMeals(res.data)
        })
    },[axiosSecure, user?.email])
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/requestedMeals/${id}`)
                .then(res => {
                    console.log(res.data);
                   if(res.data){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "The meal has been deleted",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      refetch()
                   }
                })
            }
          });
     

    }
    return (
        <div>
            <SectionTitle heading='my requested meals'></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-green-500 text-black">
                            <th>SL.</th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th className="text-center">Reviews</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Button</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {
                            meals?.map((meal, index) => <tr key={meal?._id}>
                                <th>{index + 1}</th>
                                <td>{meal?.title}</td>
                                <td>{meal?.like}</td>
                                <td className="text-center">{meal?.reviews}</td>
                                <td className="text-center">{meal?.status}</td>
                                <td onClick={() => handleDelete(meal?._id)} className="text-center cursor-pointer">Cancel</td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;