import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { statsAppAll } from '../../http/API_statictics';
import LoadingButton from '@mui/lab/LoadingButton';

const StatisticApplicationPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [name, setName] = useState(null)
    const [info, setInfo] = useState(null)

    const [loading, setLoading]=useState(false)
    const Send = () =>{
        setLoading(true)
        let Name = (name===''? null:name)
        statsAppAll(decodedData.token, Name).then(data=>setInfo(data)).finally(()=>setLoading(false))
    }
    
  return (
    <div className='content con'>
        <h3 className='h'>Статистика приложения</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите идентификатор приложения" />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
        
    </div>
  );
}

export default StatisticApplicationPage;