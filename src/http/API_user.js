import axios from "axios";


export const getSubscriptions = async (token, user_id, fields) => {
    const {data} = await axios.get('http://localhost:5000/api/user/getSub/'+token+'/'+user_id+'/'+fields)
    console.log(data)
    return data
}

export const getUser_short = async (token, user_id) => {
    const {data} = await axios.get('http://localhost:5000/api/user/getUser/'+token+'/'+user_id)
    console.log(data)
    return data
}


export const getUser_long = async (token, user_id, fields) => {
    const {data} = await axios.get('http://localhost:5000/api/user/get_info_user/'+token+'/'+user_id+'/'+fields)
    console.log(data)
    return data
}

export const getUser_followers = async (token, user_id, fields) => {
    const {data} = await axios.get('http://localhost:5000/api/user/get_followers/'+token+'/'+user_id+'/'+fields)
    console.log(data)
    return data
}

export const searchUserSchool = async (token, q, sort, fields, sex, age_from, age_to, group_id, from_list, school, school_year) => {
    const {data} = await axios.post('http://localhost:5000/api/user/searchUserSchool/'+token+'/'+q+'/'+sort+'/'+fields+'/'+sex+'/'+age_from+'/'+age_to+'/'+group_id+'/'+from_list+'/'+school+'/'+school_year)
    console.log(data)
    return data
}
export const searchUserUniversity = async (token, q, sort, fields, sex, age_from, age_to, group_id, from_list, university, university_year, university_faculty) => {
    const {data} = await axios.post('http://localhost:5000/api/user/searchUserUniversity/'+token+'/'+q+'/'+sort+'/'+fields+'/'+sex+'/'+age_from+'/'+age_to+'/'+group_id+'/'+from_list+'/'+university+'/'+university_year+'/'+university_faculty)
    console.log(data)
    return data
}
export const searchUserWork = async (token, q, sort, fields, city, sex, age_from, age_to, group_id, from_list, company, position) => {
    const {data} = await axios.post('http://localhost:5000/api/user/searchUserWork/'+token+'/'+q+'/'+sort+'/'+fields+'/'+city+'/'+sex+'/'+age_from+'/'+age_to+'/'+group_id+'/'+from_list+'/'+company+'/'+position)
    console.log(data)
    return data
}
export const searchUserAll = async (token, q, sort, fields, city, sex, status, age_from, age_to, birth_day, birth_month, birth_year, group_id, from_list) => {
    const {data} = await axios.post('http://localhost:5000/api/user/searchUserAll/'+token+'/'+q+'/'+sort+'/'+fields+'/'+city+'/'+sex+'/'+status+'/'+age_from+'/'+age_to+'/'+birth_day+'/'+birth_month+'/'+birth_year+'/'+group_id+'/'+from_list)
    console.log(data)
    return data
}