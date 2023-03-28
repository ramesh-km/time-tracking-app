import axios from "axios";
import {
  deleteUserFromLocalStorage,
  retriveUserFromLocalStorage,
} from "./auth";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    // Add the user's token to the request headers
    const user = retriveUserFromLocalStorage();
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the user is unauthorized, delete the user from local storage and redirect to login page
    if ([401, 403].includes(error.response?.status)) {
      console.log("Unauthorized");
      deleteUserFromLocalStorage();

      if (window.location.pathname !== "/login") {
        window.location.pathname = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default http;
