import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMeals from "../../../hooks/useMeals";


const AllReviews = () => {
    const [, refetch] = useMeals();
    const axiosSecure = useAxiosSecure();
    const [meals, setMeals] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/reviews`)
            .then(res => {
                console.log(res.data);
                setMeals(res.data)
            })
    }, [axiosSecure])

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
                axiosSecure.delete(`/reviews/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "The reviews has been deleted",
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }
                    })
            }
        });
    }

    return (
        <div>
            <SectionTitle heading='all reviews'></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-green-500 text-black">
                            <th>SL.</th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th className="text-center">Reviews</th>
                            <th className="text-center">Button</th>
                            <th className="text-center">Button</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {
                            meals?.map((meal, index) => <tr key={meal?._id}>
                                <th>{index + 1}</th>
                                <td>{meal?.title}</td>
                                <td className="text-center">{meal?.like}</td>
                                <td className="text-center">{meal?.reviews}</td>
                                <td onClick={() => handleDelete(meal?._id)} className="text-center cursor-pointer">Delete</td>
                                <td className="text-center"><Link to={`/meals/meal/${meal?._id}`}>View Meal </Link></td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllReviews;