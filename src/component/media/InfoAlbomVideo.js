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
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { useParams } from 'react-router-dom';


const MediaInfoAlbomVideoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const {params} = useParams()
    const def = (params==='null'? null:JSON.parse(JSON.parse(params)))

    const [NameZapros, setNameZapros] = useState(def===null?'':def[0].name)
    const [Albom, setAlbom] = useState(null)
    const [ID, setID] = useState(def===null?'':def[1].param)
    const [info, setInfo] = useState(null)

    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send = async () =>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
        let ids = ``
        const id = await resolveScreenName(decodedData.token, ID)

        if(id!==''){
            ids=id[0].object_id
        }else{
            ids=null
        }
        let albom = (Albom===''? null:Albom)
        getAlbumById(decodedData.token, ids, albom).then(data=>setInfo(data)).finally(()=>setLoading(false))
        }else{
            setOpen_error(true)
        }
    }

    const [open, setOpen] = useState(false);
    const Save = async ()=>{
        const parameters = JSON.stringify([{'name': NameZapros}, {'param': ID}])
        const data = await SaveHistory(JSON.stringify(info.response.items), NameZapros, parseInt(decodedData.id), parameters, 18)
        if(data.response==='no_error'){
            setOpen(true)
        }
    }

    const Delete = () =>{
        setInfo(null)
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Информация об альбоме с видео</h3>
        <TextField className='text' id="filled-basic" defaultValue={NameZapros} onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
            <TextField className='text' id="filled-basic" defaultValue={ID} onChange={e=>setID(e.target.value)} label="Введите короткое имя пользователя или сообщаства" />
            <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
    {(() => {
    switch (info!=null) {
        case true:
            return <>{info.response===undefined?
                <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                    :<><div className='content w'>
            <div className='shapka'>
                <div>
                    <label>Найденно альбомов: </label><label className='war'>{info.response.count}</label>
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
        </>}</>
        default:
            return <></>
        }
    })()} 
</>
  );
}

export default MediaInfoAlbomVideoPage;