import axios from 'axios';

const axiosOrder = axios.create({
    'baseURL': 'https://build-burguer.firebaseio.com/'
});

export default axiosOrder;