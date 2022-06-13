import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getLastShortenedLink } from '../../http/API_other';
import LoadingButton from '@mui/lab/LoadingButton';

const OtherSholdLinkPage = () =>{
    const [link, setLink] = useState(null)
    useEffect(() =>{
        const storedToken = localStorage.getItem("token");
        let decodedData = jwt_decode(storedToken);
        getLastShortenedLink(decodedData.token).then(data => setLink(data))
    },[])

  return (
    <div className='content w'>
        <h3 className='h'>Сокращенные ссылки</h3>
        {(() => {
        switch (link!=null) {
            case true:
                return <>{link.response===undefined?
                    <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                        :<><label>Найдено <label className='war'>{link.response.count}</label> сокращенные ссылки </label>
                <table className='table'>
                    <thead>
                        <th>№</th>
                        <th>Ключ</th>
                        <th>Сокр. ссылка</th>
                        <th>Адрес</th>
                        <th>Показы</th>
                    </thead>
                    <tbody>
                        {link.response.items.map((data, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{data.key}</td>
                            <td><a href={data.short_url}>{data.short_url}</a></td>
                            <td><a href={data.url}>{data.url}</a></td>
                            <td>{data.views}</td>
                        </tr>
                        })}
                    </tbody>
                </table>
                </>}</>
         default: return<></>
    }
    })()}
    
    </div>
  );
}

export default OtherSholdLinkPage;