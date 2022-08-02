import axios from "axios";

export const getRepostsWall = async (token, owner_id, post_id) => {
    const {data} = await axios.post('http://localhost:5000/api/wall/getReposts/'+token+'/'+owner_id+'/'+post_id)
    console.log(data)
    return data
}
export const getWall = async (token, owner_id, filter) => {
    const {data} = await axios.post('http://localhost:5000/api/wall/get/'+token+'/'+owner_id+'/'+filter)
    console.log(data)
    return data
}
export const searchWall = async (token, owner_id, query) => {
    const {data} = await axios.post('http://localhost:5000/api/wall/search/'+token+'/'+owner_id+'/'+query)
    console.log(data)
    return data
}