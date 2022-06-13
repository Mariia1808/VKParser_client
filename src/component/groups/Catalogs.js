import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getCatalogInfo } from '../../http/API_groups';
import LoadingButton from '@mui/lab/LoadingButton';

const GroupsCatalogsPage = () =>{
    const [info, setInfo] = useState(null)

    useEffect(() =>{
        const storedToken = localStorage.getItem("token");
        let decodedData = jwt_decode(storedToken);
        getCatalogInfo(decodedData.token).then(data => setInfo(data))
    },[])

  return (
    <div className='content con'>
        <h3 className='h'>Список каталогов сообщества</h3>
        {(() => {
        switch (info!=null) {
            case true:
                return <><label>Найдено <label className='war'>{info.response.categories.length}</label> каталога </label>
                <table className='table'>
                    <thead>
                        <th>№</th>
                        <th>ID</th>
                        <th>Название</th>
                    </thead>
                    <tbody>
                        {info.response.categories.map((data, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                        </tr>
                        })}
                    </tbody>
                </table>
            </>
         default: return<></>
    }
    })()}
        
    </div>
  );
}

export default GroupsCatalogsPage;