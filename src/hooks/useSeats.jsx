import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSeats = () => {
    const axiosPublic = useAxiosPublic();
        const { data: seats = [],refetch } = useQuery({
            queryKey: ['seats'],
            queryFn: async () => {
                const res = await axiosPublic.get('/seats')
                return res.data;
            }
        })
        return [seats, refetch];
};

export default useSeats;