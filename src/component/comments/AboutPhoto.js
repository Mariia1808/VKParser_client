import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { resolveScreenName } from '../../http/API_other';
import { getCommentsPhotos } from '../../http/API_comments';
import SendIcon from '@mui/icons-material/Send';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import { SaveHistory } from '../../http/API_main';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

const CommentAboutPhotoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [name, setName] = useState(null)
    const [photo_id, setPhoto] = useState(null)
    const [info, setInfo] = useState(null)
    const [copyes, setCopy] = useState(null)
    const [main, setMain] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [open_error, setOpen_error] = useState(false);
    const [loading, setLoading]=useState(false)
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
            let Photo_id = (photo_id===''? null:photo_id)
            const data = await getCommentsPhotos(decodedData.token, ids, Photo_id).finally(()=>setLoading(false))
            setInfo(data)
        }else{
            setOpen_error(true)
        }

        
    }
        const [open, setOpen] = useState(false);
        const Save = async ()=>{
            const data = await SaveHistory(JSON.stringify(info.response.items), NameZapros, parseInt(decodedData.id))
            if(data.response==='no_error'){
                setOpen(true)
            }
        }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Комментарии к фото</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите короткое имя пользователя или сообщества" />
        <TextField className='text' id="filled-basic" onChange={e=>setPhoto(e.target.value)} label="Введите идентификатор фотографии" />
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
                :<>
            <div className='content con p'>
                <div className='shapka'>
                    <div>
                        <label>Получено комментариев <label className='war'>{info.response.count}</label></label>
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
            <div>
            <table className='table'>
                <thead>
                    <th>№</th>
                    <th>ID</th>
                    <th>ID комменатора</th>
                    <th>Текст</th>
                    <th>Лайки</th>
                    <th>Вложения</th>
                    <th>В ответ на комментарий</th>
                    <th>В ответ пользователю</th>
                </thead>
                <tbody>
                    {info.response.items.map((data, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{data.id}</td>
                            <td>{data.from_id}</td>
                            <td>{data.text}</td>
                            <td>{data.likes.count}</td>
                            <td>
                                {(() => {
                                    switch (data.attachments!==undefined) {
                                    case true: return <>{(() => {
                                        switch (data.attachments[0].sticker!==undefined) {
                                        case true: return <img src={data.attachments[0].sticker.images[0].url}/>
                                        default: return <></>
                                        }
                                    })()}
                                    {(() => {
                                        switch (data.attachments[0].photo!==undefined) {
                                        case true: return <img src={data.attachments[0].photo.sizes[0].url}/>
                                        default: return <></>
                                        }
                                    })()}</>
                                    default: return <>-</>
                                    }
                                })()}
                            </td>
                            <td>
                                {(() => {
                                    switch (data.reply_to_comment!=undefined) {
                                    case true: return <>{data.reply_to_comment}</>
                                    default: return <>-</>
                                    }
                                })()}
                            </td>
                            <td>
                                {(() => {
                                    switch (data.reply_to_user!=undefined) {
                                    case true: return <>{data.reply_to_user}</>
                                    default: return <>-</>
                                    }
                                })()}
                            </td>
                        </tr>
                    })}
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

export default CommentAboutPhotoPage;