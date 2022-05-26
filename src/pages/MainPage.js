
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import { getUser_short, login } from '../http/API';
import jwt_decode from "jwt-decode";



const MainPage = () =>{
   
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [isxods, setIsxod] = useState(null)
    const [user, setUser] = useState(null)
    const location = useLocation()
    
    useEffect(() =>{
        let code = (queryString.parse(window.location.href)['http://localhost:3000/main?code'])
        if(code!=undefined){
           login(code).then(data => setIsxod(data)) 
        }
        if(decodedData!=undefined){
            getUser_short(decodedData.token, decodedData.user_id).then(data => setUser(data))
        }
        
    },[])

  return (
    <div className="content content_wall">
        <label>Добро пожаловать, 
        {(() => {
                switch (user!=null) {
                case true:
                    return <label className='war'> {user.response[0].last_name} {user.response[0].first_name}!</label>
                default:
                    return <></>
                }
            })()}
            
             </label><br/>
        <label>
            Сервис предназначен для сбора данных из социальной сети ВКонтакте. Он позволяет собирает полную информацию о необходимой для вас категории,
            отфильтровать полученные данные, просмотреть статистику своих приложений или рекламных постов и многое другое. Весь функционал сервиса полностью бесплатный!
        </label><br/>
        <label>Выберите в меню сверху любой интерисующий вас раздел и начинайте активный сбор данных. </label>
    </div>
  );
}

export default MainPage
