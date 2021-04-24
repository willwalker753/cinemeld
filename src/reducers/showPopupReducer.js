let init = {
    details: false,
    search: false,
    account: false,
    signup: false,
}

const showPopup = (state = init, action) => {
    switch(action.type) {
        case('SHOW_DETAILS'):
            return state = {
                details: true,
                search: false,
                account: false,
                signup: false
            }   
        case('SHOW_SEARCH'):
            return state = {
                details: false,
                search: true,
                account: false,
                signup: false
            } 
        case('SHOW_ACCOUNT'):
            return state = {
                details: false,
                search: false,
                account: true,
                signup: false
            }  
        case('SHOW_SIGNUP'):
            return state = {
                details: false,
                search: false,
                account: false,
                signup: true
            }
        case('CLOSE_POPUP'):
            return state = {
                details: false,
                search: false,
                account: false,
                signup: false
            }
        default:
            return state;
    }
}

export default showPopup;