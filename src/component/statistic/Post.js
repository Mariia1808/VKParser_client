import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';


const StatisticPostPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

  return (
    <div className='content con'>
        <h3 className='h'>Статистика записи</h3>
        
        
    </div>
  );
}

export default StatisticPostPage;