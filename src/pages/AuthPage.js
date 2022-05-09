
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import { getSubscriptions, login } from '../http/API';


const AuthPage = () =>{
     
    const [isxods, setIsxod] = useState(null)
    const location = useLocation()
    const [token, setToken] = useState('')
    const [user_id, set_user_id] = useState('')
    const [email, setEmail] = useState('')
    const [queryObj, setQueryObj] = useState('')
    useEffect(() =>{
        let code = (queryString.parse(window.location.href)['http://localhost:3000/auth?code'])
        login(code).then(data => setIsxod(data))
    },[])

    const test1 = async() =>{
        const {data} = await getSubscriptions(isxods['access_token'], isxods['user_id'])
        console.log(isxods['access_token'])

    }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=>test1()}>fcgvhbjnk</button>
        <label>{location.pathname}</label>
      </header>
    </div>
  );
}

export default AuthPage;
