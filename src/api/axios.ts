import axios from "axios";

export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const API_URL = "https://api.themoviedb.org/3/";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
