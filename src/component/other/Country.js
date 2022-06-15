import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getCountries } from '../../http/API_other';
import LoadingButton from '@mui/lab/LoadingButton';

const OtherCountryPage = () =>{
    // const storedToken = localStorage.getItem("token");
    // let decodedData = jwt_decode(storedToken);

    const [country, setCountry] = useState(null)

    useEffect(() =>{
        const storedToken = localStorage.getItem("token");
        let decodedData = jwt_decode(storedToken);
        getCountries(decodedData.token).then(data => setCountry(data))
    },[])

return (
    <div className='content con'>
        <h3 className='h'>Страны</h3>
        {(() => {
        switch (country!=null) {
            case true:
                return <><label>Найдено <label className='war'>{country.response.count}</label> страны </label>
                <table className='table'>
                    <thead>
                        <th>№</th>
                        <th>ID Страны</th>
                        <th>Название</th>
                    </thead>
                    <tbody>
                        {country.response.items.map((data, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{data.id}</td>
                            <td>{data.title}</td>
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

export default OtherCountryPage;