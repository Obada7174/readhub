import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useLottieAnimation = (animationPath: string) => {
  return useQuery({
    queryKey: ['lottie', animationPath],
    queryFn: async () => {
        const response = await axios.get(animationPath, {
            responseType: 'json',
          });
                return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, 
    gcTime: 1000 * 60 * 60 * 24 * 7, 
    retry: false,
  });
};