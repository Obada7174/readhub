import { useUserContext } from "@/context/userContext";

export const useUser = () => {
  return useUserContext(); 
};

export { useUserContext };
