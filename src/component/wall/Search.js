import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { searchWall } from '../../http/API_wall';
import { resolveScreenName } from '../../http/API_other';
import LoadingButton from '@mui/lab/LoadingButton';

const WallSearchPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [name, setName] = useState(null)
    const [nameZapros, setNameZapros] = useState(null)
    const [nameZs, setNameZs] = useState(null)
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
        let Name = (nameZs===''? null:nameZs)
        const data = await searchWall(decodedData.token, ids, `"${Name}"`).finally(()=>setLoading(false))
        setInfo(data)
        let copy = []
        let arr = []
        
        if(data.response!==undefined){
            data.response.items.map(datas=>{
            if(datas.copy_history!=undefined){
                copy.push({...datas})
            }
            if(datas.attachments!=undefined){
                arr.push({...datas})
            }
        })
        }
        setCopy(copy)
        setMain(arr)
    }

  return (
<>
    <div className='content con'>
        <h3>Поиск записи</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите короткое имя пользователя или сообщества" />
        <TextField className='text' id="filled-basic" onChange={e=>setNameZs(e.target.value)} label="Введите запрос" />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
    {(() => {
        switch ((info!==null)&&(copyes!==null)&&(main!==null)) {
        case true:
            return <>{info.response===undefined?
            <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                :<>
            <div className='content con p'>
                <div className='shapka'>
                    <div>
                        <label>Получено записей <label className='war'>{info.response.count}</label></label>
                    </div>
                </div>
            <div>
            <h3 className='h'>Записи оставленные на стене</h3>
            <table className='table'>
                <thead>
                    <th>№</th>
                    <th>ID</th>
                    <th>ID владельца</th>
                    <th>ID альбома</th>
                    <th>Текст</th>
                    <th>Показы</th>
                    <th>Лайки</th>
                    <th>Комментарии</th>
                    <th>Репосты</th>
                </thead>
                <tbody>
                    {main.length===0?
                    <td colSpan='9'><h4 className='h'>Записей не найдено</h4></td>
                    :<>
                        {main.map((data, index)=>{
                            return <tr>
                                <td>{index+1}</td>
                                <td>{data.id}</td>
                                <td>{data.owner_id}</td>
                                <td>{data.attachments[0].photo.album_id}</td>
                                <td>{data.text}</td>
                                <td>
                                    {(() => {
                                        switch (data.views!=undefined) {
                                        case true: return <>{data.views.count}</>
                                        default: return <>-</>
                                        }
                                    })()}
                                </td>
                                <td>{data.likes.count}</td>
                                <td>{data.comments.count}</td>
                                <td>{data.reposts.count}</td>
                            </tr>
                        })}
                    </>
                    }
                </tbody>
            </table>
            <h3 className='h'>Репостнутые записи</h3>
                <table className='table'>
                <thead>
                    <th>№</th>
                    <th>ID</th>
                    <th>ID стены</th>
                    <th>Текст</th>
                    <th>Лайки</th>
                    <th>Комментарии</th>
                    <th>Репосты</th>
                    <th>Текст записи</th>
                    <th>ID владельца</th>
                </thead>
                <tbody>
                {copyes.length===0?
                    <td colSpan='9'><h4 className='h'>Записей не найдено</h4></td>
                    :<>
                    {copyes.map((data, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{data.id}</td>
                            <td>{data.owner_id}</td>
                            <td>{data.text}</td>
                            <td>{data.likes.count}</td>
                            <td>{data.comments.count}</td>
                            <td>{data.reposts.count}</td>
                            <td>{data.copy_history[0].text}</td>
                            <td>{data.copy_history[0].from_id}</td>
                        </tr>
                    })}
                 </>
                }
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

export default WallSearchPage;