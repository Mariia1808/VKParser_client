
import React from 'react';
import { useLocation } from 'react-router-dom';
import StatisticGroupApplicationPage from '../component/statistic/GroupApplication';
import StatisticLinkPage from '../component/statistic/Link';
import StatisticPostPage from '../component/statistic/Post';



const StatisticPage = () =>{

    const location = useLocation()
    

  return (
    <div className="content_wall">
        {console.log(location.pathname)}
        {(() => {
                switch (location.pathname) {
                case '/statistic/get_post':
                    return <StatisticPostPage/>
                case '/statistic/get_group_application':
                    return <StatisticGroupApplicationPage/>
                case '/statistic/get_link':
                    return <StatisticLinkPage/>
                default:
                    return <></>
                }
            })()}
        
    </div>
  );
}

export default StatisticPage;