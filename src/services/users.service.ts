import axios from "@/services/axios";
import { UpdateUserPayload, User } from "@/types/user";

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get("http://localhost:5000/users");
  return res.data;
};

export const getUser = async (id: number): Promise<User> => {
  const res = await axios.get(`http://localhost:5000/users/${id}`);
  return res.data;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const res = await axios.post("http://localhost:5000/users", user);
  return res.data;
};

// export const updateUser = async (user: User): Promise<User> => {
//   const res = await axios.patch(`/users/${user.id}`, user);
//   return res.data;
// };

export const updateUser = async (
  id: number,
  payload: UpdateUserPayload
): Promise<User> => {
  const res = await axios.patch(`http://localhost:5000/users/${id}`, payload);
  return res.data;
};
export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:5000/users/${id}`);
};
