
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import { getSubscriptions } from '../../http/API';
import TableSubscription from './table_sub';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import Select from 'react-select';


const UserSubscriptionPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const location = useLocation()
    
    const field = 'about,activities,bdate,blacklisted,blacklisted_by_mebooks,can_post,can_see_all_posts,can_see_audio,can_send_friend_request,can_write_private_message,career,city,common_count,connections,contacts,country,crop_photo,domain,education,exports,followers_count,friend_status,games,has_mobile,has_photo,home_town,interests,is_favorite,is_friend,is_hidden_from_feed,last_seen,lists,maiden_name,military,movies,music,nickname,occupation,online,personal,photo_id,photo_max,photo_max_orig,quotes,relation,relatives,schools,screen_name,sex,site,status,timezone,tv,universities,verified,wall_comments'+
    'activity,can_create_topic,can_post,can_see_all_posts,city,contacts,counters,country,description,finish_date,fixed_post,links,members_count,place,site,start_date,status,verified,wiki_page'

    const [selectedOption, setSelectedOption] = useState(null)

    let data = [{value: 'about,activities,bdate,blacklisted,blacklisted_by_mebooks,can_post,can_see_all_posts,',label:'Основное'}]

    const [name, setName] = useState(null)
    const [info, setInfo] = useState(null)

    const Send = () =>{
        console.log(decodedData.token)
        console.log(name)
        console.log(decodedData)
        getSubscriptions(decodedData.token, name, selectedOption).then(data=>setInfo(data))
    }
    const Delete = () =>{
        setInfo(null)
        setName(null)
    }

  return (
    <div>
        <h3>Подписки пользователя</h3>
        {/* <button onClick={()=>test1()}>fcgvhbjnk</button> */}
        <div >
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите идентификатор или короткое имя" variant="filled" />
            <div className='div1'><Select defaultValue={selectedOption} onChange={setSelectedOption} options={data} isMulti closeMenuOnSelect={false} />
            <Button  className='menu_but button' variant="outlined" onClick={()=>Send()}><SendIcon/></Button></div>
            {(() => {
            switch (info!=null) {
                case true:
                    return <>
                    <CsvLink data={info.response.items} fileName={'Подписки '+ name} >
                        <Button className='menu_but button' variant="outlined">
                            <SaveAltIcon/>
                        </Button>
                    </CsvLink>
                    <Button className='menu_but button' variant="outlined"><SaveAsIcon/></Button>
                    <Button className='menu_but button' variant="outlined" onClick={()=>Delete()}><DeleteForeverIcon/></Button>
                    </>
                default:
                    return <></>
                }
            })()} 
            
            
        </div><br/>
        {console.log(info)}
        {(() => {
        switch (info!=null) {
            case true:
                return <><label>Найденное количество подписок: </label><label className='war'>{info.response.count}</label><br/>
                <table className='table'>
                    <thead>
                        <th>id</th>
                        <th>Короткое имя</th>
                        <th>Название</th>
                        <th>Кол-во подписчиков</th>
                        <th>Приватность сообщества</th>
                        <th>Оставить запись</th>
                        <th>Администатор</th>
                        <th>Рекламодатель</th>
                    </thead>
                    <tbody>
                       {info.response.items.map(data=>{
                           return <tr>
                               <td>{data.id}</td>
                               <td><>{data.screen_name}</></td>
                               <td>{data.name}</td>
                               <td>{data.members_count}</td>
                                <td>{(() => {
                                    switch (data.is_closed) {
                                    case 0: return <>Открытое</>
                                    case 1: return <>Закрытое</>
                                    case 2: return <>Частное</>
                                    default: return <>-</>
                                    }
                                })()}</td>
                                <td>{(() => {
                                    switch (data.can_post) {
                                    case 1: return <>можно</>
                                    default: return <>нельзя</>
                                    }
                                })()}</td>
                                <td>{(() => {
                                    switch (data.is_admin) {
                                    case 1: return <>да</>
                                    default: return <>нет</>
                                    }
                                })()}</td>
                                <td>{(() => {
                                    switch (data.is_advertiser) {
                                    case 1: return <>да</>
                                    default: return <>нет</>
                                    }
                                })()}</td>
                           </tr>
                       })}
                    </tbody>
                </table></>
            default:
                return <></>
            }
        })()} 
    </div>
  );


}

export default UserSubscriptionPage;