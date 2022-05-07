import axios from "axios";

let token = '1302382880b8e0c6b319eda1656dd1ad9a40d63f02fcb1e2b42f74b0c7c88b24e6411d474e56945989352'

export const login = async () => {
    const {data} = await axios.get('http://localhost:5000/api/user/')
    console.log(data)
    return data
}