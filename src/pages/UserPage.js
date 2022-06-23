
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import UserSubscriptionPage from '../component/user/Subscription';
import UserInfoPage from '../component/user/Info';
import UserFollowersPage from '../component/user/Followers';
import UserSearchPage from '../component/user/Search';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const UserPage = () =>{

    const location = useLocation()
    const toNavigate=useNavigate()

  return (
    <>{localStorage.length!==0?
        <div className="content_wall">
            {console.log(location.pathname)}
            
            {(() => {
                    switch (String(location.pathname).slice(0,12)) {
                    case '/user/get_su':
                        return <UserSubscriptionPage/>
                    case '/user/get_in':
                        return <UserInfoPage/>
                    case '/user/get_fo':
                        return <UserFollowersPage/>
                    case '/user/search':
                        return <UserSearchPage/>
                    default:
                        return <></>
                    }
                })()}
            
        </div>
         :
            <div className="content content_wall c">
                <label>Перед началом работы необходимо авторизоваться.</label><br/>
                <Button className='button' variant="outlined" endIcon={<LoginIcon />}><a href='https://oauth.vk.com/authorize?client_id=8143523&revoke=1&redirect_uri=https://parservkontakte.netlify.app/main&display=page&scope=friends,offline,photos,audio,video,wall,groups,email,stats,ads,market&response_type=code'>Вход</a></Button>
                <br/><label><label className='war'>ВАЖНО:</label> необходимо передоставить права ко всем пунктам, в том числе к email.
                Даже если ваш текущий email другой, он необходим для создания личного кабинета.</label>
            </div>
         }
    </>
  );
}

export default UserPage;