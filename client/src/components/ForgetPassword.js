import React,{useEffect, useState} from 'react'
import {Container, Form, Button, Alert} from "react-bootstrap"
import { connect } from 'react-redux'
import {checkEmail, restPassword, restPasswordConfirm} from '../actions'
import {useHistory} from 'react-router-dom'

var bcrypt = require('bcryptjs')

const ForgetPassword = ({checkTheEmail,restUserPassword, updateUserPassword, user}) => {
    const [error, setError] = useState("")
    const [user_passcode, setUserPassCode] = useState("")
    const [show1 , setShow1] = useState(true)
    const [show2 , setShow2] = useState(false)
    const [show3 , setShow3] = useState(false)
    const [email, setEmail] = useState("")
    const [userC, setUserc] = useState(null)
    const [message, setMessage] = useState("")
    const [password, setPassword] = useState("")
    const [Confirm, setConfirm] = useState("")

    let history = useHistory();

    useEffect(() => {
        setUserc(user)
    },[user])

    useEffect(() => {
        if(userC !== null){
            if(userC.found !== null && userC.found === false){
                console.log(userC)
                setMessage("")
                setError("You don't have an Account to reset password. Please signup for an account: "+email)
            }else if(userC.found !== null && userC.found === true){
                console.log(userC)
                restUserPassword(email)
                setMessage("")
                setError("")
                setShow2(true)
                setShow1(false)
            }else if(userC.found == null){
                setMessage(userC.message)
            }
        }
    }, [userC])

    const handleSubmission = (email) => {
        if(!email){
            setMessage("")
            setError("please fill the email input")
        }else{
            setError("")
            setMessage("")
            checkTheEmail(email)
        }
    }

    const handleSubmission2 = () => {
        if(!user_passcode){
            setMessage("")
            setError("please fill the passcode input") 
        }else if(bcrypt.compareSync(user_passcode, userC.data)){
            setError("")
            setMessage("Now you can change your password")
            setShow2(false)
            setShow3(true)
        }else{
            setError("incorrect passcode")
            setMessage("")
        }
    }

    const handleSubmission3 = () => {

        if(password !== Confirm){
            setError("confirmed password dose not equal to new password")
        }else if(!password_validate(password)){
            setError("password is not similar to our rules try add number, letter @ #, and make sure your password length is between 7 to 13 character")
        }else{
            setError("")
            updateUserPassword(email, password)
            history.replace("/home/login")
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
        <div >
            <Container style={{marginTop:"110px"}} className=" ml-5 mb-5" >
            <h1 style={{textAlign:"center", color:"#fff",textTransform:"uppercase", textDecoration:"overline"}} className="mb-5">Forgot Password </h1>
                {error && 
                    <Alert variant="danger">
                        {error}
                    </Alert>
                }
                {message && 
                    <Alert variant="success">
                        {message}
                    </Alert>
                }
                <Form style={{color:"#fff",textTransform:"uppercase", marginTop:"2em"}}>
                 { show1 &&  <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    </Form.Group>}

                   {show2 &&
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Passcode</Form.Label>
                        <Form.Control valie={user_passcode} type="password" placeholder="Passcode" onChange={(e) => setUserPassCode(e.target.value)}/>
                    </Form.Group>
                    }

                    {show3 &&
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control value={password} type="password" placeholder="New password" onChange={(e) => setPassword(e.target.value)}/>
                        <Form.Label> Confirmed Password</Form.Label>
                        <Form.Control value={Confirm} type="password" placeholder="Confirmed Password" onChange={(e) => setConfirm(e.target.value)}/>
                    </Form.Group>
                    }
                    <div className="d-flex justify-content-between">
                      { show1 &&
                       <Button variant="primary" onClick={() => handleSubmission(email)}>
                            Check Email
                        </Button>}
                       {show2 &&
                        <Button variant="primary" onClick={() => handleSubmission2()}>
                            Check Passcode
                        </Button>
                        }
                         {show3 &&
                        <Button variant="primary" onClick={() => handleSubmission3()}>
                            Reset Password
                        </Button>
                        }
                    </div>
                </Form>
            </Container>    
        </div>
    )
}

const mapStateToProps = state => {
    return {
      user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkTheEmail: (email) => dispatch(checkEmail(email)),
        restUserPassword: (email) => dispatch(restPassword(email)),
        updateUserPassword: (email,password) => dispatch(restPasswordConfirm(email,password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)
