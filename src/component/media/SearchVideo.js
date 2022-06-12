import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import { SaveHistory } from '../../http/API_main';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Select from 'react-select';
import { searchVideo } from '../../http/API_media';


const MediaSearchVideoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [NameZapros, setNameZapros] = useState(null)
    const [Name, setName] = useState(null)
    const [info, setInfo] = useState(null)
    const [selectedOptionSort, setSelectedOptionSort] = useState(null)
    let sort = [{value: '0', label:'по дате добавления видеозаписи'},{value: '1' , label:'по длительности'},{value: '2', label:'по релевантности'},{value: '3' , label:'по количеству просмотров'}]
   
    const Send =()=>{
        searchVideo(decodedData.token, Name, selectedOptionSort.value).then(data=>setInfo(data))
    }

    const Save =()=>{
        SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id)).then()
    }

    const Delete = () =>{
        setInfo(null)
    }

  return (
    <div className='content con'>
        <h3 className='h'>Поиск видео</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите поисковый запрос" />
        <Select className='select' placeholder='Сортировка' defaultValue={selectedOptionSort} onChange={setSelectedOptionSort} options={sort} closeMenuOnSelect={false} />
        <div className='div1'>
            <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
            Продолжить  
            </Button>
        </div>
        
    </div>
  );
}

export default MediaSearchVideoPage;