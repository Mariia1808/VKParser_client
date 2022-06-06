import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getCountries } from '../../http/API_other';


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
        <h3>Страны</h3>
        
        
    </div>
  );
}

export default OtherCountryPage;