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
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { useParams } from 'react-router-dom';

const OtherIdentifikatorPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const {params} = useParams()
    const def = (params==='null'? null:JSON.parse(JSON.parse(params)))
    const [NameZapros, setNameZapros] = useState(def===null?'':def[0].name)
    const [name, setName] = useState(def===null?'':def[1].param)
    let [names, setNames] = useState(null)
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null)
    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    
    
    useEffect(() =>{
        console.log(def)
    },[])

    const Send = () =>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
            names =  String(name).split(',')
            setNames(names)
            let Name = (names===''? null:names)
            resolveScreenName(decodedData.token, Name).then(data=>setId(data)).finally(()=>setLoading(false))
        }else{
            setOpen_error(true)
        }
        
    }
    
    const [openError, setOpenError] = useState(false);
    const Save = async ()=>{
        const parameters = JSON.stringify([{'name': NameZapros}, {'param':name}])
        const data = await SaveHistory(JSON.stringify(id), NameZapros, parseInt(decodedData.id), parameters, 30)
        if(data.response==='no_error'){
            setOpen(true)
        }else{
            setOpenError(true)
        }
    }
  return (
    <>
    <div className='content con'>
        <h3 className='h'>Получение идентификатора из короткого имени</h3>
        <TextField className='text' defaultValue={NameZapros} id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
        <TextField className='text' defaultValue={name} id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите через запятую короткое имена" />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
    {(() => {
        switch (id!=null) {
        case true:
            return <>{id===''?
                <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                    :<><div className='content con'>
            <div className='shapka'>
                <div>
                    <label>Получено <label className='war'>{id.length}</label> идентификатора </label>
                </div>
                <div>
                    <CsvLink data={id} fileName={NameZapros} >
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
            <table className='table'>
                <thead>
                    <th>№</th>
                    <th>Короткое имя</th>
                    <th>ID</th>
                    <th>Тип</th>
                </thead>
                <tbody>
                    {id.map((data, index)=>{
                    return <tr>
                        <td>{index+1}</td>
                        <td>{names[index]}</td>
                        <td>{data.object_id}</td>
                        <td>{data.type}</td>
                    </tr>
                    })}
                </tbody>
            </table>
            </div>
            </>}</>
        default: return<></>
        }
        })()}
    </>
  );
}

export default OtherIdentifikatorPage;