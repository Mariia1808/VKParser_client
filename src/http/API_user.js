import axios from "axios";


export const getSubscriptions = async (token, user_id, fields) => {
    const {data} = await axios.get('http://localhost:5000/api/user/getSub/'+token+'/'+user_id+'/'+fields)
    console.log(data)
    return data
}

export const getUser_short = async (token, user_id) => {
    const {data} = await axios.get('http://localhost:5000/api/user/getUser/'+token+'/'+user_id)
    console.log(data)
    return data
}


export const getUser_long = async (token, user_id, fields) => {
    const {data} = await axios.get('http://localhost:5000/api/user/get_info_user/'+token+'/'+user_id+'/'+fields)
    console.log(data)
    return data
}

export const getUser_followers = async (token, user_id, fields) => {
    const {data} = await axios.get('http://localhost:5000/api/user/get_followers/'+token+'/'+user_id+'/'+fields)
    console.log(data)
    return data
}
