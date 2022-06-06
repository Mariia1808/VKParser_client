import axios from "axios";
import jwt_decode from "jwt-decode";
import { $authHost, $host } from ".";

export const SaveHistory = async (itog, name, id) => {
    let formData = JSON.stringify({'itog': itog})
    console.log(formData)
    const {data} = await axios.post('http://localhost:5000/api/main/'+name+'/'+id, {itog})
    console.log(data)
    return data
}

export const login = async (code) => {
    const {data} = await axios.get('http://localhost:5000/api/user/'+code)
    console.log(data)
    localStorage.setItem('token', data.token)
    console.log(jwt_decode(data))
    return 
}

export const check = async () => {
    const {data} = await $host.get('http://localhost:5000/api/user/api/user/check' )
    console.log(data)
    localStorage.setItem('token', data.token)
    return data.token
}