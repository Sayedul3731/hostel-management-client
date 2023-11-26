import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUpcomingMeals = () => {

    const axiosSecure = useAxiosSecure();
    const {data: meals= [] , refetch} = useQuery({
        queryKey: ['upcomingMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/upcomingMeals')
            return res.data;
        }
        
    })
    return [meals, refetch]
};

export default useUpcomingMeals;