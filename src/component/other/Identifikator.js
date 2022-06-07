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

const OtherIdentifikatorPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [NameZapros, setNameZapros] = useState(null)
    const [name, setName] = useState(null)
    let [names, setNames] = useState(null)
    const [id, setId] = useState(null)
    const Send = () =>{
        names =  String(name).split(',')
        setNames(names)
        resolveScreenName(decodedData.token, name).then(data=>setId(data))
    }
    const Save =()=>{
        SaveHistory(JSON.stringify(id), NameZapros, parseInt(decodedData.id)).then()
    }
  return (
    <>
    <div className='content con'>
        <h3>Получение идентификатора из короткого имени</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" variant="standard" />
        <div className='div1'>
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите через запятую короткое имена" variant="standard" />
            <Button className='menu_but button' variant="outlined" onClick={()=>Send()}>
                <SendIcon/>
            </Button>
        </div>
    </div>
    {(() => {
        switch (id!=null) {
        case true:
            return <div className='content con'>
            <div className='shapka'>
                <div>
                    <label>Получено <label className='war'>{id.length}</label> идентификатора </label>
                </div>
                <div>
                    <CsvLink data={id} fileName={NameZapros} >
                        <IconButton color="primary" variant="outlined">
                            <SaveAltIcon/>
                        </IconButton>
                    </CsvLink>
                    <IconButton color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
                </div>
            </div>
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
        default: return<></>
        }
        })()}
    </>
  );
}

export default OtherIdentifikatorPage;