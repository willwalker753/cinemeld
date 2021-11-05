let init = {
    loggedIn: false,
    accountId: '',
    username: '',
    email: '',
    navSelectionType: ''
}

const accountReducer = (state = init, action) => {
    switch(action.type) {
        case('LOGGED_IN'):
            return { ...state, loggedIn: action.payload }  
        case('ACCOUNT_ID'):
            return { ...state, accountId: action.payload }
        case('USERNAME'):
            return { ...state, username: action.payload }
        case('EMAIL'):
            return { ...state, email: action.payload }
        case('NAV_SELECTION_TYPE'):
            return { ...state, navSelectionType: action.payload }
        case('SIGN_OUT'):
            return state = init;
        default:
            return state;
    }
}

export default accountReducer;