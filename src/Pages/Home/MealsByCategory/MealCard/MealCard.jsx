/* eslint-disable react/prop-types */
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi2";
import { Link } from "react-router-dom";

const MealCard = ({ meal }) => {
  const { _id, title, image, price, rating } = meal;
  return (
    <div className="bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 rounded-2xl shadow-2xl p-4 text-white transition-transform duration-300 hover:scale-105 hover:shadow-3xl relative overflow-hidden group">
      <div className="h-[220px] w-full rounded-xl overflow-hidden mb-4 relative">
        <img className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" src={image} alt={title} />
        <div className="absolute top-2 right-2 bg-black/60 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <HiOutlineCurrencyBangladeshi className="text-lg" /> {price}
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-between h-full">
        <h2 className="text-xl font-bold mb-2 truncate text-black" title={title}>{title}</h2>
        <div className="flex justify-between items-center mb-4">
          <span className="flex items-center gap-1 text-yellow-300 font-semibold bg-white/10 px-2 py-1 rounded-full text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 text-yellow-400"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" /></svg>
            {rating}
          </span>
        </div>
        <Link to={`/meal/${_id}`} className="mt-auto">
          <button className="w-full bg-gradient-to-r from-primary-400 to-primary-600 py-2 text-white font-semibold rounded-lg shadow hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2">Details</button>
        </Link>
      </div>
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </div>
  );
};

export default MealCard;