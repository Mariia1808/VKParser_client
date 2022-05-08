import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import { AUTH_ROUTE, MAIN_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path:MAIN_ROUTE,
        Component: MainPage
    },
    {
        path:AUTH_ROUTE,
        Component:AuthPage
    }
]