import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getInfoVideo } from '../../http/API_media';
import { SaveHistory } from '../../http/API_main';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { resolveScreenName } from '../../http/API_other';

const MediaInfoVideoPage = () =>{

    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [NameZapros, setNameZapros] = useState(null)
    const [Albom, setAlbom] = useState(null)
    const [ID, setID] = useState(null)
    const [Video, setVideo] = useState(null)
    const [info, setInfo] = useState(null)
    const [T, setT] = useState(false)

    const Send = async () =>{
        let ids = ``
        console.log(Video)
        if(Video===''){setVideo(null) 
            setT(true)}
        if(Albom===''){setAlbom(null) 
            setT(true)}
        const id = await resolveScreenName(decodedData.token, ID)
        if(id[0].type==='group'){
            ids = `-`+ id[0].object_id
        }else if(id[0].type==='user'){
            ids = id[0].object_id
        }
        if(ID===null){
            ids = null
        }
        console.log(ids)
        getInfoVideo(decodedData.token, ids, Albom).then(data=>setInfo(data))
    }

    const Save =()=>{
        SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id)).then()
    }

    const Delete = () =>{
        setInfo(null)
        setAlbom(null)
        setID(null)
        setNameZapros(null)
        setVideo(null)
        setT(null)
    }

  return (
<>
    <div className='content con' >
        <h3 className='h'>Информация о видео</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
        <TextField className='text' id="filled-basic" onChange={e=>setID(e.target.value)} label="Введите короткое имя пользователя или сообщества" />
        {/* <TextField className='text' id="filled-basic" onChange={e=>setVideo(e.target.value)} label="Введите идентификаторы видеозаписей" /> */}
            <TextField className='text' id="filled-basic" onChange={e=>setAlbom(e.target.value)} label="Введите идентификатор альбома" />
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
                    <label>Найденно видеозаписей: </label><label className='war'>{info.response.count}</label>
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
                <th>Описание</th>
                <th>Тип</th>
                <th>Лайки</th>
                <th>Комментарии</th>
                <th>Репосты</th>
                <th>Просмотры</th>
            </thead>
            <tbody>
            {info.response.items.map((data, index)=>{
                return <tr>
                    <td>{index+1}</td>
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td>{(() => {
                        switch (data.type) {
                        case 'video': return <>Видео</>
                        case 'music_video': return <>Клип</>
                        case 'movie': return <>Фильм</>
                        default: return <>-</>
                        }
                        })()}</td>
                    <td>{data.likes.count}</td>
                    <td>{data.comments}</td>
                    <td>{data.reposts.count}</td>
                    <td>{data.views}</td>
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

export default MediaInfoVideoPage;