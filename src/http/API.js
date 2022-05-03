import axios from "axios";

let token = '1302382880b8e0c6b319eda1656dd1ad9a40d63f02fcb1e2b42f74b0c7c88b24e6411d474e56945989352'

export const login = async () => {
    const {data} = await axios.post('https://api.vk.com/method/groups.getById?v=5.131&fields=members_count&group_id=queenspublic&access_token='+token)
    console.log(data.response[0].members_count)
    return data
}