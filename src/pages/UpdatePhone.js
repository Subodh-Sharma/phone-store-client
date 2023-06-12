import React, { useState } from "react";
// import { MDBCard, MDBCardImage, MDBInput, MDBValidation,MDBBtn,MDBSpinner } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import {Card,CardBody,Button,Spinner,Input,Stack,Image, FormControl, FormLabel, useToast} from "@chakra-ui/react";
import { useParams,useNavigate } from "react-router-dom";
import { updatephone } from "../redux/features/phoneSlice";
// import { toast } from "react-toastify";

const initialState = {
    price: "",
    stock: ""
}
const UpdatePhone = () => {
    const [input, setInput] = useState(initialState);
    const { phone,loading } = useSelector((state) => ({ ...state.phone }))
    const {price,stock} = input;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const {id} = useParams();    

    const onInputChange = (e) => {
        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(price && stock){
            const updatedPhoneData = ({...input})
            dispatch(updatephone({id,updatedPhoneData,navigate,toast}))
        }
    }

    return (
        <div style={{ margin: "auto", padding: "120px",
         maxWidth: "600px", alignContent: "center" }}>
            <Card backgroundColor="#394867" color="gold">
                <CardBody>
                <Image src={phone?.imageFile} alt={phone?.company} borderRadius="lg" />
                <Stack>
                <div className="text-center">{phone?.company} {phone?.name}</div>
                <div className="text-center">RAM: {phone?.RAM}</div>
                <div className="text-center">Storage: {phone?.storage}</div>
                <div className="text-center">Camera: {phone?.camera}</div>


                    <FormControl isRequired>
                        <FormLabel>Update Price</FormLabel>
                        <Input
                            type="Number"
                            bg="white"
                            color="black"
                            value={price}
                            name="price"
                            onChange={onInputChange}
                            required
                            autoComplete="off"
                            invalid="true"
                            validation="Please provide Updated Price"
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Stock</FormLabel>
                        <Input
                            type="Number"
                            bg="white"
                            color="black"
                            value={stock}
                            name="stock"
                            onChange={onInputChange}
                            required
                            autoComplete="off"
                            invalid="true"
                            validation="Please provide Updated Stock"
                        />
                    </FormControl>
                    <div className="col-12">
                        <Button colorScheme="blue" onClick={handleSubmit}>
                            {loading && (
                                <Spinner size="sm" />
                            )}
                            UPDATE
                        </Button>
                    </div>
                    </Stack>
                </CardBody>
            </Card>
        </div>
    )
}

export default UpdatePhone;