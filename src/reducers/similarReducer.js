let init = {
    name: ''
}

const similarReducer = (state = init, action) => {
    switch(action.type) {
        case('SIMILAR_NAME'):
            return state = {
                name: action.payload
            }   
        default:
            return state;
    }
}

export default similarReducer;