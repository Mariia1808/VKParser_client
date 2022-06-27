const axios = require('axios')

const $host = axios.create({
    baseURL: 'https://shrouded-shore-51202.herokuapp.com/'
})

const $authHost = axios.create({
    baseURL: 'https://shrouded-shore-51202.herokuapp.com/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}