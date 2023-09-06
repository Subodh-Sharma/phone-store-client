import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import { ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
import Header from "./components/Header";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import DealerLogin from "./pages/DealerLogin";
import DealerRegister from "./pages/DealerRegister";
import AddPhone from "./pages/AddPhone";
import { setUser } from "./redux/features/userSlice";
import { setDealer } from "./redux/features/dealerSlice";
import { useDispatch } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import UpdatePhone from "./pages/UpdatePhone";
import Cart from "./pages/Cart";
import "./App.css"

const App = () => {
  const dispatch = useDispatch();
  const x = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if(x?.result?.type==="dealer"){
      dispatch(setDealer(x));
    }else if(x?.result?.type==="user"){
      dispatch(setUser(x));
    }
    // eslint-disable-next-line
  },[])
  return (
    <div className="App">
    <BrowserRouter>
      <Header />
      {/* <ToastContainer style={{ marginTop: "50px" }} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selectsignin" element={<LoginComponent />} />
        <Route path="/selectsignup" element={<RegisterComponent />} />
        <Route path="/usersignin" element={<UserLogin />} />
        <Route path="/usersignup" element={<UserRegister />} />
        <Route path="/dealersignin" element={<DealerLogin />} />
        <Route path="/dealersignup" element={<DealerRegister />} />
        <Route path="/addphone" element={<PrivateRoute><AddPhone /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/updatephone/:id" element={<PrivateRoute><UpdatePhone /></PrivateRoute>} />
        <Route path="/phone/search" element={<Home />} />
        <Route path="/cart/:id" element={<PrivateRoute><Cart /></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;