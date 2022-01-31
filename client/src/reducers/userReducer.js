import {REST_PASSWORD, UPDATE_PASSWORD, CHECK_EMAIL,INTRODUCE,CONVERT_BLOG, GET_BLOG, GET_BLOG_By_Id, UpdateBlog, DeleteBlog} from "../actions/types"

const userReducer = (state = null, action) => {
    switch(action.type){
        case REST_PASSWORD:
            return action.payload || false
        case UPDATE_PASSWORD:
            return action.payload || false
        case CHECK_EMAIL:
            return action.payload || false
        case INTRODUCE:
                return action.payload || false
        case CONVERT_BLOG:
            return action.payload || false
        case GET_BLOG:
            return action.payload || false
        case GET_BLOG_By_Id:
            return action.payload || false
        case UpdateBlog:
            return action.payload || false
        case DeleteBlog:
            return action.payload || false
        default:
            return state
    }
}

export default userReducer
