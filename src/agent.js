import axios from "axios";

export default axios.create({
  //baseURL: `http://192.168.1.124:8000/`
  //baseURL: `http://192.168.11.108:8000/`,
  baseURL: `https://bps.boopursal.com/`,
    //baseURL: `https://api.boopursal.com/`,
});
