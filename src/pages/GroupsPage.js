
import React from 'react';
import { useLocation } from 'react-router-dom';
import GroupsSubscriptionPage from '../component/groups/Subscription';
import GroupsFollowersPage from '../component/groups/Followers';
import GroupsInfoPage from '../component/groups/Info';
import GroupsSearchPage from '../component/groups/Search';
import GroupsCatalogsPage from '../component/groups/Catalogs';
import GroupsCategoriesPage from '../component/groups/Categories';
import EventSearchPage from '../component/groups/SearchEvent';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const GroupsPage = () =>{
    const location = useLocation()

    return (
<>{localStorage.length!==0?
    <div className="content_wall">
        {console.log(location.pathname)}
        {(() => {
                switch (String(location.pathname).slice(0,16)) {
                case '/groups/get_subs':
                    return <GroupsSubscriptionPage/>
                case '/groups/get_foll':
                    return <GroupsFollowersPage/>
                case '/groups/get_info':
                    return <GroupsInfoPage/>
                case '/groups/search_g':
                    return <GroupsSearchPage/>
                case '/groups/search_e':
                    return <EventSearchPage/>
                case '/groups/get_cata':
                    return <GroupsCatalogsPage/>
                case '/groups/get_cate':
                    return <GroupsCategoriesPage/>
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

export default GroupsPage;