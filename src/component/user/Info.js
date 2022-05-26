
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from "query-string";
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import { getUser_long } from '../../http/API';
import TableInfo from './table';

const UserInfoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const location = useLocation()
    
    let data = null

    const field = 'activities,about,blacklisted,blacklisted_by_me,books,bdate,can_be_invited_group,can_post,can_see_all_posts,can_see_audio,'+
    'can_send_friend_request,can_write_private_message,career,common_count,connections,contacts,city,country,crop_photo,domain,education,exports'+
    ',followers_count,friend_status,has_photo,has_mobile,home_town,photo_100,sex,site,schools,screen_name,status,verified,games,interests,is_favorite'+
    ',is_friend,is_hidden_from_feed,last_seen,maiden_name,military,movies,music,nickname,occupation,online,personal,photo_id,photo_max,photo_max_orig'+
    ',quotes,relation,relatives,timezone,tv,universities'

    const [name, setName] = useState(null)
    const [info, setInfo] = useState(null)

    const test1 = () =>{
        console.log(decodedData.token)
        console.log(name)
        console.log(decodedData)
        getUser_long(decodedData.token, name, field).then(data=>setInfo(data))
    }

  return (
    <div>
        <h3>Расширенная информация о пользователе(-ях)</h3>
        {/* <button onClick={()=>test1()}>fcgvhbjnk</button> */}
        <div className='div1'>
            <TextField className='text' id="filled-basic" value={name} onChange={e=>setName(e.target.value)} label="Введите идентификаторы или короткие имена" variant="filled" />
            <Button  className='menu_but button' variant="outlined" onClick={()=>test1()}>Продолжить</Button>
        </div><br/>
        {console.log(info)}
        {(() => {
                switch (info!=null) {
                case true:
                    return <TableInfo user={info}/>
                default:
                    return <></>
                }
            })()}
    </div>
  );
}

export default UserInfoPage;