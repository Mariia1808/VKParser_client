
import React from 'react';
import { useLocation } from 'react-router-dom';
import MediaInfoPhotoPage from '../component/media/InfoPhoto';
import MediaSearchPhotoPage from '../component/media/SearchPhoto';
import MediaSearchVideoPage from '../component/media/SearchVideo';
import MediaInfoVideoPage from '../component/media/InfoVideo';
import MediaInfoAlbomVideoPage from '../component/media/InfoAlbomVideo';


const MediaPage = () =>{

    const location = useLocation()
    

  return (
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
  );
}

export default MediaPage;