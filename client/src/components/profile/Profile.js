import React from 'react'
import { connect } from 'react-redux'
import "../../css/Portfolio.css"
import {  faAddressCard, faUser, faMapMarkerAlt, faMapMarkedAlt, faBusinessTime, faComment, faAward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FiPlusCircle } from "react-icons/fi";

const Profile = ({auth}) => {
    return (
        <div className="main-container">
        
        <div className="pmain_container">
                <h1>
                    PORTFOLIO
                    <span>
                        <FontAwesomeIcon
                            icon={faAddressCard} size="1x"
                        />
                    </span>

                </h1>
            <div className="pcontainer">
                
                <div>
                    <img alt="user" className="pimg" src={auth.photo}></img>
                </div>
                <div className="pinfo">
                    <ul>
                        <li><span><FontAwesomeIcon icon={faBusinessTime} style={{ color: "#fff" }} size="1x" /></span> 100,000 Subscribers </li>
                        <li><span><FontAwesomeIcon icon={faComment} style={{ color: "#fff" }} size="1x" /></span>500 Followings</li>
                        <li><span><FontAwesomeIcon icon={faAward} style={{ color: "#fff" }} size="1x" /></span> 200,000,000 likes</li>
                    </ul>

                </div>
             
                
            </div>
            <div className="pcontainer">
                <div className="pinfo">
                    <ul>
                        <li><span><FontAwesomeIcon icon={faUser} style={{ color: "#fff" }} size="1x" /></span> {auth.name}</li>
                        <li><span><FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#fff" }} size="1x" /></span> {auth.country}</li>
                        <li><span><FontAwesomeIcon icon={faMapMarkedAlt} style={{ color: "#fff" }} size="1x" /></span>{auth.city}</li>
                    </ul>
                </div>
                <div className="pinfo">
                    <ul>
                        <li><span><FontAwesomeIcon icon={faBusinessTime} style={{color:"#fff"}} size="1x"/></span>  {auth.job}</li>
                        <li><span><FontAwesomeIcon icon={faComment} style={{color:"#fff"}} size="1x"/></span>{auth.sentence}</li>
                        <li><span><FontAwesomeIcon icon={faAward} style={{color:"#fff"}} size="1x"/></span> {auth.hobbies}</li>
                    </ul>
                </div>
                
            </div>
            </div>

            <div className="amain_container">
                <a href="/home/profile/create-story"> <FiPlusCircle /> </a>
            
            
        </div>

    </div>

        
    )
}
const mapStateToProps = state => {
    return {
      auth: state.auth
    }
  }

export default connect(mapStateToProps)(Profile)
