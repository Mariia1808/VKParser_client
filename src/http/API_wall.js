import axios from "axios";

export const getRepostsWall = async (token, owner_id, post_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/wall/getReposts/'+token+'/'+owner_id+'/'+post_id)
    console.log(data)
    return data
}
export const getWall = async (token, owner_id, filter) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/wall/get/'+token+'/'+owner_id+'/'+filter)
    console.log(data)
    return data
}
export const searchWall = async (token, owner_id, query) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/wall/search/'+token+'/'+owner_id+'/'+query)
    console.log(data)
    return data
}