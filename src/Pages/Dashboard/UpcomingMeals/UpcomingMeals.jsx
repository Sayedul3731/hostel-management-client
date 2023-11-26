import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useUpcomingMeals from "../../../hooks/useUpcomingMeals";



const UpcomingMeals = () => {
    const [meals] = useUpcomingMeals();
    console.log(meals);
    
    return (
        <div>
            <SectionTitle heading='upcoming meals'></SectionTitle>
            <div className="overflow-x-auto">
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
                            meals?.map((meal, index) => <tr key={meal?._id}>
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
        </div>
    );
};

export default UpcomingMeals;