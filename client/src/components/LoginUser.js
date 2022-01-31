import React,{useEffect, useState} from 'react'
import {Form, Button, Container,Alert} from "react-bootstrap"
import { connect } from 'react-redux'
import {changeHeaderState, fetchUser} from '../actions'
import googleImage from '../img/img4.png';
import {useHistory} from 'react-router-dom'
import axios from 'axios';



const LoginUser = ({changeHeaderStates, fetchUsers}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    let history = useHistory();
    

   useEffect(() => {
       
            changeHeaderStates()
      
       
    }) 

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email === "" || password === ""){
            setError("either email or password are empty")
        }else if(email.includes("$")){
            setError("invalid email")
        }else if(!validateEmail(email)){
            setError("invalid email format")
        }else{
            setError("")
            const user = {
                email,
                password
            }
            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000/'
                }
              };

              try {
                await axios.post('/api/login', user,config)
                await fetchUsers()
                setError("")
                history.replace("/home")
                     
              } catch (err) {
                setError(err.response.data.message)
               
              }
 
        }

    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    

    return (
        <Container style={{marginTop:"110px"}} className=" ml-5 mb-5" >
             <h1 style={{textAlign:"center", color:"#fff",textTransform:"uppercase", textDecoration:"overline"}} className="mb-5">Login Now </h1>
            <div className="d-flex justify-content-center">
                <a style={{['&:hover']: {backgroundColor : 'yellow' }}} className="mb-3" href="/auth/google"><img width="250px" alt="google" src={googleImage}></img></a>
            </div>
            <Form onSubmit={handleSubmit} style={{color:"#fff", textTransform:"uppercase"}}>
            <h5 style={{textAlign:"center"}} className="mb-3">or login with your email address </h5>
            {error && <Alert variant="danger">
                    {error}
                </Alert>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                
                {"  "}
                Do not have an account? <a href="/home/signup">Sign up</a><br/>
                Did you forget password? <a href="/home/forget_password">forget password?</a>
                <br/><br/>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                
            </Form>
        </Container>
            
    )
}
const mapStateToProps = state => {
    return {
      auth: state.auth,
     
    }
}
  
  const mapDispatchToProps = dispatch => {
    return {
        changeHeaderStates: () => dispatch(changeHeaderState("login","Home")),
        fetchUsers: () => dispatch(fetchUser())
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(LoginUser)
