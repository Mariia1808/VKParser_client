
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import Select from 'react-select';
import { getUser_followers } from '../../http/API_user';
import { SaveHistory } from '../../http/API_main';


const UserFollowersPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const location = useLocation()
    
    const field = 'about,activities,bdate,blacklisted,blacklisted_by_mebooks,can_post,can_see_all_posts,can_see_audio,can_send_friend_request,can_write_private_message,career,city,common_count,connections,contacts,country,crop_photo,domain,education,exports,followers_count,friend_status,games,has_mobile,has_photo,home_town,interests,is_favorite,is_friend,is_hidden_from_feed,last_seen,lists,maiden_name,military,movies,music,nickname,occupation,online,personal,photo_id,photo_max,photo_max_orig,quotes,relation,relatives,schools,screen_name,sex,site,status,timezone,tv,universities,verified,wall_comments'

    const [selectedOption, setSelectedOption] = useState(null)

    let data = [{value: '',label:'Основные'},
    {value: '',label:'Дополнительные'}]

    const [name, setName] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [info, setInfo] = useState(null)
    const [error, setError] = useState(null)

    const Send = () =>{
        let field = `bdate,can_post,city,screen_name,friend_status,can_write_private_message,`
        console.log(field)
        if(selectedOption!=null)
        {selectedOption.map((data,index)=> field=field+String(data.value)+',')}
        getUser_followers(decodedData.token, name, field).then(data=>
        {
        if(data.response!=undefined){
            setInfo(data)
            setError(null)
        }else{
            setError('Невозможно получить подписчиков выбранного человека')
        }})
        console.log(info)
    }

    const Delete = () =>{
        setInfo(null)
        setName('')
        setNameZapros('')
        setSelectedOption(null)
    }
    const Save =()=>{
        SaveHistory(JSON.stringify(info.response.items), NameZapros, parseInt(decodedData.id)).then()
    }

  return (
    <>
    <div className='content con'>
        <h3>Подписчики пользователя</h3>
        <div >
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" variant="standard" />
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите идентификатор или короткое имя" variant="standard" />
            <div className='div1'>
                <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedOption} onChange={setSelectedOption} options={data} isMulti closeMenuOnSelect={false} />
                <Button className='menu_but button' variant="outlined" onClick={()=>Send()}>
                    <SendIcon/>
                </Button>
            </div>
        </div><br/>
    </div>
    {(() => {
    switch (error!=null) {
        case true:
            return <div className='content'>{error}</div>
        default: return<></>
    }
    })()} 
        {(() => {
        switch (info!=null) {
            case true:
                return <div className='content'>
                <div className='shapka'>
                    <div>
                        <label>Найденное количество подписичков: </label><label className='war'>{info.response.count}</label>
                    </div>
                    <div>
                        <CsvLink data={info.response.items} fileName={NameZapros} >
                            <IconButton color="primary" variant="outlined">
                                <SaveAltIcon/>
                            </IconButton>
                        </CsvLink>
                        <IconButton color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
                        <IconButton color="primary" variant="outlined" onClick={()=>Delete()}><DeleteForeverIcon/></IconButton>
                    </div>
                </div>
                <table className='table'>
        <thead>
            <th>№</th>
            <th>id</th>
            <th>Короткое имя</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Пол</th>
            <th>Приватность профиля</th>
            <th>Дата Рожд.</th>
            <th>Город</th>
            <th>Друзья</th>
            <th>Написать в ЛС</th>
            <th>Оставить запись</th>
        </thead>
        <tbody>
           {info.response.items.map((data, index)=>{
               return <tr>
                   <td>{index+1}</td>
                   <td>{data.id}</td>
                   <td><>{data.screen_name}</></td>
                   <td>{data.first_name}</td>
                   <td>{data.last_name}</td>
                   <td>{(() => {
                        switch (data.sex) {
                        case 1: return <>Женский</>
                        case 0: return <>Мужской</>
                        default: return <>-</>
                        }
                    })()}</td>
                   <td>{(() => {
                        switch (data.can_access_closed) {
                        case true: return <>Открыт</>
                        default: return <>Закрыт</>
                        }
                    })()}</td>
                   <td>{(() => {
                        switch (data.bdate!=undefined) {
                        case true: return <>{data.bdate}</>
                        default: return <>-</>
                        }
                    })()}</td>
                   <td>{(() => {
                        switch (data.city!=undefined) {
                        case true: return <>{data.city.title}</>
                        default: return <>-</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (Number(data.friend_status)) {
                        case 3: return <>да</>
                        case 2: return <>подписан</>
                        case 1: return <>исходящяя заявка</>
                        default: return <>нет</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.can_write_private_message) {
                        case 1: return <>можно</>
                        default: return <>нельзя</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.can_post) {
                        case 1: return <>можно</>
                        default: return <>нельзя</>
                        }
                    })()}</td>
               </tr>
           })}
            </tbody>
        </table>
            </div>
            default:
                return <></>
            }
        })()} 
    
</>
  );


}

export default UserFollowersPage;