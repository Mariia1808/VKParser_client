import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { delete_history, get } from '../http/API_main';
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

const HistoryPage = () =>{
    
    
    let decodedData = null
    const toNavigate = useNavigate()
    const [history, setHistory] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        if(localStorage.length!==0){
            const storedToken = localStorage.getItem("token");
            decodedData = jwt_decode(storedToken);
            get(decodedData.user_id).then(data => setHistory(data)).finally(()=>setLoading(false))
        }
       
    },[])

    const[T, setT]=useState(false)
    const Delete = async (id) =>{
        const storedToken = localStorage.getItem("token");
        decodedData = jwt_decode(storedToken);
        await delete_history(id)
        get(decodedData.user_id).then(data => setHistory(data))
        setT(true)
    }

    const Return = (url, params) =>{
        console.log(url)
        console.log(JSON.parse(params))
        const par = JSON.stringify(params)
        toNavigate(url+'/'+ encodeURI(par))
    }

    return (
<>{localStorage.length!==0?
    <div className="content content_wall pad">
        {(() => {
            switch (loading) {
                case true:
                    return <Skeleton variant="rectangular" width={500} height={300} >
                        Идет загрузка...
                    </Skeleton>
                case false: return<></>
                default: return<></>
            }
            })()}
       {(() => {
        switch ((history!==null)&&(history.length!==0)) {
            case true:
                return <>{history.count===0?
                <>Вы еще ничего не сохранили</>
                :
                <>
                <label>Найдено <label className='war'>{history[0]}</label> сохраненных запросов</label>
                <table className='table'>
                    <thead>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Название</th>
                        <th colSpan={2}>Метод</th>
                    </thead>
                    <tbody>
                        {history[1].map((data, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{String(data.createdAt).slice(0,10)}</td>
                            <td>{data.zapros}</td>
                            <td>{history[2][index].name}</td>
                            <td>
                                <CsvLink data={data.itog} fileName={data.zapros} >
                                    <IconButton title='Экспорт' color="primary" variant="outlined">
                                        <SaveAltIcon/>
                                    </IconButton>
                                </CsvLink>
                                <IconButton color="primary" title='Повторить запрос' variant="outlined" onClick={()=>Return(history[2][index].method, history[3][index].parameters)}>
                                    <RestoreIcon/>
                                </IconButton>
                                <IconButton color="primary" title='Удалить' variant="outlined" onClick={()=>Delete(data.id)}>
                                    <DeleteForever/>
                                </IconButton>
                            </td>
                        </tr>
                        })}
                    </tbody>
                </table>
                </>}
            </>
         default: return<></>
    }
    })()}
    </div>
    :
    <div className="content content_wall c">
        <label>Перед началом работы необходимо авторизоваться.</label><br/>
        <Button className='button' variant="outlined" endIcon={<LoginIcon />}><a href='https://oauth.vk.com/authorize?client_id=8143523&revoke=1&redirect_uri=https://parservkontakte.netlify.app/main&display=page&scope=friends,offline,photos,audio,video,wall,groups,email,stats,ads,market&response_type=code'>Вход</a></Button>
        <br/><label><label className='war'>ВАЖНО:</label> необходимо передоставить права ко всем пунктам, в том числе к email.
        Даже если ваш текущий email другой, он необходим для создания личного кабинета.</label>
    </div>
 }
</>
  );
}

export default HistoryPage;