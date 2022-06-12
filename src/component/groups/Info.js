import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getById } from '../../http/API_groups';
import { SaveHistory } from '../../http/API_main';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';

const GroupsInfoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [name, setName] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [info, setInfo] = useState(null)
    
    const Send = () =>{
        let field = `activity, ban_info, can_post,can_see_all_posts,city,contacts,counters,country,cover,description,finish_date,fixed_post,links,members_count,place,site,start_date,status,verified,wiki_page`
        console.log(decodedData.token)
        getById(decodedData.token, name, field).then(data=>setInfo(data))
        console.log(info)
    }

    const Delete = () =>{
        setInfo(null)
        setName('')
        setNameZapros('')
    }

    const Save =()=>{
        SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id)).then()
    }
  return (
    <>
    <div className='content con'>
        <h3 className='h'>Расширенная информация о сообществе</h3>
        <div >
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите идентификатор или короткое имя" />
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
                        <label>Число сообществ: </label><label className='war'>{info.response.length}</label>
                    </div>
                    <div>
                        <CsvLink data={info.response} fileName={NameZapros} >
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
                    <th>Название</th>
                    <th>Тематика</th>
                    <th>Тип</th>
                    <th>Кол-во подписчиков</th>
                    <th>Приватность сообщества</th>
                    <th>Оставить запись</th>
                </thead>
                <tbody>
                {info.response.map((data, index)=>{
                    return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td><>{data.screen_name}</></td>
                        <td>{data.name}</td>
                        <td>{data.activity}</td>
                        <td>{(() => {
                                switch (data.type) {
                                case 'group': return <>Группа</>
                                case 'page': return <>Публичная страница</>
                                case 'event': return <>Мероприятие</>
                                default: return <>-</>
                                }
                            })()}</td>
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

export default GroupsInfoPage;