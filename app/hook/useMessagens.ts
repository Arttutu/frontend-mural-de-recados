import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../service/messagemService";


export function useMessagens() {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await getMessages();
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}