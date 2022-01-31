import React from 'react'
import {Container, Navbar, Nav, Image, Offcanvas} from "react-bootstrap"
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import '../css/Header.css'

const Header = ({auth}) => {

    return (
    <>
        <Navbar bg="dark" expand={false}>
            <Container >
                <Navbar.Brand href="/" style={{color:"#fff", fontSize:"2em", fontWeight:"bold"}}>ChatFat</Navbar.Brand>
               
               
                <Navbar.Toggle  aria-controls="offcanvasNavbar" className="navbar-toggler">                
                    <span>
                        <FontAwesomeIcon
                        icon={faBars} color="#fff" size="lg"
                        />
                    </span>
              </Navbar.Toggle>
              <Navbar.Offcanvas
                      id="offcanvasNavbar"
                      aria-labelledby="offcanvasNavbarLabel"
                      placement="end"
                     
                      
               
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel" style={{fontSize:"2em", fontWeight:"bold"}}>ChatFat</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-5">
                        {auth?
                            <>
                                <Image 
                                        alt=""
                                        src={auth.photo}
                                        className="rounded mx-auto d-block"
                                        width="150"
                                        height= "150"
                                        roundedCircle 
                                />

                                <p style={{margin:"10px", fontSize:".9em", fontWeight:"bold"}}>{auth.name}</p>     

                                <hr
                                          style={{
                                            color: "#222",
                                            backgroundColor: "#222",
                                            height: 3
                                        }}
                                />

                                <h3> <span> <FontAwesomeIcon icon={faEnvelope} color="#222" size="lg"/></span> Portfolio</h3>
                                <hr
                                        style={{
                                            color: "#222",
                                            backgroundColor: "#222",
                                            height: 3
                                        }}
                                />

                                <Nav.Link href="/home/profile">Portfolio</Nav.Link>
                                <Nav.Link href="/home/update">Update Portfolio</Nav.Link>
                                <Nav.Link href="/home/introduce_user">Introduce Yourself</Nav.Link>
                                <Nav.Link href="/home/reset_password">Reset Password</Nav.Link>
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/home/profile/my-stories">My Stories</Nav.Link>
                                <Nav.Link href="/api/logout">logout</Nav.Link>
                                <hr
                                        style={{
                                            color: "#222",
                                            backgroundColor: "#222",
                                            height: 3
                                        }}
                                />

                            </>
                 
                            :
                            <>
                                 <Nav.Link href="/home/login">Login</Nav.Link>
                                 <Nav.Link href="/home/signup">Sign Up</Nav.Link>
                                 <hr
                                        style={{
                                            backgroundColor: "#000000",
                                            height: 8
                                        }}
                                />
                            
                            </>
                           
                        }
                   
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    </>
    )
}

const mapStateToProps = state => {
    return {
      auth: state.auth
    }
}

export default connect(mapStateToProps)(Header)
