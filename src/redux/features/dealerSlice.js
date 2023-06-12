import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/dealerApi";

export const dealerlogin = createAsyncThunk("dealer/signin",async({formData,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.dealersignin(formData);
        toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
        });
        navigate('/');
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const dealerregister = createAsyncThunk("dealer/signup",async({formData,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.dealersignup(formData);
        toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
        });
        navigate('/dealersignin');
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

const dealerSlice = createSlice({
    name: "dealer",
    initialState:{
        dealer:"",
        error:"",
        loading: false,
    },
    reducers:{
        setDealer:(state,action)=>{
            state.dealer = action.payload;
        },
        setDealerLogout:(state,action)=>{
            localStorage.clear();
            state.dealer = "";
        },
        setDealerEmpty:(state,action)=>{
            state.dealer = "";
        }
    },
    extraReducers:{
        [dealerlogin.pending]:(state,action)=>{
            state.loading = true;
        },
        [dealerlogin.fulfilled]:(state,action)=>{
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.dealer = action.payload;
        },
        [dealerlogin.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [dealerregister.pending]:(state,action)=>{
            state.loading = true;
        },
        [dealerregister.fulfilled]:(state,action)=>{
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.dealer = action.payload;
        },
        [dealerregister.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        }
    }
})
export const {setDealer,setDealerLogout,setDealerEmpty} = dealerSlice.actions;
export default dealerSlice.reducer;