
import React from 'react';
import { useLocation } from 'react-router-dom';
import StatisticApplicationPage from '../component/statistic/Application';
import StatisticGroupPage from '../component/statistic/Group';
import StatisticLinkPage from '../component/statistic/Link';
import StatisticPostPage from '../component/statistic/Post';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';


const StatisticPage = () =>{

    const location = useLocation()
    

  return (
<>{localStorage.length!==0?
    <div className="content_wall">
        {console.log(location.pathname)}
        {(() => {
                switch (location.pathname) {
                case '/statistic/get_post':
                    return <StatisticPostPage/>
                case '/statistic/get_application':
                    return <StatisticApplicationPage/>
                case '/statistic/get_group':
                    return <StatisticGroupPage/>
                case '/statistic/get_link':
                    return <StatisticLinkPage/>
                default:
                    return <></>
                }
            })()}
        
    </div>
    :
    <div className="content content_wall c">
        <label>Перед началом работы необходимо авторизоваться.</label><br/>
        <Button className='button' variant="outlined" endIcon={<LoginIcon />}><a href='https://oauth.vk.com/authorize?client_id=8143523&revoke=1&redirect_uri=http://localhost:3000/main&display=page&scope=friends,offline,photos,audio,video,wall,groups,email,stats,ads,market&response_type=code'>Вход</a></Button>
        <br/><label><label className='war'>ВАЖНО:</label> необходимо передоставить права ко всем пунктам, в том числе к email.
        Даже если ваш текущий email другой, он необходим для создания личного кабинета.</label>
    </div>
 }
</>
  );
}

export default StatisticPage;