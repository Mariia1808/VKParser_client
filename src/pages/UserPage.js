
import React from 'react';
import { useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import UserSubscriptionPage from '../component/user/Subscription';
import UserInfoPage from '../component/user/Info';
import UserFollowersPage from '../component/user/Followers';
import UserSearchPage from '../component/user/Search';


const UserPage = () =>{

    const location = useLocation()
    

  return (
    <div className="content_wall">
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