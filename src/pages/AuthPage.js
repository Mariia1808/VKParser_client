
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import { getSubscriptions, login } from '../http/API';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";

const AuthPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [isxods, setIsxod] = useState(null)
    const location = useLocation()
    
    useEffect(() =>{
        let code = (queryString.parse(window.location.href)['http://localhost:3000/auth?code'])
        login(code).then(data => setIsxod(data))
    },[])

    const test1 = async() =>{
        console.log(decodedData.token)
        console.log()
        console.log(decodedData)
        const {data} = await getSubscriptions(decodedData.token, decodedData.user_id)
        //console.log(isxods['access_token'])
    }

  return (
    <div className="content">
        <button onClick={()=>test1()}>fcgvhbjnk</button>
        <Button variant="contained"><a href='https://oauth.vk.com/authorize?client_id=8143523&revoke=1&redirect_uri=http://localhost:3000/auth&display=page&scope=friends,offline,photos,audio,video,wall,groups,email&response_type=code'>Вход</a></Button>
        <label>{location.pathname}</label>
    </div>
  );
}

export default AuthPage;
