
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getMembers } from '../../http/API_groups';
import { SaveHistory } from '../../http/API_main';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import Select from 'react-select';

const GroupsSubscriptionPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedOptionT, setSelectedOptionT] = useState(null)

    let data = [{value: 'activities,about,blacklisted,blacklisted_by_me,books,bdate,can_be_invited_group,can_post,can_see_all_posts,can_see_audio',label:'Основные'},
    {value: 'can_send_friend_request,can_write_private_message,career,common_count,connections,contacts,city,country,crop_photo,domain,education,exports',label:'Дополнительные'},
    {value: 'followers_count,friend_status,has_photo,has_mobile,home_town,photo_100,site,schools,screen_name,status,verified,games,interests,is_favorite',label:'Дополнительные1'},
    {value: 'is_friend,is_hidden_from_feed,last_seen,maiden_name,military,movies,music,nickname,occupation,online,personal,photo_id,photo_max,photo_max_orig',label:'Дополнительные2'},
    {value: 'quotes,relation,relatives,timezone,tv,universities',label:'Дополнительные3'}]


    let type = [{value:'', label:'Всех'},{value: 'friends' , label:'Друзья'},{value:'unsure', label:'Возможно пойду'},{value:'donut', label:'VK Donut'},]

    const [name, setName] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [info, setInfo] = useState(null)
    const [error, setError] = useState(null)
    
    const Send = () =>{
        let field = `bdate,can_post,city,screen_name,friend_status,can_write_private_message,sex,`
        console.log(field)
        if(selectedOption!=null)
        {selectedOption.map((data,index)=> field=field+String(data.value)+',')}
        getMembers(decodedData.token, name, field, selectedOptionT).then(data=> setInfo(data))
        console.log(info)
    }

    const Save =()=>{
        SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id)).then()
    }

    const Delete =()=>{
        
    }


  return (
<>
    <div className='content con'>
        <h3 className='h'>Подписчики сообщества</h3>
        <div>
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите идентификатор или короткое имя" />
            <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedOption} onChange={setSelectedOption} options={data} isMulti closeMenuOnSelect={false} />
                <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedOptionT} onChange={setSelectedOptionT} options={type} closeMenuOnSelect={false} />
                <div className='div1'>
            <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
            Продолжить  
            </Button>
        </div>
        </div>
    </div>
    {(() => {
        switch (info!=null) {
            case true:
                return <div className='content con w'>
                <div className='shapka'>
                    <div>
                        <label>Число пользователей: </label><label className='war'>{info.length}</label>
                    </div>
                    <div>
                        <CsvLink data={info} fileName={NameZapros} >
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
                {info.map((data, index)=>{
                    return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td><>{data.screen_name}</></td>
                        <td>{data.first_name}</td>
                        <td>{data.last_name}</td>
                        <td>{(() => {
                                switch (data.sex) {
                                case 1: return <>Женский</>
                                case 2: return <>Мужской</>
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

export default GroupsSubscriptionPage;