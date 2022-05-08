
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import { login } from '../http/API';


const AuthPage = () =>{
     
    const [isxods, setIsxod] = useState(null)
    const location = useLocation()
    let token = ''
    let user_id = ''
    let email = ''

    useEffect(async () =>{
        let queryObj = queryString.parse(window.location.href)
        if(queryObj['http://localhost:3000/auth#access_token']!== undefined){
            token = queryObj['http://localhost:3000/auth#access_token']
            user_id = queryObj['user_id']
            if(queryObj['email']!==undefined){
                email = queryObj['email']
            }
            console.log(token)
            console.log(email)
            console.log(user_id)
            try {
                let data;
                data = await login(token, user_id);
                console.log(data)
            } catch (e) {
                alert(e.response.data.message)
            }
        }
    },[])

    function test(){
        console.log(token)
    }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=>test()}>fcgvhbjnk</button>
        <label>{location.pathname}</label>
      </header>
    </div>
  );
}

export default AuthPage
