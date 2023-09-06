import React, { useEffect } from "react";
import {Text,SimpleGrid, Box} from "@chakra-ui/react";
import { useSelector,useDispatch } from "react-redux";
import PhoneCard from "../components/PhoneCard";
import { getphones } from "../redux/features/phoneSlice";
import CustomSpinner from "../components/Spinner";
const Home =()=>{
    const {user} = useSelector((state)=>({...state.user}));
    const {dealer} = useSelector((state)=>({...state.dealer}));
    const {phones,loading} = useSelector((state)=>({...state.phone}));
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getphones());
        // eslint-disable-next-line
    },[])
    if (loading) {
        return <CustomSpinner/>;
    }
    var Name = user?.result?.name || dealer?.result?.name;
    return(
        <>
        { Name && (
            <div style={{marginLeft:"auto",alignContent:"center",marginTop:"10px",textAlign:"center"}}><h3>Welcome : {Name}</h3></div>
        )}
        <div style={{margin:"auto",padding:"30px",maxWidth:"1000px",alignContent:"center"}}>
                {phones.length===0 && (
                    <Text fontSize="2xl">No Phones Found</Text>
                )}
            <SimpleGrid columns={{sm: 1, md: 2, lg:3}} spacing={6}>
                {phones && phones.map((item)=><Box w='100%'><PhoneCard key={item._id}{...item}/></Box>)}
                {/* <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2" style={{marginRight:"20px",justifyContent:"space-evenly"}}>
                            {phones && phones.map((item)=><PhoneCard key={item._id}{...item}/>)}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol> */}
            </SimpleGrid>
        </div>
        </>
    )
}
export default Home;