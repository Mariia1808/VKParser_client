import axios from "axios";
import jwt_decode from "jwt-decode";
import { $authHost, $host } from ".";

const header = {
    'Access-Control-Allow-Methods':'*',
}

export const SaveHistory = async (itog, name, id, parameters, method) => {
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
export const getAllMethods = async () => {
    const {data} = await axios.post('http://localhost:5000/api/main/getAllMethods/')
    console.log(data)
    return data
}

export const createMethod = async (name, method) => {
    const {data} = await axios.post('http://localhost:5000/api/main/createMethod/'+name, {method})
    console.log(data)
    return data
}

export const deleteMethods = async (id) => {
    const {data} = await axios.post('http://localhost:5000/api/main/deleteMethods/'+id)
    console.log(data)
    return data
}

export const updateMethods = async (id, name, method) => {
    const {data} = await axios.post('http://localhost:5000/api/main/updateMethods/'+id+'/'+name, {method})
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