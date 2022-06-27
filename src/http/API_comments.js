import axios from "axios";

export const getCommentsWall = async (token, owner_id, post_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/comment/getCommentsWall/'+token+'/'+owner_id+'/'+post_id)
    console.log(data)
    return data
}
export const getCommentsPhotos = async (token, owner_id, photo_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/comment/getCommentsPhotos/'+token+'/'+owner_id+'/'+photo_id)
    console.log(data)
    return data
}
export const getCommentsVideo = async (token, owner_id, video_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/comment/getCommentsVideo/'+token+'/'+owner_id+'/'+video_id)
    console.log(data)
    return data
}