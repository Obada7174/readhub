"use client";

import { useCreateUser } from "@/hooks/react-query/users/useUsersQuery";
import UserForm from "@/components/dashboard/users/UserForm";
import { UserFormValues } from "@/lib/validators/user.validator";
import { User } from "@/types/user";

export default function AddUser() {
  const createUserMutation = useCreateUser();

  const handleAdd = async (data: UserFormValues) => {
    await createUserMutation.mutateAsync(data as User);
  };

  return <UserForm mode="add" onSubmit={handleAdd} />;
}
