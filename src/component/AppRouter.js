import React from "react";
import {Routes , Route, Navigate} from "react-router-dom";
import { publicRoutes } from "../routers";
import { MAIN_ROUTE } from "../utils/consts";


const AppRouter = () => {
        return (
        <Routes>
            {
                publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} />)
            }
            <Route
                path="*"
                element={<Navigate to={MAIN_ROUTE} />}
            /> 
            <Route
                path="/"
                element={<Navigate to={MAIN_ROUTE} />}
            /> 
        </Routes>
        );
    
};

export default AppRouter;