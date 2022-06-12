
import React from 'react';
import { useLocation } from 'react-router-dom';
import StatisticApplicationPage from '../component/statistic/Application';
import StatisticGroupPage from '../component/statistic/Group';
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
  );
}

export default StatisticPage;