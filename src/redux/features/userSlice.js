import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import * as api from "../api/userApi";

export const userlogin = createAsyncThunk("user/signin",async({formData,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.usersignin(formData);
        toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
        });
        navigate("/");
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const userregister = createAsyncThunk("user/signup",async({formData,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.usersignup(formData);
        toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
        });
        navigate("/usersignin");
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const getcart = createAsyncThunk("user/getcart",async(userId,{rejectWithValue})=>{
    try{
        const response = await api.getcart(userId);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const addincart = createAsyncThunk("user/addincart",async({cartData,navigate,toast},{rejectWithValue})=>{
    try{
        const response = await api.addincart(cartData);
        toast({
            title: "Added in Cart",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top"
        });
        navigate(`/cart/${cartData.userId}`);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const removefromcart = createAsyncThunk("user/removefromcart",async({id,RemoveData,toast},{rejectWithValue})=>{
    try{
        const response = await api.removefromcart(id,RemoveData);
        toast({
            title: "Phone removed from Cart",
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

export const addonecart = createAsyncThunk("user/addonecart",async({id,cartData},{rejectWithValue})=>{
    try{
        const response = await api.addonecart(id,cartData);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const removeonecart = createAsyncThunk("user/removeonecart",async({id,cartData},{rejectWithValue})=>{
    try{
        const response = await api.removeonecart(id,cartData);
        return response.data;
    }catch(err){
        return rejectWithValue(err.response.data);
    }
})

export const emptycart = createAsyncThunk("user/emptycart",async({userId,toast},{rejectWithValue})=>{
    try{
        const response = await api.emptycart(userId);
        toast({
            title: "Your Cart is Empty Now",
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

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:"",
        cartItems:[],
        error:"",
        loading:false
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        setUserLogout:(state,action)=>{
            localStorage.clear();
            state.user = "";
            state.cartItems=[];
            state.error=""
        },
        setUserEmpty:(state,action)=>{
            state.user = "";
        },
        setCartEmpty:(state,action)=>{
            state.cartItems = [];
        }
    },
    extraReducers:{
        [userlogin.pending]:(state,action)=>{
            state.loading = true;
        },
        [userlogin.fulfilled]:(state,action)=>{
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [userlogin.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [userregister.pending]:(state,action)=>{
            state.loading = true;
        },
        [userregister.fulfilled]:(state,action)=>{
            state.loading = false;
            localStorage.setItem("profile",JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [userregister.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [getcart.pending]:(state,action)=>{
            state.loading = true;
        },
        [getcart.fulfilled]:(state,action)=>{
            state.loading = false;
            state.cartItems = action.payload;
        },
        [getcart.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [addincart.pending]:(state,action)=>{
            state.loading = true;
        },
        [addincart.fulfilled]:(state,action)=>{
            state.loading = false;
            state.cartItems = action.payload;
        },
        [addincart.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [removefromcart.pending]:(state,action)=>{
            state.loading = true;
        },
        [removefromcart.fulfilled]:(state,action)=>{
            state.loading = false;
            const {arg:{id}} = action.meta;
            if(id){
                state.cartItems = state.cartItems.filter((item)=>item._id!==id);
            }
        },
        [removefromcart.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [addonecart.pending]:(state,action)=>{
            state.loading = true;
        },
        [addonecart.fulfilled]:(state,action)=>{
            state.loading = false;
            const {arg:{id}} = action.meta;
            if(id){
                state.cartItems = state.cartItems.map((item)=>item._id===id ? action.payload : item)
            }
        },
        [addonecart.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [removeonecart.pending]:(state,action)=>{
            state.loading = true;
        },
        [removeonecart.fulfilled]:(state,action)=>{
            state.loading = false;
            const {arg:{id}} = action.meta;
            if(id){
                state.cartItems = state.cartItems.map((item)=>item._id===id ? action.payload : item)
            }
        },
        [removeonecart.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        },
        [emptycart.pending]:(state,action)=>{
            state.loading = true;
        },
        [emptycart.fulfilled]:(state,action)=>{
            state.loading = false;
            state.cartItems = action.payload;
        },
        [emptycart.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        }
    }
})
export const {setUser,setUserLogout,setUserEmpty,setCartEmpty,setCart} = userSlice.actions;
export default userSlice.reducer;