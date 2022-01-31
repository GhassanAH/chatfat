import React, {useState, useEffect} from 'react'
import {Form,Container,Button, Alert} from "react-bootstrap"
import { connect } from 'react-redux'
import {introduce, changeHeaderState} from '../../actions'

const IntroduceUser = ({user, introduceUser,auth}) => {
    
    const [nickName, setNickName] = useState(auth.nickname)
    const [job, setJob] = useState(auth.job)
    const [country, setCountry] = useState(auth.country)
    const [city, setCity] = useState(auth.city)
    const [sentence, setSentence] = useState(auth.sentence)
    const [hobbies, setHobbies] = useState(auth.hobbies)
    const [userC, setUserc] = useState(null)

    const handleSubmmision = (e) => {
        e.preventDefault()
        introduceUser(nickName,job,country,city,sentence,hobbies)
    }
    useEffect(() => {
        setUserc(user)
       
        
    },[user])
    
    return (
        <>
         <Container className="mt-5 ml-6 mb-5" style={{color:"#fff",textTransform:"uppercase"}}>

                <Form>

                <h1 style={{textAlign:"center"}} className="mb-3">Introduce yourself Now </h1>
                {userC && 
                  <>
                 {!userC.found &&
                    <Alert variant="danger">
                        {userC.message}
                    </Alert>
                 }
                {userC.found &&
                    <Alert variant="success">
                        {userC.message}
                    </Alert>
                 }
                  </>
                }

                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput1" >
                        <Form.Label>Nick Name</Form.Label>
                        <Form.Control onChange={(e) => setNickName(e.target.value)} type="text" value={nickName} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                        <Form.Label>Job</Form.Label>
                        <Form.Control onChange={(e) => setJob(e.target.value)} type="text" value={job} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                        <Form.Label>Country</Form.Label>
                        <Form.Control onChange={(e) => setCountry(e.target.value)} type="text" value={country} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={(e) => setCity(e.target.value)} type="text" value={city} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                        <Form.Label>Your sentence</Form.Label>
                        <Form.Control onChange={(e) => setSentence(e.target.value)} type="text" value={sentence} />
                    </Form.Group>
                   
                    <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Hobbies</Form.Label>
                        <Form.Control onChange={(e) => setHobbies(e.target.value)} as="textarea" value={hobbies} rows={3} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmmision}>
                        Introduce
                    </Button>
                    
                </Form>
        </Container>
            
        </>
    )
}
const mapStateToProps = state => {
    return {
      user: state.user,
      auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        introduceUser: (nickName, job, country, city, sentence, hobbies)  => dispatch(introduce(nickName, job, country, city, sentence, hobbies)),
        changeHeaderStates: () => dispatch(changeHeaderState("login","Home"))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(IntroduceUser)
