import AuthPage from "./pages/AuthPage";
import CommentPage from "./pages/CommentsPage";
import GroupsPage from "./pages/GroupsPage";
import HistoryPage from "./pages/HistoryPage";
import MainPage from "./pages/MainPage";
import MediaPage from "./pages/MediaPage";
import OtherPage from "./pages/OtherPage";
import StatisticPage from "./pages/StatisticPage";
import UserPage from "./pages/UserPage";
import WallPage from "./pages/WallPage";
import { AUTH_ROUTE, COMMENTS_ABOUT_PHOTO, COMMENTS_ABOUT_VIDEO, COMMENTS_ABOUT_POST, GROUPS_GET_CATALOGS, GROUPS_GET_CATEGORIES, GROUPS_GET_FOLLOWERS, GROUPS_GET_INFO, GROUPS_GET_SUBSCRIPTIONS, GROUPS_SEARCH, MAIN_ROUTE, MEDIA_GET_INFO_ALBOM_VIDEO, MEDIA_GET_INFO_PHOTO, MEDIA_GET_INFO_VIDEO, MEDIA_SEARCH_VIDEO, MEDIA_SEARCH_PHOTO, USER_GET_FOLLOWERS, USER_GET_INFO, USER_GET_SUBSCRIPTIONS, USER_SEARCH, WALL_GET_INFO, WALL_GET_LIKES, WALL_GET_REPOST, WALL_SEARCH, STATISTIC_GET_LINK, STATISTIC_POST, OTHER_GET_COUNTRY, OTHER_GET_REGIONS, OTHER_GET_CITY, OTHER_GET_UNIVERSITES, OTHER_GET_FACULTIES, OTHER_GET_IDENTIFIKATOR, OTHER_GET_SHOLD_LINK, STATISTIC_APPLICATION, STATISTIC_GROUP, GROUPS_SEARCH_EVENT, HISTORY_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path:MAIN_ROUTE+'?:code',
        Component: MainPage
    },
    {
        path:AUTH_ROUTE,
        Component:AuthPage
    },
    {
        path:HISTORY_ROUTE,
        Component:HistoryPage
    },
    {
        path:USER_GET_INFO+'/:params',
        Component:UserPage
    },
    {
        path:USER_GET_FOLLOWERS+'/:params',
        Component:UserPage
    },
    {
        path:USER_GET_SUBSCRIPTIONS+'/:params',
        Component:UserPage
    },
    {
        path:USER_SEARCH+'/:params',
        Component:UserPage
    },
    {
        path:COMMENTS_ABOUT_POST+'/:params',
        Component:CommentPage
    },
    {
        path:COMMENTS_ABOUT_PHOTO+'/:params',
        Component:CommentPage
    },
    {
        path:COMMENTS_ABOUT_VIDEO+'/:params',
        Component:CommentPage
    },
    {
        path:GROUPS_GET_SUBSCRIPTIONS+'/:params',
        Component:GroupsPage
    },
    {
        path:GROUPS_GET_FOLLOWERS+'/:params',
        Component:GroupsPage
    },
    {
        path:GROUPS_GET_INFO+'/:params',
        Component:GroupsPage
    },
    {
        path:GROUPS_SEARCH+'/:params',
        Component:GroupsPage
    },
    {
        path:GROUPS_SEARCH_EVENT+'/:params',
        Component:GroupsPage
    },

    {
        path:GROUPS_GET_CATALOGS+'/:params',
        Component:GroupsPage
    },
    {
        path:GROUPS_GET_CATEGORIES+'/:params',
        Component:GroupsPage
    },
    {
        path:MEDIA_GET_INFO_PHOTO+'/:params',
        Component:MediaPage
    },
    {
        path:MEDIA_GET_INFO_VIDEO+'/:params',
        Component:MediaPage
    },
    {
        path:MEDIA_GET_INFO_ALBOM_VIDEO+'/:params',
        Component:MediaPage
    },
    {
        path:MEDIA_SEARCH_VIDEO+'/:params',
        Component:MediaPage
    },
    {
        path:MEDIA_SEARCH_PHOTO+'/:params',
        Component:MediaPage
    },
    {
        path:WALL_GET_INFO+'/:params',
        Component:WallPage
    },
    {
        path:WALL_GET_LIKES+'/:params',
        Component:WallPage
    },
    {
        path:WALL_GET_REPOST+'/:params',
        Component:WallPage
    },
    {
        path:WALL_SEARCH+'/:params',
        Component:WallPage
    },
    {
        path:STATISTIC_GET_LINK+'/:params',
        Component:StatisticPage
    },
    {
        path:STATISTIC_APPLICATION+'/:params',
        Component:StatisticPage
    },
    {
        path:STATISTIC_GROUP+'/:params',
        Component:StatisticPage
    },
    {
        path:STATISTIC_POST+'/:params',
        Component:StatisticPage
    },
    {
        path:OTHER_GET_COUNTRY+'/:params',
        Component:OtherPage
    },
    {
        path:OTHER_GET_REGIONS+'/:params',
        Component:OtherPage
    },
    {
        path:OTHER_GET_CITY+'/:params',
        Component:OtherPage
    },
    {
        path:OTHER_GET_UNIVERSITES+'/:params',
        Component:OtherPage
    },
    {
        path:OTHER_GET_FACULTIES+'/:params',
        Component:OtherPage
    },
    {
        path:OTHER_GET_IDENTIFIKATOR+'/:params',
        Component:OtherPage,
    },

    {
        path:OTHER_GET_SHOLD_LINK+'/:params',
        Component:OtherPage
    },
]