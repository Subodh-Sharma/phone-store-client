import React, { useEffect } from "react";
// import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBCardGroup } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { Card,CardBody,CardFooter,Button,ButtonGroup,Text,Heading,Stack,Image,Divider,useToast, Box} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { dealersphone, deletephone, getphone, setPhoneEmpty } from "../redux/features/phoneSlice";
// import { toast } from "react-toastify";
const Dashboard = () => {
    const { dealerPhones } = useSelector((state) => ({ ...state.phone }))
    const { dealer } = useSelector((state) => ({ ...state.dealer }))
    const dealerId = dealer?.result?._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(()=>{
        if(dealerId){
            dispatch(dealersphone(dealerId));
        }
        // eslint-disable-next-line
    },[dealerId])

    const handleDelete = (id)=>{
        if(window.confirm("Are you sure you want to delete this phone ?")){
            dispatch(deletephone({id,toast}))
            dispatch(setPhoneEmpty())
        }
    }
    const handleUpdate = (id)=>{
        dispatch(getphone(id))
        navigate(`/updatephone/${id}`)
    }

    return (
        <div className="dashboard" display="flex" flexDirection="column" justifyContent="center" alignItem="center">
            {dealerPhones.length === 0 && (
                <Text fontSize="40px">No Phone available with the Dealer: {dealer?.result?.name} </Text>
            )}
            {dealerPhones.length > 0 && (
                <>
                    <Text fontSize="20px" className="text-center" style={{marginTop:"10px"}}>Dashboard: {dealer?.result?.name}</Text>
                    <hr style={{ maxWidth: "600px",margin:"auto",marginBottom:"20px"}} />
                </>
            )}
            {dealerPhones && dealerPhones.map((item) => (
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
                    margin="auto"
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
                    <Text fontSize="2xl">
                      {" "}
                      Rs {item.price}
                    </Text>
                    {/* <Text float="left" fontSize="2xl">
                      Quantity : {item.quantity}
                    </Text>
                    <Text float="right" fontSize="2xl">
                      Total : Rs {item.amount}
                    </Text> */}
                  </Stack>
                  </Box>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                  <Button colorScheme='blue' onClick={()=>handleUpdate(item._id)}>
                        Update
                    </Button>
                    <Button colorScheme='blue' onClick={()=>handleDelete(item._id)}>
                        Remove
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
                
            ))}
        </div>
    )
}
export default Dashboard;
