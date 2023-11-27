import { GrLike } from "react-icons/gr";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useMeals from "../../../../hooks/useMeals";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react"



const MealDetails = () => {
  const { handleSubmit, control } = useForm();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useMeals();
  const user = useAuth();
  const navigate = useNavigate();
  const meal = useLoaderData();
  const [reviews, setReviews] = useState([])

console.log(meal);


  useEffect(() => {
    refetch()
    axiosSecure.get(`/reviews/${meal?._id}`)
      .then(res => {
        console.log(res.data);
        setReviews(res.data)
      })
  }, [axiosSecure, meal._id,refetch])

  const handleLike = (id) => {
    console.log('click on', id);
    if (user?.email) {
      axiosSecure.patch(`/meals/${id}`, {lk : 1})
        .then(res => {
          console.log(res.data);
          refetch();
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
          console.log(res.data);
          if (res.data[0].Badge !== 'Bronze') {
            console.log('Not Bronze');
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
              Ingredients : meal?.Ingredients

            }
            axiosSecure.post('/requestedMeals', newInfo)
              .then(res => {
                console.log(res.data);
                if (res.data) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your request is succeeded!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  refetch()
                }
              })
          } else {
            console.log('Yes Bronze');
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

    if (user?.email) {
      console.log(user);
      const reviewsInfo = {
        review: data.reviews,
        userName: user?.displayName,
        userEmail: user?.email,
        mealId: meal?._id,
        title: meal?.title,
        like: meal?.like,
        reviews: meal?.reviews

      }
      axiosSecure.post('/reviews', reviewsInfo)
        .then(res => {
          if (res.data) {
            refetch()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your review is added!",
              showConfirmButton: false,
              timer: 1500
            });
            axiosSecure.patch(`/meals/${meal?._id}`, {rev: 1})
              .then(res => {
                console.log(res.data);
                refetch()
              })
          }
        })
    }
  }

  return (

    <div className="p-4">
      <Link to="/meals">
        <button className="my-5 px-5  bg-red-500 py-2 text-white font-semibold rounded-sm">SEE All</button>
      </Link>
      <div className=" bg-base-100 rounded shadow-sm p-4">
        <div className="">
          <figure className="h-[500px]"><img className="h-full w-full object-cover  rounded" src={meal?.image} alt="Shoes" /></figure>
        </div>
        <div className="mt-4">
          <p className=" flex justify-start gap-[1px] items-center"><span className="font-semibold mr-1">Admin Name:</span>  {meal?.adminName} </p>

          <p className=" my-1"><span className="font-semibold mr-1">Description :</span> {meal?.Description}</p>

          <p ><span className="font-semibold">Ingredients:</span> {meal?.Ingredients}</p>
          <p className="my-1"><span className="font-semibold">Posting Time:</span> {meal?.time} </p>

          <p className="text-xl flex gap-2"><GrLike onClick={() => handleLike(meal._id)} className="cursor-pointer text-green-500" /><span>{meal?.like}</span> </p>
          <div className="flex justify-between items-center mb-5">
            <p ><span className="font-semibold">Reviews:</span> {meal?.reviews} </p>
            <p className=" flex justify-end"><span className="font-semibold mr-1">Rating:</span> {meal?.rating}</p>
          </div>
          <div>
            <button onClick={handleMealRequest} className="w-full bg-red-500 py-2 text-white font-semibold rounded-sm">Meal Request</button>
          </div>
        </div>
      </div>
      {/* reviews section here  */}
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-center mt-10 mb-5">Reviews Section
        </h1>

        <div className="mb-5">
          {
            reviews.map((review, index) => <div key={review._id}>
             <div className="flex justify-between items-center">
             <h1 className=""> {index + 1}<span className="text-xl">.</span> {review.reviews}</h1>
             <p className="font-thin text-sm">review by {review.userName}</p>
             </div>
            </div> )
          }
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <Controller
              name="reviews"
              control={control}
              render={({ field }) => <textarea {...field} style={{ width: "100%", minHeight: 100, padding: 5, backgroundColor: 'lightgray' }} />}
            />
          </div>
          <button type="submit" className="w-full bg-red-500 py-2 text-white font-semibold rounded-sm">Add Review</button>
        </form>

      </div>
    </div>
  );
};

export default MealDetails;