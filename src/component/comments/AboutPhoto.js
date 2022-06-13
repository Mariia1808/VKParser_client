import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { resolveScreenName } from '../../http/API_other';
import { getCommentsPhotos } from '../../http/API_comments';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

const CommentAboutPhotoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [name, setName] = useState(null)
    const [photo_id, setPhoto] = useState(null)
    const [info, setInfo] = useState(null)
    const [copyes, setCopy] = useState(null)
    const [main, setMain] = useState(null)

    const [loading, setLoading]=useState(false)
    const Send = async () =>{
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
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Комментарии к фото</h3>
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
                </div>
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