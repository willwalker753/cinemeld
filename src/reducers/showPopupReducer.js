let init = {
    details: false,
    search: false,
    account: false
}

const showPopup = (state = init, action) => {
    switch(action.type) {
        case('SHOW_DETAILS'):
            return state = {
                details: true,
                search: false,
                account: false
            }   
        case('SHOW_SEARCH'):
            return state = {
                details: false,
                search: true,
                account: false
            } 
        case('SHOW_ACCOUNT'):
            return state = {
                details: false,
                search: false,
                account: true
            }  
        case('CLOSE_POPUP'):
            return state = {
                details: false,
                search: false,
                account: false
            }

        default:
            return state;
    }
}

export default showPopup;