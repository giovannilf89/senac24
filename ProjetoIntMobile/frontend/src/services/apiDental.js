import axios from "axios";

const apiDental = axios.create({
    baseURL: 'http://10.152.46.42:3333'
})

export default apiDental