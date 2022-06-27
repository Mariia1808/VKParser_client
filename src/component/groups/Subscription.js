
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
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { useParams } from 'react-router-dom';


const GroupsSubscriptionPage = () =>{

    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const {params} = useParams()
    const def = (params==='null'? null:JSON.parse(JSON.parse(params)))

    const [selectedOption, setSelectedOption] = useState(def===null?'':def[2].select)
    const [selectedOptionT, setSelectedOptionT] = useState(def===null?'':def[3].selectT)
    let fields = [{value: 'education,universities,schools,career,', label:'Образование'},
    {value: 'can_be_invited_group,can_see_all_posts,can_see_audio,can_send_friend_request,blacklisted,blacklisted_by_me', label:'Приватность'},
    {value: 'nickname,relation,relatives,timezone,maiden_name,military,home_town,verified,followers_count,country,site,personal,about', label:'Общее'},
    {value: 'books,movies,music,games,interests,tv,activities', label:'Интересы'},
    {value: 'common_count,connections,contacts,crop_photo,domain,exports,quotes,has_photo,has_mobile,,photo_100,status,is_favorite,occupation,online,photo_id', label:'Прочее'}]

    let type = [{value:'null', label:'Всех'},{value: 'friends' , label:'Друзья'},{value:'unsure', label:'Возможно пойду'},{value:'donut', label:'VK Donut'},]

    const [name, setName] = useState(def===null?'':def[1].param)
    const [NameZapros, setNameZapros] = useState(def===null?'':def[0].name)
    const [info, setInfo] = useState(null)
    const [error, setError] = useState(null)
    
    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send = async () =>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
        let field = `bdate,can_post,city,screen_name,friend_status,can_write_private_message,sex,`
        console.log(field)
        if(selectedOption!=null)
        {selectedOption.map((data,index)=> field=field+String(data.value)+',')}
        let Name = (name===''? null:name)
      
        let SelectedOptionT = (selectedOptionT===null? null:selectedOptionT.value)
        await getMembers(decodedData.token, Name, field, SelectedOptionT).then(data=> setInfo(data)).finally(()=>setLoading(false))
        }else{
            setOpen_error(true)
        }
        console.log(info)
    }

    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const Save = async ()=>{
        const parameters = JSON.stringify([{'name': NameZapros}, {'param':name}, {'select':selectedOption}, {'selectT':selectedOptionT}])
        const data = await SaveHistory(JSON.stringify(info), NameZapros, parseInt(decodedData.id), parameters, 8)
        if(data.response==='no_error'){
            setOpen(true)
        }else{
            setOpenError(true)
        }
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Подписчики сообщества</h3>
        <div>
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
            <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedOptionT} onChange={setSelectedOptionT} options={type} closeMenuOnSelect={false} />
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
                return <div className='content con p'>
                <div className='shapka'>
                    <div>
                        <label>Число пользователей: </label><label className='war'>{info.length}</label>
                    </div>
                    <div>
                        <CsvLink data={info} fileName={NameZapros} >
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
                {info.map((data, index)=>{
                    return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td>{data.screen_name}</td>
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