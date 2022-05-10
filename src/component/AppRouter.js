import React from "react";
import {Routes , Route, Navigate} from "react-router-dom";
import { publicRoutes } from "../routers";
import { AUTH_ROUTE, MAIN_ROUTE } from "../utils/consts";


const AppRouter = () => {
        return (
        <Routes>
            {
                publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} />)
            }
            <Route
                path="*"
                element={<Navigate to={AUTH_ROUTE} />}
            /> 
            <Route
                path="/"
                element={<Navigate to={AUTH_ROUTE} />}
            /> 
        </Routes>
        );
    
};

export default AppRouter;