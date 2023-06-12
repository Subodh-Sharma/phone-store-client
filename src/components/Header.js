import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartEmpty, setUserLogout } from "../redux/features/userSlice";
import { setDealerLogout } from "../redux/features/dealerSlice";
import {
  search,
  getphones,
  setDealerPhonesEmpty,
} from "../redux/features/phoneSlice";
import { Button, Box, Text, Input } from "@chakra-ui/react";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showBasic, setShowBasic] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { dealer } = useSelector((state) => ({ ...state.dealer }));
  const { user } = useSelector((state) => ({ ...state.user }));
  var ID = dealer?.result?._id || user?.result?._id;
  const handleLogout = () => {
    if (dealer) {
      dispatch(setDealerLogout());
      dispatch(setDealerPhonesEmpty());
    }
    if (user) {
      dispatch(setUserLogout());
      dispatch(setCartEmpty());
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      dispatch(search(searchQuery));
      navigate(`phone/search?q=${searchQuery}`);
      setSearchQuery("");
    } else {
      navigate("/");
    }
  };
  const handleHome = () => {
    dispatch(getphones());
  };
  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      bg="#212A3E"
      color= "gold"
      w="100%"
    >
        <Text display="flex" justifyContent="center" color="gold" fontSize="30px">
          PHONE STORE
        </Text>

      <Box display="flex" justifyItems="space-between" w="100%">
        <Box display="flex" marginLeft="10%" w="50%">
          <Link
            active="true"
            aria-current="page"
            to="/"
            style={{ color: "white",fontSize:"20px",margin: "2px 10px 2px 10px" }}
            onClick={handleHome}
          >
            Home
          </Link>
          {dealer?.result?._id && (
            <>
              <Link to="/addphone" style={{ color: "white",fontSize:"20px",margin: "2px 10px 2px 10px" }}>
                AddPhone
              </Link>
              <Link to="/dashboard" style={{ color: "white",fontSize:"20px",margin: "2px 10px 2px 10px" }}>
                Dashboard
              </Link>
            </>
          )}
          {user?.result?._id && (
            <>
              <Link
                to={`/cart/${user?.result?._id}`}
                style={{ color: "white",fontSize:"20px",margin: "2px 10px 2px 10px" }}
              >
                Cart
              </Link>
            </>
          )}
          {ID ? (
            <Link to="/" style={{ color: "white",fontSize:"20px",margin: "2px 10px 2px 10px" }} onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <>
              <Link to="/selectsignin" style={{ color: "white",fontSize:"20px",margin: "2px 10px 2px 10px" }}>
                SignIn
              </Link>

              <Link to="/selectsignup" style={{ color: "white",fontSize:"20px",margin: "2px 10px 2px 10px" }}>
                SignUp
              </Link>
            </>
          )}
        </Box>
        {/* </MDBNavbarNav> */}
        <Box w="50%" marginLeft="5%">
            <Input
              type="text"
              // variant='filled'
              bg="white"
              // color="white"
              w="60%"
              marginBottom="5px"
              className="form-control"
              placeholder="search phone"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <Button colorScheme='blue' marginLeft="5%" marginBottom="5px" color="dark" type="submit" onClick={handleSubmit}>
              Search
            </Button>
        </Box>
      </Box>
    </Box>
  );
}
