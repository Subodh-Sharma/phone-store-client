import React, { useState, useEffect } from "react";
// import {MDBCard,MDBCardBody,MDBInput,MDBValidation,MDBBtn,MDBIcon,MDBSpinner} from "mdb-react-ui-kit";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import toast from "react-toastify";
import FileBase from "react-file-base64";
import { addPhone } from "../redux/features/phoneSlice";

const initialState = {
  name: "",
  company: "",
  RAM: "",
  storage: "",
  camera: "",
  price: "",
  stock: "",
};

const AddPhone = () => {
  const [phoneData, setPhoneData] = useState(initialState);
  const { error, loading } = useSelector((state) => ({ ...state.phone }));
  const { dealer } = useSelector((state) => ({ ...state.dealer }));
  const { name, company, RAM, storage, camera, price, stock } = phoneData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setPhoneData({ ...phoneData, [name]: value });
  };
  // setPhoneData({...phoneData,addedBy : adminId})
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && company && RAM && storage && camera && price && stock) {
      const updatedPhoneData = { ...phoneData, dealer: dealer?.result?.name };
      dispatch(addPhone({ updatedPhoneData, navigate, toast }));
    }
  };
  useEffect(() => {
    error && toast({
        title: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
    });
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
        <VStack spacing="5px">
          <Text>ADD NEW PHONE</Text>
          {/* <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3"> */}
          <FormControl isRequired>
            <FormLabel>Phone Name</FormLabel>
            <Input
              type="text"
              bg="white"
              color="black"
              value={name}
              name="name"
              onChange={onInputChange}
              autoComplete="off"
              invalid="true"
              validation="Please provide Phone Name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input
              type="text"
              bg="white"
              color="black"
              value={company}
              name="company"
              onChange={onInputChange}
              autoComplete="off"
              invalid="true"
              validation="Please provide Company Name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>RAM</FormLabel>
            <Input
              type="number"
              bg="white"
              color="black"
              value={RAM}
              name="RAM"
              onChange={onInputChange}
              autoComplete="off"
              invalid="true"
              validation="Please provide RAM detail"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Storage</FormLabel>
            <Input
              type="Number"
              bg="white"
              color="black"
              value={storage}
              name="storage"
              onChange={onInputChange}
              autoComplete="off"
              invalid="true"
              validation="Please provide Storage detail"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Camera</FormLabel>
            <Input
              type="number"
              bg="white"
              color="black"
              value={camera}
              name="camera"
              onChange={onInputChange}
              autoComplete="off"
              invalid="true"
              validation="Please Enter Camera details"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Image</FormLabel>
            <FileBase
              type="file"
              bg="white"
              color="black"
              multiple={false}
              onDone={({ base64 }) =>
                setPhoneData({ ...phoneData, imageFile: base64 })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              bg="white"
              color="black"
              value={price}
              name="price"
              onChange={onInputChange}
              autoComplete="off"
              invalid="true"
              validation="Please Enter Price"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Stock</FormLabel>
            <Input
              type="number"
              bg="white"
              color="black"
              value={stock}
              name="stock"
              onChange={onInputChange}
              autoComplete="off"
              invalid="true"
              validation="Please provide Stock"
            />
          </FormControl>
          <FormControl>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {loading && <Spinner size="sm" />}
              ADD
            </Button>
          </FormControl>
          {/* </MDBValidation> */}
        </VStack>
      </div>
    </div>
  );
};
export default AddPhone;
