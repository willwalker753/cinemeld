require('dotenv').config();

const apiURL = () => {
    let base = '';
    if (process.env.NODE_ENV === 'development') {
        base = 'http://localhost:8000';
    } else {
        console.log(process.env.NODE_ENV)
        base = 'https://cinemeld-api.herokuapp.com';
    }
    return base;
}

export default apiURL;