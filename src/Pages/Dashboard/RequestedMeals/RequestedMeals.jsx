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

    const [currentPage, setCurrentPage] = useState(0);
    const [paginateRequestedMeals, setPaginateRequestedMeals] = useState([])
    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()]

    console.log(user);

    useEffect( () => {
        axiosSecure.get(`/requestedMeals/${user?.email}`)
        .then(res => {
            console.log('my requested meals', res.data);
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
    useEffect( () => {
        console.log(currentPage, itemPerPage);
        axiosSecure.get(`/requestedMeals/${user?.email}?page=${currentPage}&size=${itemPerPage}`)
        .then(res => {
            console.log('paginate meals',res.data);
            setPaginateRequestedMeals(res.data)
        })
    },[axiosSecure, currentPage, itemPerPage, user.email])

    const handleCurrentPage = (page) => {
        console.log(page);
        setCurrentPage(page)
    }
    console.log(currentPage);
    const handlePrevPage = () =>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () =>{
        if(currentPage < totalPage - 1){
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div className="p-8">
            <SectionTitle heading='my requested meals'></SectionTitle>
            <div className="overflow-x-auto lg:min-h-[600px]">
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
                            paginateRequestedMeals?.map((meal, index) => <tr key={meal?._id}>
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
            <div className="pagination ">
               <button onClick={handlePrevPage}>Prev</button>
               {
                pages.map((page, index) => <button
                onClick={() => handleCurrentPage(page )}
                className={currentPage === page  ? 'selected' : ''}
                 key={page}>{index + 1}</button> )
               }
               <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default RequestedMeals;