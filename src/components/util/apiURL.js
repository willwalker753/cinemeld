import process from 'process';

const apiURL = () => {
    let base = '';
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        base = 'http://localhost:8000';
    } else {
        // base = some prod url
    }
    return base;
}

export default apiURL;