
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';


const UserFollowersPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const location = useLocation()

    const {params} = useParams()
    const def = (params==='null'? null:JSON.parse(JSON.parse(params)))
    
    const [selectedOption, setSelectedOption] = useState(def===null?'':def[2].fields)
    let fields = [{value: 'education,universities,schools,career,', label:'Образование'},
    {value: 'can_be_invited_group,can_see_all_posts,can_see_audio,can_send_friend_request,blacklisted,blacklisted_by_me', label:'Приватность'},
    {value: 'nickname,relation,relatives,timezone,maiden_name,military,home_town,verified,followers_count,country,site,personal,about', label:'Общее'},
    {value: 'books,movies,music,games,interests,tv,activities', label:'Интересы'},
    {value: 'common_count,connections,contacts,crop_photo,domain,exports,quotes,has_photo,has_mobile,,photo_100,status,is_favorite,occupation,online,photo_id', label:'Прочее'}]

    const [name, setName] = useState(def===null?'':def[1].param)
    const [NameZapros, setNameZapros] = useState(def===null?'':def[0].name)
    const [info, setInfo] = useState(null)
    const [open_error, setOpen_error] = useState(false)

    const [loading, setLoading]=useState(false)
    const Send = () =>{
        setLoading(true)
        let field = `bdate,can_post,city,screen_name,friend_status,can_write_private_message,sex,`
        console.log(field)
        if(selectedOption!=='')
        {selectedOption.map((data,index)=> field=field+String(data.value)+',')}
        let Name = (name===''? null:name)
        getUser_followers(decodedData.token, Name, field).then(data=>setInfo(data)).finally(()=>setLoading(false))
        console.log(info)
    }

    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const Save = async ()=>{
        const parameters = JSON.stringify([{'name': NameZapros}, {'param':name}, {'fields':selectedOption}])
        const data = await SaveHistory(JSON.stringify(info.response.items), NameZapros, parseInt(decodedData.id), parameters, 1)
        if(data.response==='no_error'){
            setOpen(true)
        }else{
            setOpenError(true)
        }
    }

  return (
    <>
    <div className='content con'>
        <h3 className='h'>Подписчики пользователя</h3>
        <div >
            <TextField className='text' id="filled-basic" defaultValue={NameZapros} onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
            <Collapse in={open_error}>
                <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                    <CloseIcon fontSize="inherit" />
                    </IconButton>}sx={{ mb: 2 }}>
                    Вы не ввели название запроса
                </Alert>
            </Collapse>
            <TextField className='text' defaultValue={name} id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите идентификатор или короткое имя" />
             <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedOption} onChange={setSelectedOption} options={fields} isMulti closeMenuOnSelect={false} />
             <div className='div1'>
             <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
        </div>
    </div>
        {(() => {
        switch (info!=null) {
            case true:
                return <>{info.response===undefined?
                    <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                        :<><div className='content con w'>
                <div className='shapka'>
                    <div>
                        <label>Найденное количество подписичков: </label><label className='war'>{info.response.count}</label>
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
                <Collapse in={openError}>
                        <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpenError(false);}}>
                            <CloseIcon fontSize="inherit" />
                            </IconButton>}sx={{ mb: 2 }}>
                            Пожалуйста повторите попытку позже.
                        </Alert>
                    </Collapse>
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
                   <td>{data.screen_name}</td>
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
            </>}</>
            default:
                return <></>
            }
        })()} 
    
</>
  );


}

export default UserFollowersPage;