import './css.css';
import { useContext, useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import AppRouter from './component/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import Header from './component/Header';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import {Context} from "./index";
import { check } from './http/API_main';



const App = observer(() => {
    const {user} =useContext(Context)
    useEffect(()=>{
            check().then(data =>{
                user.setUser(data)
                user.setIsAuth(true)
            })
    }, [])
  return (
    <BrowserRouter>
        <Header/>
        <AppRouter />
    </BrowserRouter>
  );
})

export default App;
