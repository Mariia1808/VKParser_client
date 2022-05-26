
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import { getSubscriptions } from '../../http/API';
import TableSubscription from './table_sub';


const UserSubscriptionPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const location = useLocation()
    
    const field = 'about,activities,bdate,blacklisted,blacklisted_by_mebooks,can_post,can_see_all_posts,can_see_audio,can_send_friend_request,can_write_private_message,career,city,common_count,connections,contacts,country,crop_photo,domain,education,exports,followers_count,friend_status,games,has_mobile,has_photo,home_town,interests,is_favorite,is_friend,is_hidden_from_feed,last_seen,lists,maiden_name,military,movies,music,nickname,occupation,online,personal,photo_id,photo_max,photo_max_orig,quotes,relation,relatives,schools,screen_name,sex,site,status,timezone,tv,universities,verified,wall_comments'+
    'activity,can_create_topic,can_post,can_see_all_posts,city,contacts,counters,country,description,finish_date,fixed_post,links,members_count,place,site,start_date,status,verified,wiki_page'

    const [name, setName] = useState(null)
    const [info, setInfo] = useState(null)

    const test1 = () =>{
        console.log(decodedData.token)
        console.log(name)
        console.log(decodedData)
        getSubscriptions(decodedData.token, name, field).then(data=>setInfo(data))
    }

  return (
    <div>
        <h3>Подписки пользователя</h3>
        {/* <button onClick={()=>test1()}>fcgvhbjnk</button> */}
        <div className='div1'>
            <TextField className='text' id="filled-basic" value={name} onChange={e=>setName(e.target.value)} label="Введите идентификатор или короткое имя" variant="filled" />
            <Button  className='menu_but button' variant="outlined" onClick={()=>test1()}>Продолжить</Button>
        </div><br/>
        {console.log(info)}
        {(() => {
        switch (info!=null) {
            case true:
                return <TableSubscription user={info} kolvo={info.response.count}/>
            default:
                return <></>
            }
        })()} 
    </div>
  );


}

export default UserSubscriptionPage;