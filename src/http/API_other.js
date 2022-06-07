import axios from "axios";

export const resolveScreenName = async (token, user_id) => {
    const {data} = await axios.post('http://localhost:5000/api/other/resolve/'+user_id+'/'+token)
    console.log(data)
    return data
}
export const getCountries = async (token) => {
    const {data} = await axios.post('http://localhost:5000/api/other/country/'+token)
    console.log(data)
    return data
}
export const getRegions = async (token, country_id) => {
    const {data} = await axios.post('http://localhost:5000/api/other/regions/'+country_id+'/'+token)
    console.log(data)
    return data
}
export const getCities = async (token, country_id, region_id) => {
    const {data} = await axios.post('http://localhost:5000/api/other/city/'+country_id+'/'+region_id+'/'+token)
    console.log(data)
    return data
}
export const getUniversities = async (token, country_id, city_id) => {
    const {data} = await axios.post('http://localhost:5000/api/other/universites/'+country_id+'/'+city_id+'/'+token)
    console.log(data)
    return data
}
export const getFaculties = async (token, university_id) => {
    const {data} = await axios.post('http://localhost:5000/api/other/facults/'+university_id +'/'+token)
    console.log(data)
    return data
}
export const getLastShortenedLink = async (token) => {
    const {data} = await axios.post('http://localhost:5000/api/other/short_link/'+token)
    console.log(data)
    return data
}
