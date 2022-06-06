
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const GroupsSubscriptionPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const Send = async() =>{
        console.log(decodedData.token)
        console.log()
        console.log(decodedData)

    }

  return (
    <div className='content con'>
        <h3>Подписчики сообщества</h3>
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <Button className='menu_but button' variant="outlined" onClick={()=>Send()}>
            <SendIcon/>
        </Button>
    </div>
  );
}

export default GroupsSubscriptionPage;