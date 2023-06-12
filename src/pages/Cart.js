import React, { useEffect } from "react";
// import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBCardGroup } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import {
  useToast,
  Button,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Box
} from "@chakra-ui/react";
// import { toast } from "react-toastify";
import {
  removefromcart,
  addonecart,
  removeonecart,
  getcart,
  emptycart,
} from "../redux/features/userSlice";

const cartData = {
  userId: "",
  amount: "",
};
const RemoveData = {
  userId: "",
};
const Cart = () => {
  const { user, cartItems } = useSelector((state) => ({ ...state.user }));
  const dispatch = useDispatch();
  const toast = useToast();
  const userId = user?.result?._id;

  const handleRemove = (id) => {
    RemoveData.userId = userId;
    console.log(RemoveData);
    dispatch(removefromcart({ id, RemoveData, toast }));
  };
  const handleEmpty = () => {
    dispatch(emptycart({ userId, toast }));
  };
  useEffect(() => {
    dispatch(getcart(userId));
    // eslint-disable-next-line
  }, [userId]);
  return (
    <div className="cart" display="flex" flexDirection="column" justifyContent="center" alignItem="center">
      {cartItems.length === 0 && (
        <h3 className="text-center">
          {user?.result?.name}: Your Cart Is Empty
        </h3>
      )}
      {cartItems.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "20px",
            }}
          >
            <Text fontSize="20px" className="text-start">Cart: {user?.result?.name}</Text>
            <Button colorScheme="red" float="left" onClick={handleEmpty}>
              Empty Cart
            </Button>
          </div>
          <hr
            style={{
              maxWidth: "600px",
              marginTop: "10px",
              marginBottom: "20px",
              margin: "auto",
            }}
          />
        </>
      )}
      {cartItems &&
        cartItems.map((item) => (
          <Card key={item._id} margin="auto" marginTop="30px" backgroundColor="#394867"
          color="gold" maxW="50%" isCentered>
            <CardBody display="flex" textAlign="center">
              <Box width="30%">
              <Image
                src={item.imageFile}
                alt={item.company + "/" + item.name}
                borderRadius="lg"
                height="300px"
                width="300px"
              />
              </Box>
              <Box width="70%">
              <Stack mt="6" spacing="3">
                <Heading size="md">
                  {item.company} {item.name}
                </Heading>

                <Heading size="sm" className="text-muted">
                  RAM: {item.RAM}
                </Heading>
                <Heading size="sm">Storage: {item.storage}</Heading>
                <Heading size="sm">Camera: {item.camera}</Heading>
                <Text  fontSize="2xl">
                  {" "}
                  Rs {item.price}
                </Text>
                <Text float="left"  fontSize="2xl">
                  Quantity : {item.quantity}
                </Text>
                <Text float="right" fontSize="2xl">
                  Total : Rs {item.amount}
                </Text>
              </Stack>
              </Box>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue" onClick={() => {
                    cartData.userId = userId;
                    cartData.amount = item.price;
                    const id = item._id;
                    dispatch(addonecart({ id, cartData })).then(() => {
                      dispatch(getcart(userId));
                    });
                  }}>
                  Add More
                </Button>
                <Button  colorScheme="blue" onClick={() => {
                    cartData.userId = userId;
                    cartData.amount = item.price;
                    const id = item._id;
                    dispatch(removeonecart({ id, cartData })).then(() => {
                      if (item.quantity > 1) {
                        dispatch(getcart(userId));
                      } else if (item.quantity === 1) {
                        handleRemove(item._id);
                        dispatch(getcart(userId));
                      }
                    });
                  }}>
                  Remove One
                </Button>
                <Button  colorScheme='red' onClick={() => handleRemove(item._id)}>
                    Remove
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};
export default Cart;
