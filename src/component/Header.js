
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from "query-string";
import { getSubscriptions, login } from '../http/API';
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

  return (
    <div className='header_content'>
        <div>
           <Button onClick={()=>toNavigate('/main')} className='but_log'><img className='logo' src={Logotip}/></Button>
        </div>
        <div className='header'>
            <Menu menuButton={<Button className='menu_but button' variant="outlined" startIcon={<PersonOutlineOutlinedIcon />}>Пользователи </Button>}>
                <MenuItem onClick={()=>toNavigate('/user/get_followers')}>Подписчики</MenuItem>
                <MenuItem onClick={()=>toNavigate('/user/get_subscriptions')}>Подписки</MenuItem>
                <MenuItem onClick={()=>toNavigate('/user/get_info')}>Информация</MenuItem>
                <MenuItem onClick={()=>toNavigate('/user/search')}>Поиск</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button' variant="outlined" startIcon={<InsertCommentOutlinedIcon />}>Комментарии </Button>}>
                <MenuItem>К альбомам</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button' variant="outlined" startIcon={<GroupsOutlinedIcon />}>Группы </Button>}>
                <MenuItem onClick={()=>toNavigate('/groups/subscriptions')}>Подписчики</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but button' variant="outlined" startIcon={<InsertPhotoOutlinedIcon />}>Медия </Button>}>
                
            </Menu>
            <Menu menuButton={<Button className='menu_but button' variant="outlined" startIcon={<ArticleOutlinedIcon />}>Стена </Button>}>
                
            </Menu>
            <Menu menuButton={<Button className='menu_but button' variant="outlined" startIcon={<StackedLineChartOutlinedIcon />}>Статистика </Button>}>
                
            </Menu>
            <Menu menuButton={<Button className='menu_but button' variant="outlined" startIcon={<ControlPointDuplicateOutlinedIcon />}>Прочее </Button>}>
                <MenuItem>Получение id</MenuItem>
               
            </Menu>
        </div>
        <div>
            <Menu menuButton={<IconButton className='menu_but  button' color="primary"><FaceOutlinedIcon  variant="outlined"/></IconButton>}>
                <MenuItem>История</MenuItem>
                <MenuItem>Выход</MenuItem>
            </Menu>
        </div>
    </div>
  );
}

export default Header;
