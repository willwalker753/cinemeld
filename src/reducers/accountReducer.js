let init = {
    loggedIn: false,
    accountId: '',
    username: '',
    email: ''
}

const accountReducer = (state = init, action) => {
    switch(action.type) {
        case('LOGGED_IN'):
            return state = {
                loggedIn: action.payload,
                accountId: state.accountId,
                username: state.username,
                email: state.email
            }   
        case('ACCOUNT_ID'):
            return state = {
                loggedIn: state.loggedIn,
                accountId: action.payload,
                username: state.username,
                email: state.email
            }   
        case('USERNAME'):
            return state = {
                loggedIn: state.loggedIn,
                accountId: state.accountId,
                username: action.payload,
                email: state.email
            }   
        case('EMAIL'):
            return state = {
                loggedIn: state.loggedIn,
                accountId: state.accountId,
                username: state.username,
                email: action.payload
            }
        case('SIGN_OUT'):
            return state = init;
        default:
            return state;
    }
}

export default accountReducer;