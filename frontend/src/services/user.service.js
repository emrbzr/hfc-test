import api from "../lib/api";

export const getUsers = () => api.get("/users");

export const getUserContent = (userId) => api.get(`/content/${userId}`);

export const searchContent = (query) => api.get(`/search?query=${encodeURIComponent(query)}`);

export const updateContentStatus = (contentId, status) => api.patch(`/content/${contentId}/status`, { status });

export const userService = {
  getUsers,
  getUserContent,
  searchContent,
  updateContentStatus,
};
