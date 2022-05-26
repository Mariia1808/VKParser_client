import AuthPage from "./pages/AuthPage";
import GroupsPage from "./pages/GroupsPage";
import MainPage from "./pages/MainPage";
import UserPage from "./pages/UserPage";
import { AUTH_ROUTE, GROUPS_SUBSCRIPTIONS, MAIN_ROUTE, USER_GET_FOLLOWERS, USER_GET_INFO, USER_GET_SUBSCRIPTIONS, USER_SEARCH } from "./utils/consts";

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
        path:GROUPS_SUBSCRIPTIONS,
        Component:GroupsPage
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
    }
]