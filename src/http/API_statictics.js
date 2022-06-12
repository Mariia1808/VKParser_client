import axios from "axios";

export const getGroups = async (token) => {
    const {data} = await axios.post('http://localhost:5000/api/static/getGroups/'+token)
    console.log(data)
    return data
}
export const statsGroupAll = async (token, group_id) => {
    console.log(group_id)
    const {data} = await axios.post('http://localhost:5000/api/static/statsGroupAll/'+token+'/'+group_id)
    console.log(data)
    return data
}
export const statsAppAll = async (token, app_id) => {
    const {data} = await axios.post('http://localhost:5000/api/static/statsAppAll/'+token+'/'+app_id)
    console.log(data)
    return data
}
export const statsGroup = async (token, group_id, timestamp_from, timestamp_to) => {
    const {data} = await axios.post('http://localhost:5000/api/static/statsGroup/'+token+'/'+group_id+'/'+timestamp_from+'/'+timestamp_to)
    console.log(data)
    return data
}
export const statsApp = async (token, app_id, timestamp_from, timestamp_to) => {
    const {data} = await axios.post('http://localhost:5000/api/static/statsApp/'+token+'/'+app_id+'/'+timestamp_from+'/'+timestamp_to)
    console.log(data)
    return data
}
