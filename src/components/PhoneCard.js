import React from "react";
import { Card,CardBody,Image,Button,useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addincart } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";


const cartData = {
    userId: "",
    phoneId: "",
    amount: "",
    name: "",
    company: "",
    RAM: "",
    storage: "",
    camera: "",
    imageFile: "",
    price: ""
}

const PhoneCard = ({ _id, name, company, RAM, storage, camera, imageFile, price, dealer,stock }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { user } = useSelector((state) => ({ ...state.user }))
    const userId = user?.result?._id;
    cartData.userId = userId;
    return (
        <Card maxW="sm" bg="#394867" color="gold">
            <CardBody>
                <Image src={imageFile} alt={name} borderRadius="lg"/>
                <p>{company} {name}</p>
                <p>RAM: {RAM}</p>
                <p>Storage: {storage}</p>
                <p>Camera: {camera}</p>
                <p>Price: Rs {price}</p>
                <p>Dealer: {dealer}</p>
                <p>Stocks: {stock}</p>

                    <Button colorScheme='blue' onClick={() => {
                        if (userId) {
                            cartData.phoneId = _id;
                            cartData.amount = price;
                            cartData.name = name;
                            cartData.company = company;
                            cartData.RAM = RAM;
                            cartData.storage = storage;
                            cartData.camera = camera;
                            cartData.imageFile = imageFile;
                            cartData.price = price;
                            dispatch(addincart({ cartData, navigate, toast }))
                        } else {
                            window.alert("You need to Login as user to buy product.")
                            return;
                        }
                    }}>
                        ADD TO CART</Button>
            </CardBody>
        </Card>
    )
}
export default PhoneCard;