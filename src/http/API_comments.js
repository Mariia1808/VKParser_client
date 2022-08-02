import axios from "axios";

export const getCommentsWall = async (token, owner_id, post_id) => {
    const {data} = await axios.post('http://localhost:5000/api/comment/getCommentsWall/'+token+'/'+owner_id+'/'+post_id)
    console.log(data)
    return data
}
export const getCommentsPhotos = async (token, owner_id, photo_id) => {
    const {data} = await axios.post('http://localhost:5000/api/comment/getCommentsPhotos/'+token+'/'+owner_id+'/'+photo_id)
    console.log(data)
    return data
}
export const getCommentsVideo = async (token, owner_id, video_id) => {
    const {data} = await axios.post('http://localhost:5000/api/comment/getCommentsVideo/'+token+'/'+owner_id+'/'+video_id)
    console.log(data)
    return data
}