/* eslint-disable react/prop-types */
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import { GrLike } from "react-icons/gr";
import Swal from 'sweetalert2';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUpcomingMeals from "../../hooks/useUpcomingMeals";

const UpcomingMealCard = ({ meal }) => {
  useEffect(() => {
    AOS.init({
      duration: 2000
    })
  }, [])

  const axiosSecure = useAxiosSecure();
  const [, refetch] = useUpcomingMeals();
  const user = useAuth();
  const [likeCount, setLikeCount] = useState(meal?.like || 0);
  const [liked, setLiked] = useState(false);

  const date = new Date(meal?.time);
  const localDate = date.toLocaleDateString();

  const handleLike = (id) => {
    if (!user?.email) return;
    if (liked) return; // Prevent double-like in UI
    setLiked(true);
    setLikeCount(prev => prev + 1);
    axiosSecure.get(`/likes/${id}`)
      .then(res => {
        if (res.data.userEmail === `${user.email}`) {
          Swal.fire({
            title: "Sorry!",
            text: "Already you like this Meal!",
            icon: "error"
          });
          setLiked(false);
          setLikeCount(meal?.like || 0);
        } else {
          axiosSecure.patch(`/upcomingMeals/${id}`)
            .then(res => {
              if (res.data) {
                const userInfo = {
                  userEmail: user?.email,
                  mealId: id
                }
                axiosSecure.post('/likes', userInfo)
                  .then(res => {
                    if (res) {
                      refetch();
                    }
                  })
              }
            })
        }
      })
      .catch(() => {
        setLiked(false);
        setLikeCount(meal?.like || 0);
      });
  }

  return (
    <div
      data-aos="zoom-in"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className="bg-white/90 rounded-2xl shadow-2xl p-0 overflow-hidden flex flex-col transition-transform hover:scale-[1.025] hover:shadow-pink-200 border border-purple-100"
    >
      <figure className="h-64 w-full overflow-hidden relative">
        <img
          className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
          src={meal?.image}
          alt="food image"
        />
        <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs px-3 py-1 rounded-full shadow font-semibold uppercase tracking-wide">
          Upcoming
        </span>
      </figure>
      <div className="flex-1 flex flex-col justify-between p-5">
        <div>
          <h3 className="text-lg font-bold text-purple-700 mb-1 truncate">{meal?.title || 'Meal'}</h3>
          <p className="flex items-center text-sm text-gray-600 mb-2"><span className="font-semibold mr-1">Admin:</span> {meal?.adminName}</p>
          <p className="text-gray-700 text-sm mb-2"><span className="font-semibold mr-1">Description:</span> {meal?.Description}</p>
          <p className="text-gray-700 text-sm mb-3"><span className="font-semibold">Ingredients:</span> {meal?.Ingredients}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500"><span className="font-semibold">Posting Time:</span> {localDate}</p>
          <button
            onClick={() => handleLike(meal._id)}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-semibold shadow hover:from-green-500 hover:to-green-700 transition-all group"
            title="Like this meal"
          >
            <GrLike className="text-white group-hover:scale-110 transition-transform" />
            <span>{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMealCard;