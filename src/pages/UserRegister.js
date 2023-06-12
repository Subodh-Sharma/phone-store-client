import React, { useState, useEffect } from "react";
// import {MDBCard,MDBCardBody,MDBInput,MDBCardFooter,MDBValidation,MDBBtn,MDBIcon,MDBSpinner} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import {
  useToast,
  VStack,
  FormControl,
  FormLabel,
  Text,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import { userregister } from "../redux/features/userSlice";

const initialState = {
  name: "",
  email: "",
  contact: "",
  password: "",
  cpassword: "",
  type: "user",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.user }));
  const { name, email, contact, password, cpassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      return toast.error("Password should match");
    }
    if (name && email && contact && password && cpassword) {
      dispatch(userregister({ formData, navigate, toast }));
    }
  };
  useEffect(() => {
    error && toast.error(error);
    // eslint-disable-next-line
  }, [error]);

  return (
    <div>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          backgroundColor: "#394867",
          color: "gold",
          maxWidth: "450px",
          alignContent: "center",
          marginTop: "80px",
        }}
      >
        <VStack alignment="center">
          {/* <MDBIcon fas icon="user-circle" className="fa-2x" /> */}
          <Text>Sign Up As Dealer</Text>
          <FormControl isRequired>
            <FormLabel>Dealer Name</FormLabel>
            <Input
              type="text"
              bg="white"
              color="black"
              value={name}
              name="name"
              onChange={onInputChange}
              autoComplete="off"
              invalid
              validation="Please provide your Name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Dealer Email</FormLabel>
            <Input
              type="email"
              bg="white"
              color="black"
              value={email}
              name="email"
              onChange={onInputChange}
              autoComplete="off"
              invalid
              validation="Please provide your email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Contact</FormLabel>
            <Input
              type="Number"
              bg="white"
              color="black"
              value={contact}
              name="contact"
              onChange={onInputChange}
              autoComplete="off"
              invalid
              validation="Please provide your Contact Number"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              bg="white"
              color="black"
              value={password}
              name="password"
              onChange={onInputChange}
              autoComplete="off"
              invalid
              validation="Please Enter your password"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              bg="white"
              color="black"
              value={cpassword}
              name="cpassword"
              onChange={onInputChange}
              autoComplete="off"
              invalid
              validation="Please Enter your Confirm Password"
            />
          </FormControl>
          <FormControl>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {loading && <Spinner size="sm" />}
              Register
            </Button>
          </FormControl>
          <Link to="/dealersignin">
            <p>Already have an account? Sign In</p>
          </Link>
        </VStack>
      </div>
    </div>
  );
};
export default Register;
