import api from "../lib/api";

export const getUsers = () => api.get("/users");

export const getUserContent = (userId) => api.get(`/content/${userId}`);

export const searchContent = (query) => api.get(`/search?query=${encodeURIComponent(query)}`);

export const updateContentStatus = (userId, contentId, status) => 
  api.patch(`/content/${userId}/${contentId}/status`, { status });

export const userService = {
  getUsers,
  getUserContent,
  searchContent,
  updateContentStatus,
};
