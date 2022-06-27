import { getCardUtilityClass } from "@mui/material";
import axios from "axios";

export const resolveScreenName = async (token, user_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/other/resolve/'+user_id+'/'+token)
    console.log(data)
    return data
}
export const getCountries = async (token) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/other/country/'+token)
    console.log(data)
    return data
}
export const getRegions = async (token, country_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/other/regions/'+country_id+'/'+token)
    console.log(data)
    return data
}
export const getCities = async (token, country_id, region_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/other/city/'+country_id+'/'+region_id+'/'+token)
    console.log(data)
    return data
}
export const getUniversities = async (token, country_id, city_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/other/universites/'+country_id+'/'+city_id+'/'+token)
    console.log(data)
    return data
}
export const getFaculties = async (token, university_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/other/facults/'+university_id +'/'+token)
    console.log(data)
    return data
}
export const getLastShortenedLink = async (token) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/other/short_link/'+token)
    console.log(data)
    return data
}
export const getCitiesById = async (token, city) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/other/getCitiesById/'+token+'/'+city)
    console.log(data)
    return data
}
export const getCountriesById = async (token, country) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/other/getCountriesById/'+token+'/'+country)
    console.log(data)
    return data
}
export const getSchools = async (token, city_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/other/getSchools/'+token+'/'+city_id)
    console.log(data)
    return data
}
