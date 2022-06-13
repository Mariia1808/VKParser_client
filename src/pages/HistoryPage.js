import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { delete_history, get } from '../http/API_main';
import DeleteForever from '@mui/icons-material/DeleteForever';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';

const HistoryPage = () =>{
    
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [history, setHistory] = useState(null)

    useEffect(() =>{
        get(decodedData.user_id).then(data => setHistory(data))
    },[])

    const[T, setT]=useState(false)
    const Delete = async (id) =>{
        delete_history(id)
        get(decodedData.user_id).then(data => setHistory(data))
        setT(true)
    }

    return (
    <div className="content content_wall">
       {(() => {
        switch (history!=null) {
            case true:
                return <>{history.count===0?
                <>Вы еще ничего не сохранили</>
                :
                <>
                <label>Найдено <label className='war'>{history.count}</label> сохраненных запросов</label>
                <table className='table'>
                    <thead>
                        <th>№</th>
                        <th>Дата</th>
                        <th colSpan={2}>Название</th>
                    </thead>
                    <tbody>
                        {history.rows.map((data, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{String(data.createdAt).slice(0,10)}</td>
                            <td>{data.zapros}</td>
                            <td>
                                <CsvLink data={data.itog} fileName={data.zapros} >
                                    <IconButton color="primary" variant="outlined">
                                        <SaveAltIcon/>
                                    </IconButton>
                                </CsvLink>
                                <IconButton color="primary" variant="outlined" onClick={()=>Delete(data.id)}>
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
  );
}

export default HistoryPage;