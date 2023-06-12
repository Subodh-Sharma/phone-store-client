import React from "react";
import { Card,Button} from "@chakra-ui/react";
import { Link,useNavigate } from "react-router-dom";


const RegisterComponent = ()=>{
    const navigate = useNavigate();
    const onSelectDealer = ()=>{navigate("/dealersignup")}
    const onSelectUser = ()=>{navigate("/usersignup")}
    return (
        <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"150px"}}>
            <Card alignment="center" backgroundColor="#394867" color="gold">
                <h5>Sign Up As ?</h5>
                <div>
                    <Button colorScheme='blue' style={{marginRight:"10px"}} onClick={onSelectDealer}>DEALER</Button>
                    <Button colorScheme='blue' style={{marginLeft:"10px"}} onClick={onSelectUser}>USER</Button>
                </div>
                <Link to="/selectsignin" style={{marginTop:"10px"}}><p>Already have an account? Log In </p></Link>

            </Card>
        </div>
    )

}
export default RegisterComponent;