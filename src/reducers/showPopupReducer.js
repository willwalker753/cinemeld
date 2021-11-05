let init = {
    details: false,
    search: false,
    account: false,
    signup: false,
}

const showPopup = (state = init, action) => {
    switch(action.type) {
        case('SHOW_DETAILS'):
            return { ...init, details: true }
        case('SHOW_SEARCH'):
            return { ...init, search: true }
        case('SHOW_ACCOUNT'):
            return { ...init, account: true }
        case('SHOW_SIGNUP'):
            return { ...init, signup: true }
        case('CLOSE_POPUP'):
            return init;
        default:
            return state;
    }
}

export default showPopup;