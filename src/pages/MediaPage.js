
import React from 'react';
import { useLocation } from 'react-router-dom';
import MediaInfoPhotoPage from '../component/media/InfoPhoto';
import MediaSearchPhotoPage from '../component/media/SearchPhoto';
import MediaSearchVideoPage from '../component/media/SearchVideo';
import MediaInfoVideoPage from '../component/media/InfoVideo';
import MediaInfoAlbomVideoPage from '../component/media/InfoAlbomVideo';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const MediaPage = () =>{

    const location = useLocation()
    

  return (
<>{localStorage.length!==0?
    <div className="content_wall">
        {console.log(location.pathname)}
        {(() => {
                switch (location.pathname) {
                case '/media/get_info_photo':
                    return <MediaInfoPhotoPage/>
                case '/media/search_photo':
                    return <MediaSearchPhotoPage/>
                case '/media/get_info_video':
                    return <MediaInfoVideoPage/>
                case '/media/search_video':
                    return <MediaSearchVideoPage/>
                case '/media/get_info_albom_video':
                    return <MediaInfoAlbomVideoPage/>
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

export default MediaPage;