import axios from "axios";
import jwt_decode from "jwt-decode";
import { $authHost, $host } from ".";
let token = '1302382880b8e0c6b319eda1656dd1ad9a40d63f02fcb1e2b42f74b0c7c88b24e6411d474e56945989352'

export const login = async (code) => {
    const {data} = await axios.get('http://localhost:5000/api/user/'+code)
    console.log(data)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getSubscriptions = async (token, user_id) => {
    const {data} = await axios.get('http://localhost:5000/api/user/getSub/'+token+'/'+user_id)
    console.log(data)
    return data
}

export const check = async () => {
    const {data} = await $host.get('http://localhost:5000/api/user/api/user/check' )
    console.log(data)
    localStorage.setItem('token', data.token)
    return data.token
}
