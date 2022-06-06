
import React from 'react';
import { useLocation } from 'react-router-dom';
import WallInfoPage from '../component/wall/Info';
import WallSearchPage from '../component/wall/Search';
import WallRepostPage from '../component/wall/Repost';
import WallLikesPage from '../component/wall/Likes';


const WallPage = () =>{

    const location = useLocation()
    

  return (
    <div className="content_wall">
        {console.log(location.pathname)}
        {(() => {
                switch (location.pathname) {
                case '/wall/get_info':
                    return <WallInfoPage/>
                case '/wall/search':
                    return <WallSearchPage/>
                case '/wall/get_repost':
                    return <WallRepostPage/>
                case '/wall/get_likes':
                    return <WallLikesPage/>
                default:
                    return <></>
                }
            })()}
        
    </div>
  );
}

export default WallPage;