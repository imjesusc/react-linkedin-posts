import { ApiUser, User } from "@/models/user.model";

export const userAdapter = (user: ApiUser): User => {
  return {
    id: user.sub,
    name: user.name,
    email: user.email,
  };
};
