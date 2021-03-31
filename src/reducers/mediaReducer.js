const mediaReducer = (state = '', action) => {
    if(action.type === 'CHANGE_MEDIA') {
        return state = action.payload;
    }
    else {
        return state;
    }
}

export default mediaReducer;