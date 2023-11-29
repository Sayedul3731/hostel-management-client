import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useEffect } from "react"

const ServeMeals = () => {
    const user = useAuth();
    const axiosSecure = useAxiosSecure();
    const [meals, setMeals] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [paginateServeMeals, setPaginateServeMeals] = useState([])

    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()]

    console.log(user?.email);
    useEffect(() => {
        axiosSecure.get(`/requestedMeals`)
            .then(res => {
                console.log(res.data);
                setMeals(res.data)
            })
    }, [axiosSecure])
    const handleServe = (meal) => {
        if (meal?.status === 'delivered') {
            Swal.fire({
                title: "Oh!",
                text: "Already Served this meal.",
                icon: "error"
            });
        } else {
            const newInfo = {
                status: 'delivered'
            }
            axiosSecure.patch(`/requestedMeals/${meal._id}`, newInfo)
                .then(res => {
                    console.log(res.data);
                    if(res.data.modifiedCount > 0){
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "The meal has been served",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                })
        }
    }

    useEffect( () => {
        console.log(currentPage, itemPerPage);
        axiosSecure.get(`/requestedMeals?page=${currentPage}&size=${itemPerPage}`)
        .then(res => {
            console.log(res.data);
            setPaginateServeMeals(res.data)
        })
    },[axiosSecure, currentPage, itemPerPage])

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
            <SectionTitle heading='serve meals'></SectionTitle>
            <div className="overflow-x-auto lg:min-h-[600px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-green-500 text-black">
                            <th>SL.</th>
                            <th>Title</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Button</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {
                            paginateServeMeals?.map((meal, index) => <tr key={meal?._id}>
                                <th>{index + 1}</th>
                                <td>{meal?.title}</td>
                                <td className="text-center">{meal?.userEmail}</td>
                                <td className="text-center">{meal?.userName}</td>
                                <td className="text-center cursor-pointer">{meal?.status}</td>
                                <td onClick={() => handleServe(meal)} className="text-center cursor-pointer">Serve</td>
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

export default ServeMeals;