
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import { getUser_long } from '../../http/API';

const TableInfo = ({user, kolvo}) =>{


  return (
      <>{(() => {
        switch (kolvo!=null) {
        case true: return <><label>Найдено {kolvo} подписчиков</label><br/></>
        default: return <></>
        }
    })()}
    <table className='table'>
        <thead>
            <th>id</th>
            <th>Короткое имя</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Пол</th>
            <th>Приватность профиля</th>
            <th>Дата Рожд.</th>
            <th>Город</th>
            <th>Институт</th>
            <th>Друзья</th>
            <th>Добавить в друзья</th>
            <th>Написать в ЛС</th>
            <th>Оставить запись</th>
        </thead>
        <tbody>
           {user.response.map(data=>{
               return <tr>
                   <td>{data.id}</td>
                   <td>{data.screen_name}</td>
                   <td>{data.first_name}</td>
                   <td>{data.last_name}</td>
                   <td>{(() => {
                        switch (data.sex) {
                        case 1: return <>Женский</>
                        default: return <>Мужской</>
                        }
                    })()}</td>
                   <td>{(() => {
                        switch (data.can_access_closed) {
                        case true: return <>Открыт</>
                        default: return <>Закрыт</>
                        }
                    })()}</td>
                   <td>{data.bdate}</td>
                   <td>{(() => {
                        switch (data.city!=undefined) {
                        case true: return <>{data.city.title}</>
                        default: return <>-</>
                        }
                    })()}</td>
                   <td>{data.faculty_name}</td>
                    <td>{(() => {
                        switch (data.friend_status) {
                        case 3: return <>да</>
                        case 2: return <>подписан</>
                        case 1: return <>исходящяя заявка</>
                        default: return <>нет</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.can_send_friend_request) {
                        case 1: return <>можно</>
                        default: return <>нельзя</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.can_write_private_message) {
                        case 1: return <>можно</>
                        default: return <>нельзя</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.can_post) {
                        case 1: return <>можно</>
                        default: return <>нельзя</>
                        }
                    })()}</td>
               </tr>
           })}
        </tbody>
    </table>
    </>
  );
}

export default TableInfo;