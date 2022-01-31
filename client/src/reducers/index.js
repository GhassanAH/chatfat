import { combineReducers } from "redux";
import  authReducer  from './authReducer'
import clientReducer from "./clientReducer";
import  userReducer  from "./userReducer";



export default combineReducers({
    auth:authReducer,
    user: userReducer,
    client:clientReducer
})