import axios from "axios";

export const resolveScreenName = async (token, user_id) => {
    const formData =  new FormData()
    formData.append({'token':token})
    const {data} = await axios.post('http://localhost:5000/api/other/'+user_id, {formData})
    console.log(data)
    return data
}
export const getCountries = async (token) => {
    console.log(token)
    const {data} = await axios.post('http://localhost:5000/api/other/country/'+token)
    console.log(data)
    return data
}
export const getRegions = async (token, country_id) => {
    const {data} = await axios.post('http://localhost:5000/api/other/'+country_id, {token})
    console.log(data)
    return data
}
export const getCities = async (token, country_id, region_id) => {
    const {data} = await axios.post('http://localhost:5000/api/other/'+country_id+'/'+region_id, {token})
    console.log(data)
    return data
}
export const getUniversities = async (token, region_id, city_id) => {
    const {data} = await axios.post('http://localhost:5000/api/other/'+region_id+'/'+city_id, {token})
    console.log(data)
    return data
}
export const getFaculties = async (token, university_id) => {
    const {data} = await axios.post('http://localhost:5000/api/other/'+university_id ,{token})
    console.log(data)
    return data
}
export const getLastShortenedLink = async (token) => {
    const {data} = await axios.post('http://localhost:5000/api/other/short_link/',{token})
    console.log(data)
    return data
}
