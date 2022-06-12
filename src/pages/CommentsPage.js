
import React from 'react';
import { useLocation } from 'react-router-dom';
import CommentAboutPhotoPage from '../component/comments/AboutPhoto';
import CommentAboutVideoPage from '../component/comments/AboutVideo';
import CommentAboutPostPage from '../component/comments/AboutPost';

const CommentPage = () =>{

    const location = useLocation()
    

  return (
    <div className="content_wall">
        {console.log(location.pathname)}
        {(() => {
                switch (location.pathname) {
                case '/comments/about_post':
                    return <CommentAboutPostPage/>
                case '/comments/about_photo':
                    return <CommentAboutPhotoPage/>
                case '/comments/about_video':
                    return <CommentAboutVideoPage/>
                default:
                    return <></>
                }
            })()}
        
    </div>
  );
}

export default CommentPage;