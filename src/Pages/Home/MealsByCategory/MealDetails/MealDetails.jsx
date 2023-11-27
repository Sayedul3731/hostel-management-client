import { GrLike } from "react-icons/gr";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useMeals from "../../../../hooks/useMeals";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";



const MealDetails = () => {
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useMeals();
  const user = useAuth();
  const navigate = useNavigate();




  const meal = useLoaderData()
  const handleLike = (id) => {
    console.log('click on', id);
    if (user?.email) {
      axiosSecure.patch(`/meals/${id}`)
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
          // Swal.fire({
          //   title: "Deleted!",
          //   text: "Your file has been deleted.",
          //   icon: "success"
          // });
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
              userEmail: res.data[0].email
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
            <button onClick={handleMealRequest} className="w-full bg-red-500 py-2 text-white font-semibold rounded-sm">Meal Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;