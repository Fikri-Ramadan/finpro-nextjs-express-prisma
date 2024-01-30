import customAxios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export default function useEventById({ id }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`event/${id}`],
    queryFn: async () => {
      const response = await customAxios.get(`/api/events/${id}`);
      return response.data?.results;
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
