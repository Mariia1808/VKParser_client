import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { resolveScreenName } from '../../http/API_other';
import { getRepostsWall } from '../../http/API_wall';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import { SaveHistory } from '../../http/API_main';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';


const WallRepostPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [name, setName] = useState(null)
    const [post_id, setPost] = useState(null)
    const [info, setInfo] = useState(null)
    const [copyes, setCopy] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [main, setMain] = useState(null)
    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send = async () =>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
            setInfo(null)
            let ids=``
            const id = await resolveScreenName(decodedData.token, name)
            if(id!==''){
                if(id[0].type==='group'){
                    ids = `-`+ id[0].object_id
                }else if(id[0].type==='user'){
                    ids = id[0].object_id
                }
            }else{
                ids=null
            }
            let Post_id = (post_id===''? null:post_id)
            const data = await getRepostsWall(decodedData.token, ids, Post_id).finally(()=>setLoading(false))
            setInfo(data)
            let copy = []
            let arr = []
            
            if(data.response!==undefined){
                data.response.groups.map(datas=>{
                if(datas!=undefined){
                    copy.push({...datas})
                }})
                data.response.profiles.map(datas=>{
                if(datas!=undefined){
                    arr.push({...datas})
                }
            })
            }
            console.log(copy)
            setCopy(copy)
            setMain(arr)
        }else{
            setOpen_error(true)
        }
    }
        const [open, setOpen] = useState(false)
        const Save = async ()=>{
            const data = await SaveHistory(JSON.stringify(main), NameZapros, parseInt(decodedData.id))
            if(data.response==='no_error'){
                setOpen(true)
            }
        }
        const [open1, setOpen1] = useState(false)
        const Save1 = async ()=>{
            const data = await SaveHistory(JSON.stringify(copyes), NameZapros, parseInt(decodedData.id))
            if(data.response==='no_error'){
                setOpen1(true)
            }
        }
  return (
<>
    <div className='content con'>
        <h3 className='h zag'>Информация о репостах записи</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите короткое имя пользователя или сообщества" />
        <TextField className='text' id="filled-basic" onChange={e=>setPost(e.target.value)} label="Введите идентификатор записи" />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
    {(() => {
        switch ((info!==null)&&(copyes!==null)&&(main!==null)) {
        case true:
            return <>{info.response===undefined?
            <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                :<>
            <div className='content con'>
                <div className='shapka'>
                    <div>
                        <label>Пользователей, которые репостнули запись <label className='war'>{info.response.profiles.length}</label></label>
                    </div>
                    <div>
                        <CsvLink data={main} fileName={NameZapros} >
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
            <div>
            <table className='table'>
                <thead>
                    <th>№</th>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Короткое имя</th>
                    <th>Пол</th>
                </thead>
                <tbody>
                    {main.length===0?
                    <td colSpan='9'><h4 className='h'>Записей не найдено</h4></td>
                    :<>
                    {main.map((data, index)=>{
                        return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td>{data.first_name}</td>
                        <td>{data.last_name}</td>
                        <td>{data.screen_name}</td>
                        <td>{(() => {
                            switch (data.sex) {
                            case 1: return <>Женский</>
                            case 2: return <>Мужской</>
                            default: return <>-</>
                            }
                        })()}</td>
                        </tr>
                    })}
                    </>
                    }
                </tbody>
            </table>
                <div className='shapka'>
                    <div>
                        <label>Сообществ, которые репостнули запись <label className='war'>{info.response.groups.length}</label></label>
                    </div>
                    <div>
                        <CsvLink data={copyes} fileName={NameZapros} >
                            <IconButton title='Экспорт' color="primary" variant="outlined">
                                <SaveAltIcon/>
                            </IconButton>
                        </CsvLink>
                        <IconButton title='Сохранить' color="primary" variant="outlined" onClick={()=>Save1()}><SaveAsIcon/></IconButton>
                        
                    </div>
                </div>
                <Collapse in={open1}>
                    <Alert action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen1(false);}}>
                        <CloseIcon fontSize="inherit" />
                        </IconButton>}sx={{ mb: 2 }}>
                            Запрос успешно сохранен
                    </Alert>
                </Collapse>
                <table className='table'>
                <thead>
                    <th>№</th>
                    <th>id</th>
                    <th>Короткое имя</th>
                    <th>Имя</th>
                    <th>Тип</th>
                    <th>Приватность</th>
                    <th>Администратор</th>
                    <th>Подписчик</th>
                    <th>Рекламодатель</th>
                </thead>
                <tbody>
                {copyes.length===0?
                    <td colSpan='9'><h4 className='h'>Записей не найдено</h4></td>
                    :<>
                    {copyes.map((data, index)=>{
                        return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td>{data.screen_name}</td>
                        <td>{data.name}</td>
                        <td>{(() => {
                            switch (data.type) {
                            case 'group': return <>Группа</>
                            case 'page': return <>Публичная страница</>
                            case 'event': return <>Мероприятие</>
                            default: return <>-</>
                            }
                            })()}</td>
                        <td>{(() => {
                            switch (data.is_closed) {
                            case 0: return <>Открытое</>
                            case 1: return <>Закрытое</>
                            case 2: return <>Частное</>
                            default: return <>-</>
                            }
                        })()}</td>
                        <td>{(() => {
                            switch (data.is_admin) {
                            case 0: return <>Нет</>
                            case 1: return <>Да</>
                            default: return <>-</>
                            }
                        })()}</td>
                        <td>{(() => {
                            switch (data.is_member) {
                            case 0: return <>Нет</>
                            case 1: return <>Да</>
                            default: return <>-</>
                            }
                        })()}</td>
                        <td>{(() => {
                            switch (data.is_advertiser) {
                            case 0: return <>Нет</>
                            case 1: return <>Да</>
                            default: return <>-</>
                            }
                        })()}</td>
                    </tr>
                    })} 
                 </>
                }
                </tbody>
                
            </table>
            </div>
        </div>
        </>}</>
        default: return<></>
        }
    })()}
</>
  );
}

export default WallRepostPage;