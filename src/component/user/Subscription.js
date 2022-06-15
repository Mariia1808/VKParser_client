
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
import { getSubscriptions } from '../../http/API_user';
import { SaveHistory } from '../../http/API_main';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';





const UserSubscriptionPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const location = useLocation()
    
    const field = 'about,activities,bdate,blacklisted,blacklisted_by_mebooks,can_post,can_see_all_posts,can_see_audio,can_send_friend_request,can_write_private_message,career,city,common_count,connections,contacts,country,crop_photo,domain,education,exports,followers_count,friend_status,games,has_mobile,has_photo,home_town,interests,is_favorite,is_friend,is_hidden_from_feed,last_seen,lists,maiden_name,military,movies,music,nickname,occupation,online,personal,photo_id,photo_max,photo_max_orig,quotes,relation,relatives,schools,screen_name,sex,site,status,timezone,tv,universities,verified,wall_comments'+
    'activity,can_create_topic,can_post,can_see_all_posts,city,contacts,counters,country,description,finish_date,fixed_post,links,place,site,start_date,status,verified,wiki_page'

    const [selectedOption, setSelectedOption] = useState(null)

    let data = [{value: 'about,activities,bdate,blacklisted,blacklisted_by_mebooks,can_post,can_see_all_posts',label:'Основные'},
    {value: 'can_see_audio,can_send_friend_request,can_write_private_message,career,city,common_count',label:'Дополнительные'}]

    const [name, setName] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [info, setInfo] = useState(null)
    const [error, setError] = useState(null)

    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send = () =>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
        let field = `members_count,`
        console.log(field)
        if(selectedOption!=null)
        {selectedOption.map((data,index)=> field=field+String(data.value)+',')}
        let Name = (name===''? null:name)
        getSubscriptions(decodedData.token, Name, field).then(data=>setInfo(data)).finally(()=>setLoading(false))
        }else{
            setOpen_error(true)
        }
        console.log(info)
    }
    const Delete = () =>{
        setInfo(null)
        setName('')
        setNameZapros('')
        setSelectedOption(null)
    }
    const [open, setOpen] = useState(false);
    const Save = async ()=>{
        const data = await SaveHistory(JSON.stringify(info.response.items), NameZapros, parseInt(decodedData.id))
        if(data.response==='no_error'){
            setOpen(true)
        }
    }

return (
<>
    <div className='content con'>
        <h3 className='h'>Подписки пользователя</h3>
        <div >
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
            <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
            </Collapse>
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите идентификатор или короткое имя" />
            <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
            </div>
        </div>
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
                return <>{info.response===undefined?
                    <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                        :<><div className='content con w'>
                <div className='shapka'>
                    <div>
                        <label>Найденное количество подписок: </label><label className='war'>{info.response.count}</label>
                    </div>
                    <div>
                        <CsvLink data={info.response.items} fileName={NameZapros} >
                            <IconButton title='Экспорт' color="primary" variant="outlined">
                                <SaveAltIcon/>
                            </IconButton>
                        </CsvLink>
                        <IconButton title='Сохранить' color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
    
                    </div>
                </div>
                <Collapse in={open}>
                    <Alert action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen(false);}}>
                        <CloseIcon fontSize="inherit" />
                        </IconButton>}sx={{ mb: 2 }}>
                            Запрос успешно сохранен
                    </Alert>
                </Collapse>
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
                </table>
            </div>
            </>}</>
            default:
                return <></>
            }
        })()} 
    
</>
  );
}

export default UserSubscriptionPage;