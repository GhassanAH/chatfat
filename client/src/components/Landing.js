import React,{useState} from 'react'
import {Carousel,Card,Row,Col,Container,Button, Modal} from 'react-bootstrap'
import image1 from '../img/img1.png';
import image2 from '../img/img2.png';
import image3 from '../img/img3.jpg';
import spain from '../img/spain.png'
import france from '../img/france.png'
import italy from '../img/italy.png'
import portugal from '../img/portugal.png'
import Britain from '../img/Britain.jpg'
import Oman from '../img/Oman.png'
import Iran from '../img/Iran.png'
import  China from '../img/China.png'
import Japan from '../img/Japan.png'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'




const Landing = ({auth}) => {
    const [show, setShow] = useState(false)
    let history = useHistory()

    const handleCardButtonSubmission = () => {
        
        if(auth){
          history.push("/home/Country_users")
        }else{
          setShow(true)
        }

    }

    return (
      <div>

    <Modal show={show} onHide={(e) => setShow(false)} animation={false}>

        <Modal.Header>
            <Modal.Title>Login Problem</Modal.Title>
            </Modal.Header>
            <Modal.Body>You must login or have an account to browse all users in this country</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(e) => setShow(false)}>
                Close
              </Button>
        </Modal.Footer>
    </Modal>

      {/* Carosel section of the landing page */}
      <Carousel fade slide={false} 
      prevLabel=""
      nextLabel=""
      className="mb-5"
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="800px"
            height="400px"
            src={image1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>START COMUNICATION WITH CHATFAT</h3>
            <p>Get your first account to comunicate with your friends.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="800px"
            height="400px"
            src={image2}
            alt="Second slide"
          />
      
          <Carousel.Caption >
            <h3>BE FAT AND CHAT NOW</h3>
            <p>Add your friends' id and contact with them.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            width="800px"
            height="400px"
            src={image3}
            alt="Third slide"
          />
      
          <Carousel.Caption >
            <h3>CHAT WITH YOUR TRAINER, AND DO NOT BE FAT</h3>
            <p>Send positive messages to your contacts, learn any language, speak your language, and always share love.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* This is flags and usres section */}
      <Container className="justify- mt-5 mb-5" >
      <Row className="text-center">
        <Col sm>
          <Card className="mt-3 mb-3 ml-3" style={{ width: '100%', height:'90%' }}>
            <Card.Img variant="top" src={spain} width="100px" height="150px"/>
            <Card.Body>
              <Card.Title>Spanish</Card.Title>
              <Card.Text>
              Aquí están todos los usuarios que hablan español. Diviértete hablando con ellos.
              </Card.Text>
            
            </Card.Body>
            <Button variant="dark" size="sm" onClick={(e) => handleCardButtonSubmission()}>
                SHOW <span> <FontAwesomeIcon icon={faEye} color="#fff" size="lg"/></span>
            </Button>
          </Card>
        </Col>

        <Col sm>
          <Card className="mt-3 mb-3 ml-3" style={{width: '100%', height:'90%' }}>
            <Card.Img variant="top" src={france} width="100px" height="150px"/>
            <Card.Body>
              <Card.Title>Frence</Card.Title>
              <Card.Text>
              Voici tous les utilisateurs qui parlent français Amusez-vous à leur parler.
              </Card.Text>
           
            </Card.Body>
            <Button variant="dark" size="sm" onClick={(e) => handleCardButtonSubmission()}>
                SHOW <span> <FontAwesomeIcon icon={faEye} color="#fff" size="lg"/></span>
            </Button>
          </Card>
        </Col>
        
        <Col sm>
          <Card className="mt-3 mb-3 ml-3" style={{ width: '100%', height:'90%'}}>
            <Card.Img variant="top" src={italy} width="100px" height="150px" />
            <Card.Body>
              <Card.Title>Italian</Card.Title>
              <Card.Text>
              Ecco tutti gli utenti che parlano italiano. Divertiti a parlare con loro.
              </Card.Text>
           
            </Card.Body>
            <Button variant="dark" size="sm" onClick={(e) => handleCardButtonSubmission()}>
                SHOW <span> <FontAwesomeIcon icon={faEye} color="#fff" size="lg"/></span>
            </Button>
          </Card>
        </Col>
      </Row>

      <Row className="text-center">
        <Col sm>
          <Card className="mt-3 mb-3 ml-3" style={{width: '100%', height:'90%'}}>
            <Card.Img variant="top" src={portugal} width="100px" height="150px"/>
            <Card.Body>
              <Card.Title>Portugese</Card.Title>
              <Card.Text>
                  Aqui estão todos os usuários que falam português. Divirta-se conversando com eles.
              </Card.Text>
            
            </Card.Body>
            <Button variant="dark" size="sm" onClick={(e) => handleCardButtonSubmission()}>
               SHOW <span> <FontAwesomeIcon icon={faEye} color="#fff" size="lg"/></span>
            </Button>
          </Card>
        </Col>

        <Col sm>
          <Card className="mt-3 mb-3 ml-3" style={{width: '100%', height:'90%' }}>
            <Card.Img variant="top" src={Britain} width="100px" height="150px"/>
            <Card.Body>
              <Card.Title>English</Card.Title>
              <Card.Text>
              Here are all the users who speak English. Enjoy talking to them.
              </Card.Text>
              
            </Card.Body>
            <Button variant="dark" size="sm" onClick={(e) => handleCardButtonSubmission()}>
                SHOW <span> <FontAwesomeIcon icon={faEye} color="#fff" size="lg"/></span>
            </Button>
          </Card>
        </Col>
        
        <Col sm>
          <Card className="mt-3 mb-3 ml-3" style={{ width: '100%', height:'90%'}}>
            <Card.Img variant="top" src={Oman} width="100px" height="150px" />
            <Card.Body>
              <Card.Title>العربية</Card.Title>
              <Card.Text>              
                ها هم جميع المستخدمين  الذين يتحدثون اللغة العربية. استمتع بالحديث معهم. كل العرب

              </Card.Text>
          
            </Card.Body>
            <Button variant="dark" size="sm" onClick={(e) => handleCardButtonSubmission()}>
                SHOW <span> <FontAwesomeIcon icon={faEye} color="#fff" size="lg"/></span>
            </Button>
          </Card>
        </Col>
      </Row>

      <Row className="text-center">
        <Col sm>
          <Card className="mt-3 mb-3 ml-3" style={{ width: '100%', height:'90%' }}>
            <Card.Img variant="top" src={Iran} width="100px" height="150px"/>
            <Card.Body>
              <Card.Title>Persian</Card.Title>
              <Card.Text>
              همه کاربران اینجا فارسی صحبت می کنند. از صحبت کردن با آنها لذت ببرید
              </Card.Text>
             
            </Card.Body>
            <Button variant="dark" size="sm" onClick={(e) => handleCardButtonSubmission()}>
                SHOW <span> <FontAwesomeIcon icon={faEye} color="#fff" size="lg"/></span>
            </Button>
          </Card>
        </Col>

        <Col sm>
          <Card className="mt-3 mb-3 ml-3" style={{ width: '100%', height:'90%' }}>
            <Card.Img variant="top" src={China} width="100px" height="150px"/>
            <Card.Body>
              <Card.Title>Chinese</Card.Title>
              <Card.Text>
              这里是所有会说中文的用户。和他们聊天很开心。
              </Card.Text>
              
            </Card.Body>
            <Button variant="dark" size="sm" onClick={(e) => handleCardButtonSubmission()}>
                SHOW <span> <FontAwesomeIcon icon={faEye} color="#fff" size="lg"/></span>
            </Button>
          </Card>
        </Col>
        
        <Col sm>
          <Card className="mt-3 mb-3 ml-3" style={{ width: '100%', height:'90%'}}>
            <Card.Img variant="top" src={Japan} width="100px" height="150px" />
            <Card.Body>
              <Card.Title>Japanese</Card.Title>
            
              <Card.Text>
              日本語を話すユーザーはこちらをクリックしてください。彼らと話して楽しんでください。
              </Card.Text>
             
            </Card.Body>
            <Button variant="dark" size="sm" onClick={(e) => handleCardButtonSubmission()}>
                SHOW <span> <FontAwesomeIcon icon={faEye} color="#fff" size="lg"/></span>
              </Button>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
    )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Landing)
