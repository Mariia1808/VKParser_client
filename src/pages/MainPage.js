
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import jwt_decode from "jwt-decode";
import { getUser_short } from '../http/API_user';
import { login } from '../http/API_main';



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
    <div className="c content">
        <div className="content_wall ">
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
        <label>Выберите в меню сверху любой интересующий вас раздел и начинайте активный сбор данных. </label>
        </div>
        <label className='war'>Справка</label><br/>
        <label>Адрес страницы пользователя или сообщества: https://vk.com/<label className='war'>mvbannikova</label> - короткое имя</label><br/>
        <label>Адрес фотографии: https://vk.com/q_qvazar?z=photo<label className='war'>-143031608_457425818</label>%2Falbum-143031608_00%2Frev - идентификатор фотографии</label><br/>
        <label>Адрес записи: https://vk.com/mvbannikova?w=wall<label className='war'>50064646_4555</label> - идентификатор записи</label><br/>
        <label>Адрес видеозаписи: https://vk.com/video?z=video<label className='war'>-78019879_456239973</label>%2Fpl_cat_trends - идентификатор видеозаписи</label><br/>
        <label>Адрес альбома видеозаписей: https://vk.com/video/playlist/<label className='war'>-58120520_8</label> - идентификатор альбома</label><br/>
    </div>
  );
}

export default MainPage
