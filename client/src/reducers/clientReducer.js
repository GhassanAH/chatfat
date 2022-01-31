

const clientReducer = (state = null, action) => {
    switch(action.type){
        case 'login':
            return action.payload || false
        case 'signUp':
            return action.payload || false
        case 'Home':
                return action.payload || false
        case 'update':
                    return action.payload || false
        default:
            return "Login"
    }
}

export default clientReducer