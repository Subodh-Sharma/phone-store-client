import axios from "axios";

const API = axios.create({baseURL:"https://subodh-phone-store-server.vercel.app/"});
// const API = axios.create({baseURL:"http://localhost:8000/"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});


export const addphone = (phoneData)=>API.post("phone/addphone",phoneData);
export const getphones = ()=>API.get("phone/getphones");
export const getphone = (id)=>API.get(`phone/getphone/${id}`)
export const dealersphone = (dealerId)=>API.get(`phone/dealersphone/${dealerId}`);
export const updatephone = (id,updatedPhoneData)=>API.patch(`phone/updatephone/${id}`,updatedPhoneData);
export const deletephone = (id)=>API.delete(`phone/deletephone/${id}`);
export const search = (searchQuery)=>API.get(`phone/search?q=${searchQuery}`)
export const increasestock = (id,quantity)=>API.patch(`phone/increasestock/${id}`,quantity)
export const decreasestock = (id,quantity)=>API.patch(`phone/decreasestock/${id}`,quantity)
