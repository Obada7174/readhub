import { useUserContext } from "@/context/userContext";

export const useUser = () => {
  const { user, setUser } = useUserContext();
  return { user, setUser };
};
