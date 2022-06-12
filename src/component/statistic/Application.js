import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { statsAppAll } from '../../http/API_statictics';


const StatisticApplicationPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [name, setName] = useState(null)
    const [info, setInfo] = useState(null)

    const Send = () =>{
        statsAppAll(decodedData.token, name).then(data=>setInfo(data))
    }
    
  return (
    <div className='content con'>
        <h3 className='h'>Статистика приложения</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите идентификатор приложения" />
        <div className='div1'>
            <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
            Продолжить  
            </Button>
        </div>
        
    </div>
  );
}

export default StatisticApplicationPage;