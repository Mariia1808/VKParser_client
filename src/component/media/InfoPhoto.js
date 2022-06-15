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
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';


const MediaInfoPhotoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [NameZapros, setNameZapros] = useState(null)
    const [name, setName] = useState(null)
    const [photo, setPhoto] = useState(null)

    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send = () =>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
            let Name = (name===''? null:name)
        getInfoPhoto(decodedData.token, Name).then(data=>setPhoto(data)).finally(()=>setLoading(false))
        }else{
            setOpen_error(true)
        }
    }

    const [open, setOpen] = useState(false);
    const Save = async ()=>{
        const data = await SaveHistory(JSON.stringify(photo.response), NameZapros, parseInt(decodedData.id))
        if(data.response==='no_error'){
            setOpen(true)
        }
    }


  return (
<>
    <div className='content con'>
        <h3 className='h'>Информация о фото</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите через запятую идентификаторы фотографий" />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
    {(() => {
        switch (photo!=null) {
        case true:
            return <>{photo.response===undefined?
                <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                    :<><div className='content con'>
                <div className='shapka'>
                    <div> 
                        <label>Получено фотографий <label className='war'>{photo.response.length}</label>  </label>
                    </div>
                    <div>
                        <CsvLink data={photo.response} fileName={NameZapros} >
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
                    <th>ID</th>
                    <th>ID альбома</th>
                    <th>Фото</th>
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
                        <td>{data.album_id}</td>
                        <td><img src={data.sizes[0].url}/></td>
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
            </>}</>
        default: return<></>
        }
        })()}
</>  );
}

export default MediaInfoPhotoPage;