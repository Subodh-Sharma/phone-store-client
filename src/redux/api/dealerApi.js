import axios from "axios";

const API = axios.create({baseURL:"https://subodh-phone-store-server.vercel.app/"});    // https://subodh-phone-store-mern-app.onrender/

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const dealersignin = (formData)=>API.post("dealer/signin",formData);
export const dealersignup = (formData)=>API.post("dealer/signup",formData);