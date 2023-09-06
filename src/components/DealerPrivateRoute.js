import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const DealerPrivateRoute = ({children})=>{
    const {dealer} = useSelector((state)=>({...state.dealer}))

    return dealer ? children : <LoadingToRedirect/>
}
export default DealerPrivateRoute;