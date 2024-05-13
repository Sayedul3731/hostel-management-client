import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useRoom = (_id) => {
    const axiosPublic = useAxiosPublic();
    const { data: room = {}, refetch } = useQuery({
        queryKey: ['room', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/rooms/${_id}`)
            return res.data;
        }
    })
    return [room, refetch];
};

export default useRoom;