import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "./features/userSlice";
import DealerReducer from "./features/dealerSlice";
import PhoneReducer from "./features/phoneSlice";

export default configureStore({
    reducer:{
        user: UserReducer,
        dealer: DealerReducer,
        phone: PhoneReducer,
    }
});