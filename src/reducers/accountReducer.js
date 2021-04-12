let init = {
    loggedIn: false,
    accountId: ''
}

const accountReducer = (state = init, action) => {
    switch(action.type) {
        case('LOGGED_IN'):
            return state = {
                loggedIn: action.payload,
                accountId: state.accountId
            }   
        case('ACCOUNT_ID'):
            return state = {
                loggedIn: state.loggedIn,
                accountId: action.payload
            }   
        default:
            return state;
    }
}

export default accountReducer;