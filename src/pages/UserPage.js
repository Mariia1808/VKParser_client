
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import { getSubscriptions, login } from '../http/API';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import UserSubscriptionPage from '../component/user/Subscription';
import UserInfoPage from '../component/user/Info';
import UserFollowersPage from '../component/user/Followers';
import UserSearchPage from '../component/user/Search';


const UserPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const location = useLocation()
    

  return (
    <div className="content content_wall">
        {console.log(location.pathname)}
        {(() => {
                switch (location.pathname) {
                case '/user/get_subscriptions':
                    return <UserSubscriptionPage/>
                case '/user/get_info':
                    return <UserInfoPage/>
                case '/user/get_followers':
                    return <UserFollowersPage/>
                case '/user/search':
                    return <UserSearchPage/>
                default:
                    return <></>
                }
            })()}
        
    </div>
  );
}

export default UserPage;