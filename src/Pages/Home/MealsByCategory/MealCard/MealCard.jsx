/* eslint-disable react/prop-types */
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi2";

const MealCard = ({ meal }) => {
  const { title, image, price, rating } = meal
  return (
    <div className=" bg-base-100 rounded shadow-xl p-4">
      <div className="h-[300px]">
        <figure className="h-[300px] w-full"><img className="h-full object-cover w-full rounded" src={image} alt="Shoes" /></figure>
      </div>
      <div className="">
        <h2 className="card-title my-5">{title}</h2>
        <div className="flex justify-between items-center mb-5">
          <p className=" flex justify-start gap-[1px] items-center">{price} <span className="text-xl">< HiOutlineCurrencyBangladeshi /></span> </p>
          <p className=" flex justify-end">{rating}</p>
        </div>
        <div className="card-actions justify-end">
          <button className="w-full bg-red-500 py-2 text-white font-semibold rounded-sm">Details</button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;