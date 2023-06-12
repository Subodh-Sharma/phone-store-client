import React, { useState, useEffect } from "react";
// import { MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { VStack,Text,Input,Button,FormControl,FormLabel,Spinner, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import { userlogin } from "../redux/features/userSlice";

const initialState = {
    email: "",
    password: ""
};


const UserLogin = () => {
    const [formData, setFormData] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.user }))
    const { email, password } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        error && toast.error(error);
        // eslint-disable-next-line
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(userlogin({ formData, navigate, toast }))
        }
    };

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div style={{ margin: "auto", padding: "15px",backgroundColor: "#394867", color: "gold", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
            <VStack spacing="5px">
                {/* <MDBIcon fas icon="user-circle" className="fa-2x" /> */}
                <Text>Sign In as Buyer</Text>
                        <FormControl isRequired>
                            <FormLabel>User Email</FormLabel>
                            <Input
                            type="email"
                            bg="white"
                            color="black"
                            value={email}
                            name="email"
                            onChange={onInputChange}
                            autoComplete="off"
                            invalid="true"
                            validation="Please provide your email"
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
                            invalid="true"
                            validation="Please Enter your password"
                            />
                        </FormControl>
                        <FormControl>
                            <Button colorScheme="blue" onClick={handleSubmit}>
                                {loading && (
                                    <Spinner size="sm"/>
                                )}
                                Login    
                            </Button>
                        </FormControl>
                    
                    <Link to="/usersignup"><p>Don't have an account? Sign Up</p></Link>
            </VStack>
        </div>
    )
}
export default UserLogin;