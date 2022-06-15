
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';


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
                <MenuItem onClick={()=>toNavigate('/user/get_followers')}>Подписчики</MenuItem>
                <MenuItem onClick={()=>toNavigate('/user/get_subscriptions')}>Подписки</MenuItem>
                <MenuItem onClick={()=>toNavigate('/user/get_info')}>Информация</MenuItem>
                <MenuItem onClick={()=>toNavigate('/user/search')}>Поиск</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<InsertCommentOutlinedIcon />}>Комментарии </Button>}>
                <MenuItem onClick={()=>toNavigate('/comments/about_post')}>К записи</MenuItem>
                <MenuItem onClick={()=>toNavigate('/comments/about_photo')}>К фото</MenuItem>
                <MenuItem onClick={()=>toNavigate('/comments/about_video')}>К видео</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<GroupsOutlinedIcon />}>Группы </Button>}>
                <MenuItem onClick={()=>toNavigate('/groups/get_subscriptions')}>Подписчики</MenuItem>
                <MenuItem onClick={()=>toNavigate('/groups/get_info')}>Информация</MenuItem>
                <MenuItem onClick={()=>toNavigate('/groups/search')}>Поиск сообществ</MenuItem>
                <MenuItem onClick={()=>toNavigate('/groups/search_event')}>Поиск событий</MenuItem>
                <MenuItem onClick={()=>toNavigate('/groups/get_catalogs')}>Каталоги</MenuItem>
                <MenuItem onClick={()=>toNavigate('/groups/get_categories')}>Категории</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<InsertPhotoOutlinedIcon />}>Медиа </Button>}>
                <MenuItem onClick={()=>toNavigate('/media/get_info_photo')}>Информация о фото</MenuItem>
                <MenuItem onClick={()=>toNavigate('/media/search_photo')}>Поиск фото</MenuItem>
                <MenuItem onClick={()=>toNavigate('/media/get_info_video')}>Информация о видео</MenuItem>
                <MenuItem onClick={()=>toNavigate('/media/search_video')}>Поиск видео</MenuItem>
                <MenuItem onClick={()=>toNavigate('/media/get_info_albom_video')}>Информация об альбоме с видео</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<ArticleOutlinedIcon />}>Стена </Button>}>
                <MenuItem onClick={()=>toNavigate('/wall/get_info')}>Информация</MenuItem>
                <MenuItem onClick={()=>toNavigate('/wall/search')}>Поиск</MenuItem>
                <MenuItem onClick={()=>toNavigate('/wall/get_repost')}>Репосты</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<StackedLineChartOutlinedIcon />}>Статистика </Button>}>
                <MenuItem onClick={()=>toNavigate('/statistic/get_application')}>Приложения</MenuItem>
                <MenuItem onClick={()=>toNavigate('/statistic/get_group')}>Cообщества</MenuItem>
                <MenuItem onClick={()=>toNavigate('/statistic/get_link')}>Сокращенной ссылки</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button css-but' variant="outlined" startIcon={<ControlPointDuplicateOutlinedIcon />}>Прочее </Button>}>
                <MenuItem onClick={()=>toNavigate('/other/get_country')}>Страны</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_regions')}>Регионы</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_city')}>Города</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_universities')}>Университеты</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_faculties')}>Институты/факультеты</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_identifikator')}>Получение идентификатора</MenuItem>
                <MenuItem onClick={()=>toNavigate('/other/get_shold_link')}>Сокращенные ссылки</MenuItem>
            </Menu>
        </div>
        <div>
            <Menu menuButton={<IconButton className='menu_but  button' color="primary"><FaceOutlinedIcon  variant="outlined"/></IconButton>}>
                <MenuItem onClick={()=>toNavigate('/history')}>История</MenuItem>
                <MenuItem onClick={()=> out()}>Выход</MenuItem>
            </Menu>
        </div>
    </div>
  );
}

export default Header;
