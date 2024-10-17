import api from "../lib/api";

export const getUsers = () => api.get("/users");

export const getUserContent = (userId) => api.get(`/content/${userId}`);

export const userService = {
  getUsers,
  getUserContent,
};
