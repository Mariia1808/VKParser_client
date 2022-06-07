import axios from "axios";

export const getInfoPhoto = async (token, photos) => {
    const {data} = await axios.post('http://localhost:5000/api/media/getInfoPhoto/'+photos+'/'+token)
    console.log(data)
    return data
}