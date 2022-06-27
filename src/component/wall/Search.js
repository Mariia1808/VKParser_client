import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { searchWall } from '../../http/API_wall';
import { resolveScreenName } from '../../http/API_other';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import { SaveHistory } from '../../http/API_main';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { useParams } from 'react-router-dom';

const WallSearchPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const {params} = useParams()
    const def = (params==='null'? null:JSON.parse(JSON.parse(params)))

    const [name, setName] = useState(def===null?'':def[1].param)
    const [NameZapros, setNameZapros] = useState(def===null?'':def[0].name)
    const [nameZs, setNameZs] = useState(def===null?'':def[2].zapros)
    const [info, setInfo] = useState(null)
    const [copyes, setCopy] = useState(null)
    const [main, setMain] = useState(null)
    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
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
        }else{
            setOpen_error(true)
        }
    }

    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const Save = async (value)=>{
        const parameters = JSON.stringify([{'name': NameZapros}, {'param':name}, {'zapros':nameZs}])
        const data = await SaveHistory(JSON.stringify(main), NameZapros, parseInt(decodedData.id), parameters, 20)
        if(data.response==='no_error'){
            setOpen(true)
        }else{
            setOpenError(true)
        }
    }
    const [open1, setOpen1] = useState(false);
    const [openError1, setOpenError1] = useState(false);
    const Save1 = async (value)=>{
        const parameters = JSON.stringify([{'name': NameZapros}, {'param':name}, {'zapros':nameZs}])
        const data = await SaveHistory(JSON.stringify(copyes), NameZapros, parseInt(decodedData.id), parameters, 20)
        if(data.response==='no_error'){
            setOpen1(true)
        }else{
            setOpenError1(true)
        }
    }

  return (
<>
    <div className='content con'>
        <h3 className='zag h'>Поиск записи</h3>
        <TextField className='text' id="filled-basic" defaultValue={NameZapros} onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
        <TextField className='text' id="filled-basic" defaultValue={name} onChange={e=>setName(e.target.value)} label="Введите короткое имя пользователя или сообщества" />
        <TextField className='text' id="filled-basic" defaultValue={nameZs} onChange={e=>setNameZs(e.target.value)} label="Введите запрос" />
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
                        <label> Записи оставленные на стене <label className='war'>{main.length}</label></label>
                    </div>
                    <div>
                        <CsvLink data={main} fileName={NameZapros} >
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
                <Collapse in={openError}>
                        <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpenError(false);}}>
                            <CloseIcon fontSize="inherit" />
                            </IconButton>}sx={{ mb: 2 }}>
                            Пожалуйста повторите попытку позже.
                        </Alert>
                    </Collapse>
            <div>
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
                                <td>
                                    {(() => {
                                    switch (data.attachments!==undefined) {
                                    case true: return <>{(() => {
                                        switch (data.attachments[0].photo!==undefined) {
                                        case true: return <>{data.attachments[0].photo.album_id}</>
                                        default: return <></>
                                        }
                                    })()}
                                    </>
                                    default: return <>-</>
                                    }
                                })()}
                               </td>
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
                <div className='shapka'>
                    <div>
                        <label>Репостнутые записи <label className='war'>{copyes.length}</label></label>
                    </div>
                    <div>
                        <CsvLink data={copyes} fileName={NameZapros} >
                            <IconButton title='Экспорт' color="primary" variant="outlined">
                                <SaveAltIcon/>
                            </IconButton>
                        </CsvLink>
                        <IconButton title='Сохранить' color="primary" variant="outlined" onClick={()=>Save1()}><SaveAsIcon/></IconButton>
                        
                    </div>
                </div>
                <Collapse in={open1}>
                    <Alert action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen1(false);}}>
                        <CloseIcon fontSize="inherit" />
                        </IconButton>}sx={{ mb: 2 }}>
                            Запрос успешно сохранен
                    </Alert>
                </Collapse>
                <Collapse in={openError1}>
                        <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpenError1(false);}}>
                            <CloseIcon fontSize="inherit" />
                            </IconButton>}sx={{ mb: 2 }}>
                            Пожалуйста повторите попытку позже.
                        </Alert>
                    </Collapse>
            <h3 className='h'></h3>
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