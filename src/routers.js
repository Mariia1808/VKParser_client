import AuthPage from "./pages/AuthPage";
import CommentPage from "./pages/CommentsPage";
import GroupsPage from "./pages/GroupsPage";
import MainPage from "./pages/MainPage";
import MediaPage from "./pages/MediaPage";
import OtherPage from "./pages/OtherPage";
import StatisticPage from "./pages/StatisticPage";
import UserPage from "./pages/UserPage";
import WallPage from "./pages/WallPage";
import { AUTH_ROUTE, COMMENTS_ABOUT_PHOTO, COMMENTS_ABOUT_VIDEO, COMMENTS_GET_INFO, GROUPS_GET_CATALOGS, GROUPS_GET_CATEGORIES, GROUPS_GET_FOLLOWERS, GROUPS_GET_INFO, GROUPS_GET_SUBSCRIPTIONS, GROUPS_SEARCH, MAIN_ROUTE, MEDIA_GET_INFO_ALBOM_VIDEO, MEDIA_GET_INFO_PHOTO, MEDIA_GET_INFO_VIDEO, MEDIA_SEARCH_VIDEO, MEDIA_SEARCH_PHOTO, USER_GET_FOLLOWERS, USER_GET_INFO, USER_GET_SUBSCRIPTIONS, USER_SEARCH, WALL_GET_INFO, WALL_GET_LIKES, WALL_GET_REPOST, WALL_SEARCH, STATISTIC_GET_LINK, STATISTIC_GROUP_APPLICATION, STATISTIC_POST, OTHER_GET_COUNTRY, OTHER_GET_REGIONS, OTHER_GET_CITY, OTHER_GET_UNIVERSITES, OTHER_GET_FACULTIES, OTHER_GET_IDENTIFIKATOR, OTHER_GET_SHOLD_LINK } from "./utils/consts";

export const publicRoutes = [
    {
        path:MAIN_ROUTE,
        Component: MainPage
    },
    {
        path:AUTH_ROUTE,
        Component:AuthPage
    },
    {
        path:USER_GET_INFO,
        Component:UserPage
    },
    {
        path:USER_GET_FOLLOWERS,
        Component:UserPage
    },
    {
        path:USER_GET_SUBSCRIPTIONS,
        Component:UserPage
    },
    {
        path:USER_SEARCH,
        Component:UserPage
    },
    {
        path:COMMENTS_GET_INFO,
        Component:CommentPage
    },
    {
        path:COMMENTS_ABOUT_PHOTO,
        Component:CommentPage
    },
    {
        path:COMMENTS_ABOUT_VIDEO,
        Component:CommentPage
    },
    {
        path:GROUPS_GET_SUBSCRIPTIONS,
        Component:GroupsPage
    },
    {
        path:GROUPS_GET_FOLLOWERS,
        Component:GroupsPage
    },
    {
        path:GROUPS_GET_INFO,
        Component:GroupsPage
    },
    {
        path:GROUPS_SEARCH,
        Component:GroupsPage
    },

    {
        path:GROUPS_GET_CATALOGS,
        Component:GroupsPage
    },
    {
        path:GROUPS_GET_CATEGORIES,
        Component:GroupsPage
    },
    {
        path:MEDIA_GET_INFO_PHOTO,
        Component:MediaPage
    },
    {
        path:MEDIA_GET_INFO_VIDEO,
        Component:MediaPage
    },
    {
        path:MEDIA_GET_INFO_ALBOM_VIDEO,
        Component:MediaPage
    },
    {
        path:MEDIA_SEARCH_VIDEO,
        Component:MediaPage
    },
    {
        path:MEDIA_SEARCH_PHOTO,
        Component:MediaPage
    },
    {
        path:WALL_GET_INFO,
        Component:WallPage
    },
    {
        path:WALL_GET_LIKES,
        Component:WallPage
    },
    {
        path:WALL_GET_REPOST,
        Component:WallPage
    },
    {
        path:WALL_SEARCH,
        Component:WallPage
    },
    {
        path:STATISTIC_GET_LINK,
        Component:StatisticPage
    },
    {
        path:STATISTIC_GROUP_APPLICATION,
        Component:StatisticPage
    },
    {
        path:STATISTIC_POST,
        Component:StatisticPage
    },
    {
        path:OTHER_GET_COUNTRY,
        Component:OtherPage
    },
    {
        path:OTHER_GET_REGIONS,
        Component:OtherPage
    },
    {
        path:OTHER_GET_CITY,
        Component:OtherPage
    },
    {
        path:OTHER_GET_UNIVERSITES,
        Component:OtherPage
    },
    {
        path:OTHER_GET_FACULTIES,
        Component:OtherPage
    },
    {
        path:OTHER_GET_IDENTIFIKATOR,
        Component:OtherPage
    },

    {
        path:OTHER_GET_SHOLD_LINK,
        Component:OtherPage
    },
]