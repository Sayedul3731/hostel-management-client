import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUpcomingMeals from "../../../hooks/useUpcomingMeals";
import {useState, useEffect} from "react"



const UpcomingMeals = () => {
    const [meals] = useUpcomingMeals();
    const axiosSecure = useAxiosSecure();
    console.log(meals);
    const [currentPage, setCurrentPage] = useState(0);
    const [paginateUpcomingMeals, setPaginateUpcomingMeals] = useState([])

    const totalData = meals.length;
    const itemPerPage = 10;
    const totalPage = Math.ceil(totalData / itemPerPage);
    const pages = [...Array(totalPage).keys()]
    
    useEffect( () => {
        console.log(currentPage, itemPerPage);
        axiosSecure.get(`/upcomingMeals?page=${currentPage}&size=${itemPerPage}`)
        .then(res => {
            console.log(res.data);
            setPaginateUpcomingMeals(res.data)
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
            <SectionTitle heading='upcoming meals'></SectionTitle>
            <div className="overflow-x-auto lg:min-h-[600px]">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-green-500 text-black">
                            <th>SL.</th>
                            <th>Title</th>
                            <th className="text-center">Likes</th>
                            <th className="text-center">Reviews</th>
                            <th className="text-center">Admin Name</th>
                            <th className="text-center">Admin Email</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                        {
                            paginateUpcomingMeals?.map((meal, index) => <tr key={meal?._id}>
                                <th>{index + 1}</th>
                                <td>{meal?.title}</td>
                                <td className="text-center">{meal?.like}</td>
                                <td className="text-center">
                                    {meal?.reviews}
                                </td>
                                <td className="text-center">{meal?.adminName}</td>
                                <td className="text-center">{meal?.adminEmail}</td>
                                <td  className="text-center cursor-pointer">publish</td>
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

export default UpcomingMeals;