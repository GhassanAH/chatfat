import React,{useState, useEffect} from 'react'
import {Form, Button, Container, Alert} from "react-bootstrap"
import { connect } from 'react-redux'
import {changeHeaderState} from '../actions'
import googleImage from '../img/img4.png';
import axios from 'axios'
import { useHistory } from "react-router-dom"

const SignupUser = ({changeHeaderStates}) => {
    const [fname,setFName] = useState("")
    const [sname, setSName] = useState("")
    const [email, setEmail] =  useState("")
    const [picture, setPicture] =  useState("")
    const [password, setPassword] =  useState("")
    const [error, setError] = useState("")
    let history = useHistory();

    useEffect(() => {
            changeHeaderStates()
        
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(fname === "" || sname === "" || email === "" || picture === "" || password === ""){
            setError("Please fill all fields")
        }else if(!validateEmail(email)){
            setError("email format is not correct")
        }else if(!password_validate(password)){
            setError("password is not similar to our rules try add number, letter @ #, and make sure your password length is between 7 to 13 character")
        }else if(!isValidURL(picture)){
            setError("your picture link is invalid")
        }else{
            setError("")
            const user = {
                fname:fname,
                sname:sname,
                email:email,
                picture:picture,
                password:password
            }
                try {
                    const res = await axios.post("/api/signup",user)
            
                    if(res.data.message){
                        setError(res.data.message)
                    }else{
                        setError("")
                        history.push("/home/Login")
                    }
                } catch (error) {
                    console.log(error)
                }
            
        }

    }
    function isValidURL(string) {
        //eslint-disable-next-line
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };
      
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
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
    <Container className="mt-5 ml-5 mb-5" >
             <h1 style={{textAlign:"center",color:"#fff",textTransform:"uppercase",textDecoration:"overline"}} className="mb-3">SignUp Now </h1>
             <div className="d-flex justify-content-center">
                <a className="mb-3" href="/auth/google"><img width="250px" alt="google" src={googleImage}></img></a>
            </div>
             
            <Form onSubmit={handleSubmit} style={{color:"#fff", textTransform:"uppercase"}}>
            <h5 style={{textAlign:"center",color:"#fff",textTransform:"uppercase"}} className="mb-3">or sign up with your email,name and picture </h5>
               {error && <Alert variant="danger">
                    {error}
                </Alert>}
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control onChange={(e) => setFName(e.target.value)} type="first-name" placeholder="Enter first name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control onChange={(e) => setSName(e.target.value)} type="second-name" placeholder="Enter last name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Give a picture link</Form.Label>
                    <Form.Control onChange={(e) => setPicture(e.target.value)} type="picture-link" placeholder="Enter your picture link" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                {"  "}
                Already have an account? <a href="/home/login">Login</a>
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
        changeHeaderStates: () => dispatch(changeHeaderState("signUp","Home"))
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(SignupUser)
