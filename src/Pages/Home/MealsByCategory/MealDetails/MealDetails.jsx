import { GrLike } from "react-icons/gr";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react"
import useUpcomingMeals from "../../../../hooks/useUpcomingMeals";



const MealDetails = () => {
  const { handleSubmit, control } = useForm();
  const axiosSecure = useAxiosSecure();
  const [, likeRefetch] = useUpcomingMeals();
  const user = useAuth();
  const navigate = useNavigate();
  const meal = useLoaderData();
  const [reviews, setReviews] = useState([])
  const date = new Date(meal?.time);
  const localDate = date.toLocaleDateString();


  useEffect(() => {
    axiosSecure.get(`/reviews/${meal?._id}`)
      .then(res => {
        setReviews(res.data)
      })
  }, [axiosSecure, meal._id])

  const handleLike = (id) => {
    if (user?.email) {
      axiosSecure.patch(`/meals/${id}`, { lk: 1 })
        .then(res => {
          console.log(res.data);
          likeRefetch();
        })
    }
  }

  const handleMealRequest = () => {
    if (!user?.email) {
      Swal.fire({
        title: "You aren't logged in!",
        text: "Do you want to log in?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      });
    } else if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => {
          if (res.data[0].Badge !== 'Bronze') {
            const newInfo = {
              title: meal?.title,
              like: meal?.like,
              reviews: meal?.reviews,
              status: 'pending',
              userName: res.data[0].name,
              userEmail: res.data[0].email,
              image: meal?.image,
              time: meal?.time,
              rating: meal?.rating,
              price: meal?.price,
              category: meal?.category,
              adminName: meal?.adminName,
              adminEmail: meal?.adminEmail,
              Description: meal?.Description,
              Ingredients: meal?.Ingredients

            }
            axiosSecure.post('/requestedMeals', newInfo)
              .then(res => {
                if (res.data) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your request is succeeded!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                }
              })
          } else {
            Swal.fire({
              title: "Oh Sorry!",
              text: "Your aren't purchase any package!",
              icon: "error"
            });
          }
        })
    }

  }
  const onSubmit = (data) => {

    if (!user?.email) {
      Swal.fire({
        title: "Oh sorry!",
        text: "You are not logged in!",
        icon: "error"
      });
    }
    else if (user?.email) {
      const reviewsInfo = {
        review: data.reviews,
        userName: user?.displayName,
        userEmail: user?.email,
        mealId: meal?._id,
        title: meal?.title,
        like: meal?.like,
        reviews: meal?.reviews,
        time: meal?.time,
        rating: meal?.rating,
        price: meal?.price,
        image: meal?.image,
        category: meal?.category,
        adminName: meal?.adminName,
        adminEmail: meal?.adminEmail,
        Description: meal?.Description,
        Ingredients: meal?.Ingredients

      }
      axiosSecure.post('/reviews', reviewsInfo)
        .then(res => {
          if (res.data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your review is added!",
              showConfirmButton: false,
              timer: 1500
            });
            axiosSecure.patch(`/meals/${meal?._id}`, { rev: 1 })
              .then(res => {
                console.log(res.data);
              })
          }
        })
    }
  }

  return (

    <div className="p-4 max-w-7xl mx-auto px-2">
      <Link to="/meals">
        <button className="my-5 px-5 mx-4 bg-primary-300 py-2 text-white  font-semibold rounded-sm">SEE All</button>
      </Link>
      <div className=" bg-base-100 rounded shadow-sm p-4 text-white">
        <div className="">
          <figure className="h-[500px]"><img className="h-full w-full object-cover  rounded" src={meal?.image} alt="Shoes" /></figure>
        </div>
        <div className="mt-4">
          <p className=" flex justify-start gap-[1px] items-center"><span className="font-semibold mr-1">Admin Name:</span>  {meal?.adminName} </p>

          <p className=" my-1"><span className="font-semibold mr-1">Description :</span> {meal?.Description}</p>

          <p ><span className="font-semibold">Ingredients:</span> {meal?.Ingredients}</p>
          <p className="my-1"><span className="font-semibold">Posting Time:</span> {localDate} </p>

          <p className="text-xl flex gap-2"><GrLike onClick={() => handleLike(meal._id)} className="cursor-pointer text-green-500" /><span>{meal?.like}</span> </p>
          <div className="flex justify-between items-center mb-5">
            <p ><span className="font-semibold">Reviews:</span> {meal?.reviews} </p>
            <p className=" flex justify-end"><span className="font-semibold mr-1">Rating:</span> {meal?.rating}</p>
          </div>
          <div className="flex justify-end">
            <button onClick={handleMealRequest} className="px-5 text-white bg-primary-300 py-2   font-semibold rounded-sm">Meal Request</button>
          </div>
        </div>
      </div>
      {/* reviews section here  */}
      <div className="p-4 text-black">
        <h1 className="text-3xl font-semibold text-center mt-10 mb-5  ">Reviews Section
        </h1>

        <div className="mb-5  ">
          {
            reviews.map((item, index) => <div key={item._id}>
              <div className="flex justify-between items-center w-full ">
                <h1 className="w-5/6"> {index + 1}<span className="text-xl">.</span> <span>{item.review}</span></h1>
                <p className="font-thin text-gray-400 text-sm w-1/6 ">review by {item.userName}</p>
              </div>
            </div>)
          }
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <Controller

              name="reviews"
              control={control}
              render={({ field }) => <textarea {...field} style={{ width: "100%", minHeight: 100, padding: 5, backgroundColor: '#EFF3F7', color: "#000" }} />}
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-5 bg-primary-300 py-2 text-white  font-semibold rounded-sm">Add Review</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default MealDetails;