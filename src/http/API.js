import axios from "axios";

let token = '1302382880b8e0c6b319eda1656dd1ad9a40d63f02fcb1e2b42f74b0c7c88b24e6411d474e56945989352'

export const login = async (token, user_id) => {
    const {data} = await axios.get('http://localhost:5000/api/user/',{token, user_id})
    console.log(data)
    return data
}

// export const login = async () => {
//     const {data} = 'https://oauth.vk.com/authorize?client_id=8143523&revoke=1&redirect_uri=http://localhost:3000/main&display=page&scope=friends&response_type=token'
//     console.log(data)
//     return data
// }

