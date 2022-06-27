import axios from "axios";

export const getById = async (token, group_id, fields) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/group/get_info/'+token+'/'+group_id+'/'+fields)
    console.log(data)
    return data
}

export const getMembers = async (token, group_id, fields, filter) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/group/get_members/'+token+'/'+group_id+'/'+fields+'/'+filter )
    console.log(data)
    return data
}
export const getCatalogInfo = async (token) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/group/get_catalog_info/'+token)
    console.log(data)
    return data
}
export const getCatalog = async (token, category_id, subcategory_id) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/group/get_catalog/'+token+'/'+category_id+'/'+subcategory_id)
    console.log(data)
    return data
}
export const searchGroup = async (token, q, type, sort) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/group/searchGroup/'+token+'/'+q+'/'+type+'/'+sort)
    console.log(data)
    return data
}
export const searchEvent = async (token, q, city_id, sort) => {
    const {data} = await axios.post('https://shrouded-shore-51202.herokuapp.com/api/group/searchEvent/'+token+'/'+q+'/'+city_id+'/'+sort)
    console.log(data)
    return data
}