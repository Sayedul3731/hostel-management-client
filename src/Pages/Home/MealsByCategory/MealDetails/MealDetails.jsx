import { GrLike } from "react-icons/gr";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";



const MealDetails = () => {
  const axiosSecure = useAxiosSecure();


  const meal = useLoaderData()
  const handleLike = (id) => {
    console.log('click on', id);
    axiosSecure.patch(`/meals/${id}`)
      .then(res => {
        console.log(res.data);
      })

  }

  return (

    <div className="p-4">
      <Link to="/meals">
        <button className="my-5 px-5  bg-red-500 py-2 text-white font-semibold rounded-sm">SEE All</button>
      </Link>
      <div className=" bg-base-100 rounded shadow-xl p-4">
        <div className="">
          <figure className="h-[500px]"><img className="h-full w-full object-cover  rounded" src={meal?.image} alt="Shoes" /></figure>
        </div>
        <div className="mt-4">
          <p className=" flex justify-start gap-[1px] items-center"><span className="font-semibold mr-1">Admin Name:</span>  {meal?.adminName} </p>

          <p className=" my-1"><span className="font-semibold mr-1">Description :</span> {meal?.Description}</p>

          <p ><span className="font-semibold">Ingredients:</span> {meal?.Ingredients}</p>
          <p className="my-1"><span className="font-semibold">Posting Time:</span> {meal?.time} </p>

          <p className="text-xl flex gap-2"><GrLike onClick={() => handleLike(meal._id)} className="cursor-pointer" /><span>{meal?.like}</span> </p>
          <div className="flex justify-between items-center mb-5">
            <p ><span className="font-semibold">Reviews:</span> {meal?.reviews} </p>
            <p className=" flex justify-end"><span className="font-semibold mr-1">Rating:</span> {meal?.rating}</p>
          </div>
          <div>
            <button className="w-full bg-red-500 py-2 text-white font-semibold rounded-sm">Meal Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;