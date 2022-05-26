
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import { getSubscriptions, login } from '../http/API';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import GroupsSubscriptionPage from '../component/groups/Subscription';

const GroupsPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const location = useLocation()
    const test1 = async() =>{
        console.log(decodedData.token)
        console.log()
        console.log(decodedData)
        const {data} = await getSubscriptions(decodedData.token, decodedData.user_id)
        //console.log(isxods['access_token'])
    }

  return (
    <div className="content content_wall">
        {/* <button onClick={()=>test1()}>fcgvhbjnk</button> */}
      
        {console.log(location.pathname)}
        {(() => {
                switch (location.pathname) {
                case '/groups/subscriptions':
                    return <GroupsSubscriptionPage/>
                default:
                    return <></>
                }
            })()}
        
    </div>
  );
}

export default GroupsPage;