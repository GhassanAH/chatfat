import React, {useEffect,useState} from "react";
import {Spinner} from "react-bootstrap"
import Header from './components/Header'
import {BrowserRouter, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchUser} from './actions'
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import LoginUser from "./components/LoginUser";
import SignupUser from "./components/SignupUser";
import ForgetPassword from "./components/ForgetPassword";
import Update from "./components/profile/Update";
import Profile from "./components/profile/Profile";
import IntroduceUser from "./components/profile/IntroduceUser";
import Resetpassword from "./components/profile/Resetpassword";
import ConfirmResetPassword from "./components/profile/ConfirmResetPassword";
import LandingCountryUser from "./components/countryUsers/LandingCountryUsers"
import Story from "./components/stories/Story"
import MyStory from "./components/stories/MyStory"
import Read from "./components/stories/Read"
import world_map from "./img/world_map.jpg"



const App = ({fetchUsers, auth}) => {

  const [loading, setLoading] = useState(true)


 
  useEffect(() => {
    fetchUsers()
    
  },[fetchUsers])

  useEffect(() => {
    if(auth == null){
      setLoading(true)
    }else{
      setLoading(false)
    }
    
    
  },[auth])

  return (
    <>
      {loading? 
        <div style = {{display:"flex", justifyContent:"center", alignContent:"center"}}>
            <Spinner animation="border" variant="primary"/>    
        </div>
    
      :<div style={{width:"100%",fontFamily:"Open Sans",position: "relative",minHeight: '100vh', backgroundImage: `url(${world_map})`}}>
                  <Header />
            <div style={{ paddingBottom: '3rem' }}>
                    <BrowserRouter >
                        <Route exact path="/" component={Landing}></Route>
                        <Route exact path="/home" component={Landing}></Route>
                        <Route  path="/home/login" component={LoginUser}></Route>
                        <Route  path="/home/signup" component={SignupUser}></Route>
                        <Route  path="/home/forget_password" component={ForgetPassword}></Route>
                        <Route  path="/home/profile" exact component={Profile}></Route>
                        <Route  path="/home/update" component={Update}></Route>
                        <Route  path="/home/reset_password" component={Resetpassword}></Route>
                        <Route  path="/home/reset_confirm_password" component={ConfirmResetPassword}></Route>
                        <Route  path="/home/introduce_user" component={IntroduceUser}></Route>
                        <Route  path="/home/profile/create-story" exact component={Story}></Route>
                        <Route  path="/home/profile/my-stories" exact component={MyStory}></Route>
                        <Route  path="/home/profile/editBlog/:id" exact component={Story}></Route>
                        <Route  path="/home/profile/readBlog/:id" exact component={Read}></Route>
                        <Route  path="/home/Country_users" component={LandingCountryUser}></Route>
                    </BrowserRouter>
            </div>
      <Footer/>
      
      </div>
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUser())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)


