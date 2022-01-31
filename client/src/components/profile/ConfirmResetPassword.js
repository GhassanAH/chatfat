import React,{useState} from 'react'
import {Container, Form, Button, Alert} from "react-bootstrap"
import {restPasswordConfirm} from '../../actions'
import { connect } from 'react-redux'

const ConfirmResetPassword = ({auth,user,updateUserPassword}) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSucess] = useState("");
    const [disableb , setDisableButton] = useState(false)

    const handleSubmission = () => {
        const email = auth.email

        if(password !== confirmPassword){
            setError("confirmed password dose not equal to new password")
        }else if(!password_validate(password)){
            setError("password is not similar to our rules try add number, letter @ #, and make sure your password length is between 7 to 13 character")
        }else{
            setError("")
            setSucess("You successfully updated your password")
            setDisableButton(true)
            setPassword("")
            setConfirmPassword("")
            updateUserPassword(email, password)
        }   
            
    }

    function password_validate(password) {
        var re = {
            'capital' : /[A-Z]/,
            'digit'   : /[0-9]/,
            'full'    : /^[A-Za-z0-9]{7,13}$/
        };
        return re.capital.test(password) && re.digit.test(password) && re.full.test(password);
    }

    return (
        <div style={{color:"#fff",textTransform:"uppercase", marginTop:"2em"}}>
            <h1 style={{textAlign:"center"}} className="mb-3">Reset And Confirm Password Now </h1>
            {auth && user && 
                 <Container className="mt-5 ml-5 mb-5" >
                     {error && 
                            <Alert variant="danger">
                                {error}
                            </Alert>
                    }
                    {success && 
                            <Alert variant="success">
                                {success}
                            </Alert>
                    }
                 <Form>
                     <Form.Group className="mb-3" controlId="formBasicPassword">
                         <Form.Label>New Password</Form.Label>
                         <Form.Control type="password" value={password} placeholder="New Password" onChange={(e) => setPassword(e.target.value)} />
                     </Form.Group>
                     <Form.Group className="mb-3" controlId="formBasicPassword">
                         <Form.Label>Confirm New Password</Form.Label>
                         <Form.Control  type="password" value={confirmPassword} placeholder="Confirm New Password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                     </Form.Group>
                     <Button disabled={disableb} variant="primary" onClick={() => handleSubmission()}>
                             Reset
                     </Button>
         
                     </Form>
                </Container>
            }
           
        </div>
    )
}

const mapStateToProps = state => {
    return {
      auth: state.auth,
      user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserPassword: (email,password) => dispatch(restPasswordConfirm(email,password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmResetPassword)
