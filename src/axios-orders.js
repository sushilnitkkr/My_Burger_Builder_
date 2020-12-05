import axios from 'axios';

 const instance = axios.create({
    baseURL:'https://burger-point-afc0d.firebaseio.com/'
});

export default instance;