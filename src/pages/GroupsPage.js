
import React from 'react';
import { useLocation } from 'react-router-dom';
import GroupsSubscriptionPage from '../component/groups/Subscription';
import GroupsFollowersPage from '../component/groups/Followers';
import GroupsInfoPage from '../component/groups/Info';
import GroupsSearchPage from '../component/groups/Search';
import GroupsCatalogsPage from '../component/groups/Catalogs';
import GroupsCategoriesPage from '../component/groups/Categories';

const GroupsPage = () =>{
    const location = useLocation()

    return (
    <div className="content_wall">
        {console.log(location.pathname)}
        {(() => {
                switch (location.pathname) {
                case '/groups/get_subscriptions':
                    return <GroupsSubscriptionPage/>
                case '/groups/get_followers':
                    return <GroupsFollowersPage/>
                case '/groups/get_info':
                    return <GroupsInfoPage/>
                case '/groups/search':
                    return <GroupsSearchPage/>
                case '/groups/get_catalogs':
                    return <GroupsCatalogsPage/>
                case '/groups/get_categories':
                    return <GroupsCategoriesPage/>
                default:
                    return <></>
                }
            })()}
        
    </div>
  );
}

export default GroupsPage;