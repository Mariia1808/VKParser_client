
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from "query-string";
import jwt_decode from "jwt-decode";
import { getUser_short } from '../http/API_user';
import { login } from '../http/API_main';



const MainPage = () =>{
   
    const toNavigate = useNavigate()
    const [isxods, setIsxod] = useState(null)
    const [user, setUser] = useState(null)
    const location = useLocation()

    useEffect(() =>{
        
        let code = (queryString.parse(window.location.href)['https://parservkontakte.onrender.com/main?code'])
        if(code!==undefined){
            login(code).then(data => setIsxod(data)).finally(()=> log())
        }
        
    },[])

    const log =()=>{
        const storedToken = localStorage.getItem("token")
            console.log(storedToken)
            let decodedData  = jwt_decode(storedToken)
            console.log(decodedData)
            if(decodedData!==undefined){
                console.log(decodedData.user_id)
                getUser_short(decodedData.token, decodedData.user_id).then(data => setUser(data))
            }
    }

  return (
    <div className="c content pad">
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
        <table className='table'>
            <thead>
                <th>Что</th>
                <th>Где</th>
                <th>Откуда</th>
            </thead>
            <tbody>
                <tr>
                    <td>Короткое имя группы или пользователя</td>
                    <td>https://vk.com/<label className='war'>mvbannikova</label></td>
                    <td>Адрес страницы пользователя или сообщества</td>
                </tr>
                <tr>
                    <td>Короткое имя группы или пользователя<label className='war'>*</label></td>
                    <td>https://vk.com/q_qvazar?z=photo<label className='war'>-143031608</label>_457425818%2Falbum-143031608_00%2Frev</td>
                    <td>Адрес фотографии</td>
                </tr>
                <tr>
                    <td>Короткое имя группы или пользователя<label className='war'>*</label></td>
                    <td>https://vk.com/video?z=video<label className='war'>-78019879</label>_456239973%2Fpl_cat_trends</td>
                    <td>Адрес видеозаписи</td>
                </tr>
                <tr>
                    <td>Короткое имя группы или пользователя<label className='war'>*</label></td>
                    <td>https://vk.com/mvbannikova?w=wall<label className='war'>50064646</label>_4555</td>
                    <td>Адрес записи</td>
                </tr>
                <tr>
                    <td>Короткое имя группы или пользователя<label className='war'>*</label></td>
                    <td>https://vk.com/video/playlist/<label className='war'>-58120520</label>_8</td>
                    <td>Адрес альбома</td>
                </tr>
                <tr>
                    <td>Идентификатор фотографии</td>
                    <td>https://vk.com/q_qvazar?z=photo-143031608_<label className='war'>457425818</label>%2Falbum-143031608_00%2Frev</td>
                    <td>Адрес фотографии</td>
                </tr>
                <tr>
                    <td>Идентификатор видеозаписи</td>
                    <td>https://vk.com/video?z=video-78019879_<label className='war'>456239973</label>%2Fpl_cat_trends</td>
                    <td>Адрес видеозаписи</td>
                </tr>
                <tr>
                    <td>Идентификатор записи</td>
                    <td>https://vk.com/mvbannikova?w=wall50064646_<label className='war'>4555</label></td>
                    <td>Адрес записи</td>
                </tr>
                <tr>
                    <td>Идентификатор альбома</td>
                    <td>https://vk.com/video/playlist/-58120520_<label className='war'>8</label></td>
                    <td>Адрес альбома</td>
                </tr>
            </tbody>
        </table>
        <label><label className='war'>*примечание</label> необходимо, знак '-' заменять на club, а если его нет, то в начало добавить id,
            пример 50064646 = id50064646, -58120520 = club58120520</label>
    </div>
  );
}

export default MainPage
