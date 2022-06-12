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
export const getLinkStats = async (token, key) => {
    const {data} = await axios.post('http://localhost:5000/api/static/getLinkStats/'+token+'/'+key)
    console.log(data)
    return data
}
