import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getInfoPhoto } from '../../http/API_media';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import { SaveHistory } from '../../http/API_main';

const MediaInfoPhotoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [NameZapros, setNameZapros] = useState(null)
    const [name, setName] = useState(null)
    const [photo, setPhoto] = useState(null)

    const Send = () =>{
        getInfoPhoto(decodedData.token, name).then(data=>setPhoto(data))
    }

    const Save =()=>{
        SaveHistory(JSON.stringify(photo.response), NameZapros, parseInt(decodedData.id)).then()
    }


  return (
<>
    <div className='content con'>
        <h3>Информация о фото</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" variant="standard" />
        <div className='div1'>
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите через запятую короткое имена" variant="standard" />
            <Button className='menu_but button' variant="outlined" onClick={()=>Send()}>
                <SendIcon/>
            </Button>
        </div>
    </div>
    {(() => {
        switch (photo!=null) {
        case true:
            return <div className='content con'>
                <div className='shapka'>
                    <div>
                        <label>Получено <label className='war'>{photo.response.length}</label> идентификатора </label>
                    </div>
                    <div>
                        <CsvLink data={photo.response} fileName={NameZapros} >
                            <IconButton color="primary" variant="outlined">
                                <SaveAltIcon/>
                            </IconButton>
                        </CsvLink>
                        <IconButton color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
                    </div>
                </div>
            <table className='table'>
                <thead>
                    <th>№</th>
                    <th>ID</th>
                    <th>Текст</th>
                    <th>Теги</th>
                    <th>Лайки</th>
                    <th>Комментарии</th>
                    <th>Репосты</th>
                </thead>
                <tbody>
                    {photo.response.map((data, index)=>{
                    return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td>{data.text}</td>
                        <td>{data.tags.count}</td>
                        <td>{data.likes.count}</td>
                        <td>{data.comments.count}</td>
                        <td>{data.reposts.count}</td>
                    </tr>
                    })}
                </tbody>
            </table>
            </div>
        default: return<></>
        }
        })()}
</>  );
}

export default MediaInfoPhotoPage;