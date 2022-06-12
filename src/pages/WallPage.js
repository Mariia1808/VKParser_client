
import React from 'react';
import { useLocation } from 'react-router-dom';
import WallInfoPage from '../component/wall/Info';
import WallSearchPage from '../component/wall/Search';
import WallRepostPage from '../component/wall/Repost';


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
                default:
                    return <></>
                }
            })()}
        
    </div>
  );
}

export default WallPage;