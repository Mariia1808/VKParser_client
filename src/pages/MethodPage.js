import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { createMethod, deleteMethods, delete_history, get, getAllMethods, updateMethods } from '../http/API_main';
import DeleteForever from '@mui/icons-material/DeleteForever';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import RestoreIcon from '@mui/icons-material/Restore';
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

const MethodPage = () =>{
    
    
    let decodedData = null
    const toNavigate = useNavigate()
    const [history, setHistory] = useState(null) 
    const [name, setName] = useState(null) 
    const [method0, setMethod0] = useState(null) 
    const [NewMethod, setNewMethod] = useState(null)
    const [NewName, setNewName] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() =>{
        if(localStorage.length!==0){
            const storedToken = localStorage.getItem("token");
            decodedData = jwt_decode(storedToken);
            getAllMethods().then(data => setHistory(data))
        }
       
    },[])

    
    const Delete = async (id) =>{
        await deleteMethods(id).then()
        getAllMethods().then(data => setHistory(data))
    }
    
    const Upgrate = async (id) =>{
        await updateMethods(id, NewName, NewMethod).then()
        getAllMethods().then(data => setHistory(data))
    }

    const Save = async () =>{
        await createMethod(name, method0).then()
        getAllMethods().then(data => setHistory(data))
    }

    
    return (
<>
    <div className="content content_wall pad">
        <TextField className='text' id="filled-basic" defaultValue={name} onChange={e=>setName(e.target.value)} label="Введите название запроса*" />
        <TextField className='text' id="filled-basic" defaultValue={method0} onChange={e=>setMethod0(e.target.value)} label="Введите метод" />
        <div className='div1'>
        <LoadingButton onClick={()=>Save()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
            Сохранить
        </LoadingButton>
        </div>
    </div>
        {(() => {
        switch (history!=null) {
        case true:
            return <>{history.count===0?
            <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                :<>
            <div className='content con p'>
                <div className='shapka'>
                    <div>
                        <label>Всего методов <label className='war'>{history.count}</label></label>
                    </div>
                </div>
            <table className='table'>
                <thead>
                    <th>№</th>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Метод</th>
                    <th></th>
                </thead>
                <tbody>
                    {history.rows.map((data, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{data.ID}</td>
                            <td><TextField className='text' defaultValue={data.name} onChange={e=>setNewName(e.target.value)} id="filled-basic"/></td>
                            <td><TextField className='text' defaultValue={data.method} onChange={e=>setNewMethod(e.target.value)} id="filled-basic"/></td>
                            <td>
                            <IconButton title='Обновить' color="primary" variant="outlined" onClick={()=>Upgrate(data.ID)}><RestoreIcon/></IconButton>
                            <IconButton title='Удалить' color="primary" variant="outlined" onClick={()=>Delete(data.ID)}><DeleteForever/></IconButton>
                            </td>
                            
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

export default MethodPage;