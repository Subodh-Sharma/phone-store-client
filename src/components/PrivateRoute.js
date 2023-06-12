import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({children})=>{
    const {user} = useSelector((state)=>({...state.user}))
    const {dealer} = useSelector((state)=>({...state.dealer}))

    const x = user || dealer;

    return x ? children : <LoadingToRedirect/>
}
export default PrivateRoute;