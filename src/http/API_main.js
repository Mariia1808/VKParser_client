import axios from "axios";
import jwt_decode from "jwt-decode";
import { $authHost, $host } from ".";

export const SaveHistory = async (itog, name, id, parameters, method) => {
    let formData = JSON.stringify({'itog': itog})
    console.log(JSON.parse(formData))
    const {data} = await axios.post('http://localhost:5000/api/main/save/'+name+'/'+id+'/'+method+'/'+encodeURI(parameters), {itog})
    console.log(data)
    return data
}

export const get = async (id) => {
    const {data} = await axios.post('http://localhost:5000/api/main/history/'+id)
    console.log(data)
    return data
}

export const getMethod = async (id) => {
    const {data} = await axios.post('http://localhost:5000/api/main/getMethod/'+id)
    console.log(data)
    return data
}

export const delete_history = async (id) => {
    const {data} = await axios.post('http://localhost:5000/api/main/delete/'+id)
    console.log(data)
    return data
}

export const login = async (code) => {
    const {data} = await axios.get('http://localhost:5000/api/user/login/'+code)
    console.log(data)
    localStorage.setItem('token', data.token)
    console.log(jwt_decode(data))
    return 
}

export const check = async () => {
    const {data} = await $host.get('http://localhost:5000/api/user/check' )
    console.log(data)
    localStorage.setItem('token', data.token)
    return data.token
}