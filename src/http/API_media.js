import axios from "axios";

export const getInfoPhoto = async (token, photos) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/media/getInfoPhoto/'+token+'/'+photos)
    console.log(data)
    return data
}
export const getInfoVideo = async (token, owner_id, album_id) => {
    album_id = album_id===''?null:album_id
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/media/getInfoVideo/'+token+'/'+owner_id+'/'+album_id)
    console.log(data)
    return data
}
export const getAlbumById = async (token, owner_id, album_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/media/getAlbumById/'+token+'/'+owner_id+'/'+album_id)
    console.log(data)
    return data
}
export const searchPhoto = async (token, q, end_time, sort, radius) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/media/searchPhoto/'+token+'/'+q+'/'+end_time+'/'+sort+'/'+radius)
    console.log(data)
    return data
}
export const searchVideo = async (token, q, sort, adult, filters) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/media/searchVideo/'+token+'/'+q+'/'+sort)
    console.log(data)
    return data
}