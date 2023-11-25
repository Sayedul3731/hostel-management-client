import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useMeal = (_id) => {
    const axiosPublic = useAxiosPublic();
    const { data: meal = {} } = useQuery({
        queryKey: ['meal'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals/${_id}`)
            return res.data;
        }
    })
    return [meal];
};

export default useMeal;