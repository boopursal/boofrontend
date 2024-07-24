import axios from 'axios';

const instance = axios.create({
    baseURL: 'backendgit-three.vercel.app', // URL de votre backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
