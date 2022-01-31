import React,{useState, useEffect} from "react"
import {Form, Button, Container, Alert, Modal} from "react-bootstrap"
import axios from "axios"
import { connect } from 'react-redux'
import {fetchUser, changeHeaderState} from '../../actions'






const Update = ({fetchUsers, changeHeaderStates}) => {
    const [fname,setFName] = useState("")
    const [sname, setSName] = useState("")
    const [email, setEmail] =  useState("")
    const [picture, setPicture] =  useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        changeHeaderStates()
    })

  
    const handleSubmit = async () => {

        if(email !== "" && !validateEmail(email)){
            setError("incorrect email address")
            setSuccess("")
            setShow(false)
        }else{
            setError("")
            const updateUser = {
                fname,
                sname,
                picture,
                email
                
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
                const res = await axios.post('/api/update', updateUser,config)
                setSuccess(res.data.message)
                await fetchUsers()
                setEmail("")
                setFName("")
                setSName("")
                setPicture("")
                setShow(false)
                
            
                     
              } catch (err) {
                setSuccess("")
                setError(err.response.data.message)
              }
    
        }

        

       

    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    return (
        <div>
            <Container className="mt-5 ml-5 mb-5" style={{color:"#fff",textTransform:"uppercase"}}>
                <h1 style={{textAlign:"center"}} className="mb-3">Update Now </h1>
              {success && <Alert variant="success">
                        {success}
                         </Alert>}
                <Form onSubmit={handleSubmit}>
                <h6 style={{textAlign:"center"}} className="mb-3">update any of the entries or leave it empty if you do not want to update</h6>
                {error && <Alert variant="danger">
                        {error}
                    </Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>First name</Form.Label>
                        <Form.Control onChange={(e) => setFName(e.target.value)} value={fname} type="first-name" placeholder="Enter first name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control onChange={(e) => setSName(e.target.value)} value={sname} type="second-name" placeholder="Enter last name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>picture link</Form.Label>
                        <Form.Control onChange={(e) => setPicture(e.target.value)} value={picture} type="picture-link" placeholder="Enter your picture link" />
                    </Form.Group>
                    
                    <Button variant="primary" onClick={handleShow}>
                        Submit
                    </Button>
                </Form>

                <Modal 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                >
                    <Modal.Header>
                    <Modal.Title>Update Confirmation</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>Are you sure, you want to update</Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUser()),
        changeHeaderStates: () => dispatch(changeHeaderState("login","Home"))
    }
  }

export default connect(null,mapDispatchToProps)(Update)
