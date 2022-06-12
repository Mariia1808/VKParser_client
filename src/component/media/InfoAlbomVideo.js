import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { resolveScreenName } from '../../http/API_other';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import { SaveHistory } from '../../http/API_main';
import { getAlbumById } from '../../http/API_media';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const MediaInfoAlbomVideoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [NameZapros, setNameZapros] = useState(null)
    const [Albom, setAlbom] = useState(null)
    const [ID, setID] = useState(null)
    const [info, setInfo] = useState(null)

    const Send = async () =>{
        let ids = ``
        const id = await resolveScreenName(decodedData.token, ID)
        console.log(ids)
        getAlbumById(decodedData.token, id[0].object_id, Albom).then(data=>setInfo(data))
    }

    const Save =()=>{
        SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id)).then()
    }

    const Delete = () =>{
        setInfo(null)
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Информация об альбоме с видео</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
            <TextField className='text' id="filled-basic" onChange={e=>setID(e.target.value)} label="Введите короткое имя пользователя или сообщаства" />
            <div className='div1'>
            <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
            Продолжить  
            </Button>
        </div>
    </div>
    {(() => {
    switch (info!=null) {
        case true:
            return <div className='content w'>
            <div className='shapka'>
                <div>
                    <label>Найденно альбомов: </label><label className='war'>{info.response.count}</label>
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
                <th>Название</th>
                <th>ID владельца</th>
                <th>Кол-во видео</th>
            </thead>
            <tbody>
            {info.response.items.map((data, index)=>{
                return <tr>
                    <td>{index+1}</td>
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.owner_id}</td>
                    <td>{data.count}</td>
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

export default MediaInfoAlbomVideoPage;