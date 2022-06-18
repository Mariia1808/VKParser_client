
import React from 'react';
import { useLocation } from 'react-router-dom';
import CommentAboutPhotoPage from '../component/comments/AboutPhoto';
import CommentAboutVideoPage from '../component/comments/AboutVideo';
import CommentAboutPostPage from '../component/comments/AboutPost';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const CommentPage = () =>{

    const location = useLocation()
    

  return (
<>{localStorage.length!==0?
    <div className="content_wall">
        {console.log(location.pathname)}
        {(() => {
                switch (String(location.pathname).slice(0,20)) {
                case '/comments/about_post':
                    return <CommentAboutPostPage/>
                case '/comments/about_phot':
                    return <CommentAboutPhotoPage/>
                case '/comments/about_vide':
                    return <CommentAboutVideoPage/>
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

export default CommentPage;