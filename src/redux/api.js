import axios from "axios";

const API = axios.create({baseURL:"http://localhost:5000"});

export const getAllProducts = () => API.get("/api/products/");

export const addAnItem = (item) =>API.post("/api/cart/",item);
export const getAllAddedItems = () => API.get("/api/cart/");