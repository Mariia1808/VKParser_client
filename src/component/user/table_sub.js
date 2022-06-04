
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import { getUser_long } from '../../http/API';

const TableSubscription = ({user, kolvo}) =>{


  return (
      <>
       <label>Найденное количество подписок: </label><label className='war'>{kolvo}</label><br/>
    <table className='table'>
        <thead>
            <th>id</th>
            <th>Короткое имя</th>
            <th>Название</th>
            <th>Кол-во подписчиков</th>
            <th>Приватность сообщества</th>
            <th>Оставить запись</th>
            <th>Администатор</th>
            <th>Рекламодатель</th>
        </thead>
        <tbody>
           {user.response.items.map(data=>{
               return <tr>
                   <td>{data.id}</td>
                   <td><>{data.screen_name}</></td>
                   <td>{data.name}</td>
                   <td>{data.members_count}</td>
                    <td>{(() => {
                        switch (data.is_closed) {
                        case 0: return <>Открытое</>
                        case 1: return <>Закрытое</>
                        case 2: return <>Частное</>
                        default: return <>-</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.can_post) {
                        case 1: return <>можно</>
                        default: return <>нельзя</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.is_admin) {
                        case 1: return <>да</>
                        default: return <>нет</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.is_advertiser) {
                        case 1: return <>да</>
                        default: return <>нет</>
                        }
                    })()}</td>
               </tr>
           })}
        </tbody>
    </table>
    </>
  );
}

export default TableSubscription;