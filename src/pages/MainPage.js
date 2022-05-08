
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import { login } from '../http/API';


const MainPage = () =>{
     
    const [isxods, setIsxod] = useState(null)
    const location = useLocation()
    const [token, setToken] = useState('')
    const [user_id, set_user_id] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() =>{
        let queryObj = queryString.parse(window.location.href)
        if(queryObj['http://localhost:3000/main#access_token']!== undefined){
            setToken(queryObj['http://localhost:3000/main#access_token'])
            set_user_id(queryObj['user_id'])
            if(queryObj['email']!==undefined){
                setEmail(queryObj['email'])
            }
            console.log(token)
            console.log(user_id)
            console.log(email)
        }
    },[])

    function test(){
        //login().then(data=>setIsxod(data))
    }

  return (
    <div className="App">
      <header className="App-header">
        {console.log(token)}
        {console.log(user_id)}
        {console.log(email)}
        <button onClick={()=>test()}>fcgvhbjnk</button>
        <button><a href='https://oauth.vk.com/authorize?client_id=8143523&revoke=1&redirect_uri=http://localhost:3000/auth&display=page&scope=friends,offline,photos,audio,video,wall,groups,email&response_type=token'>txcyvjhbkjnl</a></button>
        <label>{location.pathname}</label>
      </header>
    </div>
  );
}

export default MainPage
