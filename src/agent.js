import axios from 'axios';

export default axios.create({
 baseURL: `https://enigmatic-bastion-83517.herokuapp.com/`
  //baseURL: `http://192.168.1.124:8000/`
});