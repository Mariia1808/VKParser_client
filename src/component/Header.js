
import React, { useEffect, useState } from 'react';
import {useFavicon} from 'react-use';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import jwt_decode from "jwt-decode";

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import { IconButton } from '@mui/material';
import Logotip from "../logo.png";

const Header = () =>{

    useFavicon(Logotip)
    const toNavigate = useNavigate()
    const out = () =>{
        localStorage.clear()
        toNavigate('/auth')
    }

  return (
    <div className='header_content'>
        <div>
           <Button onClick={()=>toNavigate('/main')} className='but_log'><img className='logo' src={Logotip}/></Button>
        </div>
        <div className='header'>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<PersonOutlineOutlinedIcon />}>Пользователи </Button>}>
                <MenuItem onClick={()=>toNavigate('/user/get_followers/'+null)}>Подписчики</MenuItem>
                <MenuItem onClick={()=>toNavigate('/user/get_subscriptions/'+null)}>Подписки</MenuItem>
                <MenuItem onClick={()=>toNavigate('/user/get_info/'+null)}>Информация</MenuItem>
                <MenuItem onClick={()=>toNavigate('/user/search/'+null)}>Поиск</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<InsertCommentOutlinedIcon />}>Комментарии </Button>}>
                <MenuItem onClick={()=>toNavigate('/comments/about_post/'+null)}>К записи</MenuItem>
                <MenuItem onClick={()=>toNavigate('/comments/about_photo/'+null)}>К фото</MenuItem>
                <MenuItem onClick={()=>toNavigate('/comments/about_video/'+null)}>К видео</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<GroupsOutlinedIcon />}>Группы </Button>}>
                <MenuItem onClick={()=>toNavigate('/groups/get_subscriptions/'+null)}>Подписчики</MenuItem>
                <MenuItem onClick={()=>toNavigate('/groups/get_info/'+null)}>Информация</MenuItem>
                <MenuItem onClick={()=>toNavigate('/groups/search_group/'+null)}>Поиск сообществ</MenuItem>
                <MenuItem onClick={()=>toNavigate('/groups/search_event/'+null)}>Поиск событий</MenuItem>
                <MenuItem onClick={()=>toNavigate('/groups/get_catalogs/'+null)}>Каталоги</MenuItem>
                <MenuItem onClick={()=>toNavigate('/groups/get_categories/'+null)}>Категории</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<InsertPhotoOutlinedIcon />}>Медиа </Button>}>
                <MenuItem onClick={()=>toNavigate('/media/get_info_photo/'+null)}>Информация о фото</MenuItem>
                <MenuItem onClick={()=>toNavigate('/media/search_photo/'+null)}>Поиск фото</MenuItem>
                <MenuItem onClick={()=>toNavigate('/media/get_info_video/'+null)}>Информация о видео</MenuItem>
                <MenuItem onClick={()=>toNavigate('/media/search_video/'+null)}>Поиск видео</MenuItem>
                <MenuItem onClick={()=>toNavigate('/media/get_info_albom_video/'+null)}>Информация об альбоме с видео</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<ArticleOutlinedIcon />}>Стена </Button>}>
                <MenuItem onClick={()=>toNavigate('/wall/get_info/'+null)}>Информация</MenuItem>
                <MenuItem onClick={()=>toNavigate('/wall/search/'+null)}>Поиск</MenuItem>
                <MenuItem onClick={()=>toNavigate('/wall/get_repost/'+null)}>Репосты</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<StackedLineChartOutlinedIcon />}>Статистика </Button>}>
                <MenuItem onClick={()=>toNavigate('/statistic/get_application/'+null)}>Приложения</MenuItem>
                <MenuItem onClick={()=>toNavigate('/statistic/get_group/'+null)}>Cообщества</MenuItem>
                <MenuItem onClick={()=>toNavigate('/statistic/get_link/'+null)}>Сокращенной ссылки</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<ControlPointDuplicateOutlinedIcon />}>Прочее </Button>}>
                <MenuItem onClick={()=>toNavigate('/other/get_country/'+null)}>Страны</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_regions/'+null)}>Регионы</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_city/'+null)}>Города</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_universities/'+null)}>Университеты</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_faculties/'+null)}>Институты/факультеты</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_identifikator/'+null)}>Получение идентификатора</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_shold_link/'+null)}>Сокращенные ссылки</MenuItem>
            </Menu>
        </div>
        <div>
            <Menu menuButton={<IconButton className='menu_but  button' color="primary"><FaceOutlinedIcon  variant="outlined"/></IconButton>}>
                <MenuItem onClick={()=>toNavigate('/history')}>История</MenuItem>
                {localStorage.length!==0?  jwt_decode(localStorage.getItem("token")).user_id === '50064646'? <MenuItem onClick={()=>toNavigate('/methods')}>Методы</MenuItem>:null:null}
                <MenuItem onClick={()=> out()}>Выход</MenuItem>
            </Menu>
        </div>
    </div>
  );
}

export default Header;
