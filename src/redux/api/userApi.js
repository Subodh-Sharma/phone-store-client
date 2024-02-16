import axios from "axios";

// const API = axios.create({baseURL:"https://subodh-phone-store-server.vercel.app/"});
const API = axios.create({baseURL:"http://localhost:8000/"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const usersignin = (formData)=>API.post("user/signin",formData);
export const usersignup = (formData)=>API.post("user/signup",formData);
export const addincart = (cartData)=>API.patch("user/addincart",cartData);
export const removefromcart = (id,RemoveData)=>API.patch(`user/removefromcart/${id}`,RemoveData);
export const addonecart = (id,cartData)=>API.patch(`user/addonecart/${id}`,cartData);
export const removeonecart = (id,cartData)=>API.patch(`user/removeonecart/${id}`,cartData);
export const emptycart = (userId)=>API.patch(`user/emptycart/${userId}`);
export const getcart = (userId)=>API.get(`user/getcart/${userId}`);
