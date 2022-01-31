import React,{useState}  from 'react'
import {Container, Form, Button, Alert} from "react-bootstrap"
import {restPassword} from '../../actions'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'
var bcrypt = require('bcryptjs')


const Resetpassword = ({auth,user, restUserPassword}) => {
 
    const [error, setError] = useState("")
    const [user_passcode, setUserPassCode] = useState("")
    const [disableb , setDisableButton] = useState(false)
    let history = useHistory();

    const handleSubmission = (email) => {
        restUserPassword(email)        
        setDisableButton(true)
        setError("")
        
    }

    const handleSubmission2 = () => {
       
        if(!user){
            setError("Please you need to send email for verification")
        }else if(user_passcode === ""){
            setError("Empty passcode field try to fill the field")
        }else if(bcrypt.compareSync(user_passcode, user.data)){
            setError("")
            history.replace("/home/reset_confirm_password")
        }else{
            setError("incorrect passcode")
        }
    
    }

    return (
        <div style={{color:"#fff",textTransform:"uppercase", marginTop:"2em"}}>
            <h1 style={{textAlign:"center"}} className="mb-3">Reset Password Now </h1>
                {auth && auth.password &&
                    <Container className="mt-5 ml-5 mb-5" >
                        {error && 
                            <Alert variant="danger">
                                {error}
                            </Alert>
                        }
                        {user && !error && 
                            <Alert variant="success">
                                {user.message}
                            </Alert>
                        }
                        <h4 style={{textAlign:"center", textTransform:"none"}} className="mb-3">Email: {auth.email} </h4>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Passcode</Form.Label>
                                <Form.Control type="password" placeholder="New Password" onChange={(e) => setUserPassCode(e.target.value)}/>
                            </Form.Group>
                            <div className="d-flex justify-content-between">
                                <Button disabled={disableb} variant="primary" onClick={() => handleSubmission(auth.email)}>
                                        Send Email
                                </Button>
                                <Button variant="primary" onClick={() => handleSubmission2()}>
                                        Check Passcode
                                </Button>
                            </div>
                            </Form>
                    </Container>
                }
        </div>
        
    )}

const mapStateToProps = state => {
    return {
      auth: state.auth,
      user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        restUserPassword: (email) => dispatch(restPassword(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resetpassword)
