import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useMeal = (_id) => {
    const axiosPublic = useAxiosPublic();
    const { data: meal = {}, refetch } = useQuery({
        queryKey: ['meal', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals/${_id}`)
            return res.data;
        }
    })
    return [meal, refetch];
};

export default useMeal;