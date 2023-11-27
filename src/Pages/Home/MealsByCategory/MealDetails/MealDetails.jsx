import { GrLike } from "react-icons/gr";
import { Link, useLoaderData } from "react-router-dom";



const MealDetails = () => {

  const meal = useLoaderData()
  // const { image, title, rating } = meal;
  console.log(meal);

  return (

    <div className="p-4">
      <Link to="/meals">
        <button className="my-5 px-5  bg-red-500 py-2 text-white font-semibold rounded-sm">SEE All</button>
      </Link>
      <div className=" bg-base-100 rounded shadow-xl p-4">
        <div className="">
          <figure className="h-[400px] w-full object-cover"><img className="h-full object-cover w-full rounded" src={meal?.image} alt="Shoes" /></figure>
        </div>
        <div className="">
          <h2 className="card-title my-5">{meal?.title}</h2>
          <p className=" flex justify-start gap-[1px] items-center">Admin Name: </p>
          <p className=" flex justify-start gap-[1px] items-center">Meal Description: </p>
          <p className=" flex justify-start gap-[1px] items-center">Ingredients: </p>
          <p className=" flex justify-start gap-[1px] items-center">Posting Time: </p>
          <p className="text-2xl flex gap-2"><GrLike /><span>0</span> </p>
          <p className=" flex justify-start gap-[1px] items-center">Reviews: </p>
          <div className="flex justify-between items-center mb-5">
            <p className=" flex justify-end">{meal?.rating}</p>
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