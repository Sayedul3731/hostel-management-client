/* eslint-disable react/prop-types */
import { GrLike } from "react-icons/gr";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMeals from "../../hooks/useMeals";
import useAuth from "../../hooks/useAuth";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const UpcomingMealCard = ({ meal }) => {
  useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useMeals();
  const user = useAuth();
  const handleLike = (id) => {
    console.log('click on', id);
    if (user?.email) {
      axiosSecure.patch(`/upcomingMeals/${id}`)
        .then(res => {
          console.log(res.data);
          refetch();
        })
    }
  }
  return (
    <div data-aos="zoom-in"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className=" bg-base-100 rounded shadow-md p-4">

      <div className="">
        <figure className="h-[500px]"><img className="h-full w-full object-cover  rounded" src={meal?.image} alt="food image" /></figure>
      </div>
      <div className="mt-4">
        <p className=" flex justify-start gap-[1px] items-center"><span className="font-semibold mr-1">Admin Name:</span>  {meal?.adminName} </p>

        <p className=" my-1"><span className="font-semibold mr-1">Description :</span> {meal?.Description}</p>

        <p ><span className="font-semibold">Ingredients:</span> {meal?.Ingredients}</p>
        <p className="my-1"><span className="font-semibold">Posting Time:</span> {meal?.time} </p>

        <p className="text-xl flex gap-2"><GrLike onClick={() => handleLike(meal._id)} className="cursor-pointer text-green-500" /><span>{meal?.like}</span> </p>
      </div>
    </div>
  );
};

export default UpcomingMealCard;