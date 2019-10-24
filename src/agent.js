import axios from 'axios';

export default axios.create({
  baseURL: `http://192.168.1.124:8000/`
});