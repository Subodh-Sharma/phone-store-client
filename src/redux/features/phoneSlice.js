import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/phoneApi";

export const addPhone = createAsyncThunk("phone/addphone",async({updatedPhoneData,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.addphone(updatedPhoneData);
        toast({
            title: "Phone Added Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
        });
        navigate("/");
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const getphones = createAsyncThunk("phone/getphones",async(_,{rejectWithValue})=>{
    try{
        const response = await api.getphones();
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const getphone = createAsyncThunk("phone/getphone",async(id,{rejectWithValue})=>{
    try{
        const response = await api.getphone(id);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const dealersphone = createAsyncThunk("phone/dealersphone",async(dealerId,{rejectWithValue})=>{
    try{
        const response = await api.dealersphone(dealerId);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const updatephone = createAsyncThunk("phone/updatephone",async({id,updatedPhoneData,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.updatephone(id,updatedPhoneData);
        toast({
            title: "Phone Updated Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
        });
        navigate("/dashboard")
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const deletephone = createAsyncThunk("phone/deletephone",async({id,toast},{rejectWithValue})=>{
    try{
        const response = await api.deletephone(id);
        toast({
            title: "Phone Deleted Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
        });
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})
export const search = createAsyncThunk("phone/search",async(searchQuery,{rejectWithValue})=>{
    try{
        const response = await api.search(searchQuery);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})
export const increasestock = createAsyncThunk("phone/increasestock",async({id,quantity},{rejectWithValue})=>{
    try{
        const response = await api.increasestock(id,quantity);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})
export const decreasestock = createAsyncThunk("phone/decreasestock",async({id,quantity},{rejectWithValue})=>{
    try{
        const response = await api.decreasestock(id,quantity);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

const phoneSlice = createSlice({
    name:"phone",
    initialState:{
        phone:{},
        phones:[],
        dealerPhones:[],
        error:"",
        loading: false
    },
    reducers:{
        setDealerPhonesEmpty:(state,action)=>{
            state.dealerPhones=[];
        },
        setPhoneEmpty:(state,action)=>{
            state.phone={};
        },
        setPhone:(state,action)=>{
            state.phone = action.payload;
        }
    },
    extraReducers:{
        [addPhone.pending]:(state,action)=>{
            state.loading = true;
        },
        [addPhone.fulfilled]:(state,action)=>{
            state.loading = false;
            state.phones = [action.payload];
        },
        [addPhone.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [getphones.pending]:(state,action)=>{
            state.loading = true;
        },
        [getphones.fulfilled]:(state,action)=>{
            state.loading = false;
            state.phones = action.payload;
        },
        [getphones.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [getphone.pending]:(state,action)=>{
            state.loading = true;
        },
        [getphone.fulfilled]:(state,action)=>{
            state.loading = false;
            state.phone = action.payload;
        },
        [getphone.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [search.pending]:(state,action)=>{
            state.loading = true;
        },
        [search.fulfilled]:(state,action)=>{
            state.loading = false;
            state.phones = action.payload;
        },
        [search.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [dealersphone.pending]:(state,action)=>{
            state.loading = true;
        },
        [dealersphone.fulfilled]:(state,action)=>{
            state.loading = false;
            state.dealerPhones = action.payload;
        },
        [dealersphone.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [updatephone.pending]:(state,action)=>{
            state.loading = true;
        },
        [updatephone.fulfilled]:(state,action)=>{
            state.loading = false;
            const {arg:{id}} = action.meta;
            if(id){
                state.dealerPhones = state.dealerPhones.map((item)=>item._id===id ? action.payload : item);
                state.phones = state.phones.map((item)=>item._id===id ? action.payload : item);
            }
        },
        [updatephone.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [deletephone.pending]:(state,action)=>{
            state.loading = true;
        },
        [deletephone.fulfilled]:(state,action)=>{
            state.loading = false;
            const {arg:{id}} = action.meta;
            if(id){
                state.dealerPhones = state.dealerPhones.filter((item)=>item._id!==id);
                state.phones = state.phones.filter((item)=>item._id!==id);
            }
        },
        [deletephone.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [increasestock.pending]:(state,action)=>{
            state.loading = true;
        },
        [increasestock.fulfilled]:(state,action)=>{
            state.loading = false;
            const {arg:{id}} = action.meta;
            if(id){
                state.phones = state.phones.map((item)=>item._id===id ? action.payload : item);
            }
        },
        [increasestock.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [decreasestock.pending]:(state,action)=>{
            state.loading = true;
        },
        [decreasestock.fulfilled]:(state,action)=>{
            state.loading = false;
            const {arg:{id}} = action.meta;
            if(id){
                state.phones = state.phones.map((item)=>item._id===id ? action.payload : item);
            }
        },
        [decreasestock.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})
export const {setDealerPhonesEmpty,setPhoneEmpty,setPhone} = phoneSlice.actions;
export default phoneSlice.reducer;