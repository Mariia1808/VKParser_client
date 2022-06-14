import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getWall } from '../../http/API_wall';
import { resolveScreenName } from '../../http/API_other';
import SendIcon from '@mui/icons-material/Send';
import Select from 'react-select';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import { SaveHistory } from '../../http/API_main';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';


const WallInfoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    let data = [{value: 'owner', label:'От владельца'},{value: 'others' , label:'От других'},{value:'all', label:'Все записи'}]

    const [name, setName] = useState(null)
    const [info, setInfo] = useState(null)
    const [copyes, setCopy] = useState(null)
    const [main, setMain] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [error, setError] = useState(null)
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
            let SelectedOption = (selectedOption===null? null:selectedOption.value)

            const data = await getWall(decodedData.token, ids, SelectedOption).finally(()=>setLoading(false))
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
    const Save = async ()=>{
        const data = await SaveHistory(JSON.stringify(main), NameZapros, parseInt(decodedData.id))
        if(data.response==='no_error'){
            setOpen(true)
        }
    }
    const [open1, setOpen1] = useState(false);
    const Save1 = async ()=>{
        const data = await SaveHistory(JSON.stringify(copyes), NameZapros, parseInt(decodedData.id))
        if(data.response==='no_error'){
            setOpen1(true)
        }
    }

  return (
<>
    <div className='content con'>
        <h3>Расширенная информация о записях</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите короткое имя пользователя или сообщества" />
        <Select className='select' placeholder='Выберите какие записи необходимо вернуть' defaultValue={selectedOption} onChange={setSelectedOption} options={data} closeMenuOnSelect={false} />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
    {(() => {
        switch ((info!=null)&&(copyes!=null)&&(main!=null)) {
        case true:
            return <>{info.response===undefined?
            <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                :<>
            <div className='content con p'>
                <div className='shapka'>
                    <div>
                        <label>Записи оставленные на стене <label className='war'>{main.length}</label></label>
                    </div>
                    <div>
                        <CsvLink data={main} fileName={NameZapros} >
                            <IconButton color="primary" variant="outlined">
                                <SaveAltIcon/>
                            </IconButton>
                        </CsvLink>
                        <IconButton color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
                        
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
                <div className='shapka'>
                    <div>
                        <label>Репостнутые записи <label className='war'>{copyes.length}</label></label>
                    </div>
                    <div>
                        <CsvLink data={copyes} fileName={NameZapros} >
                            <IconButton color="primary" variant="outlined">
                                <SaveAltIcon/>
                            </IconButton>
                        </CsvLink>
                        <IconButton color="primary" variant="outlined" onClick={()=>Save1()}><SaveAsIcon/></IconButton>
                        
                    </div>
                </div>
                <Collapse in={open1}>
                    <Alert action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen1(false);}}>
                        <CloseIcon fontSize="inherit" />
                        </IconButton>}sx={{ mb: 2 }}>
                            Запрос успешно сохранен
                    </Alert>
                </Collapse>
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

export default WallInfoPage;