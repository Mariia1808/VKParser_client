
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import { getSubscriptions, login } from '../http/API';
import Button from '@mui/material/Button';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import logo from '../logoza.ru.png'

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ControlPointDuplicateOutlinedIcon from '@mui/icons-material/ControlPointDuplicateOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import { IconButton } from '@mui/material';

const Header = () =>{

  return (
    <div className='header_content'>
        <div className='logo'>
            <Button>dtcfyvgubhinj</Button>
        </div>
        <div className='header'>
            <Menu menuButton={<Button className='menu_but' variant="outlined" startIcon={<PersonOutlineOutlinedIcon />}>Пользователи </Button>}>
                <MenuItem>Подписки</MenuItem>
                <MenuItem>Информация</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but' variant="outlined" startIcon={<InsertCommentOutlinedIcon />}>Комментарии </Button>}>
                <MenuItem>К альбомам</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but' variant="outlined" startIcon={<GroupsOutlinedIcon />}>Группы </Button>}>
                <MenuItem>Подписчики</MenuItem>
            </Menu>
            <Menu menuButton={<Button className='menu_but' variant="outlined" startIcon={<InsertPhotoOutlinedIcon />}>Медия </Button>}>
                
            </Menu>
            <Menu menuButton={<Button className='menu_but' variant="outlined" startIcon={<ArticleOutlinedIcon />}>Стена </Button>}>
                
            </Menu>
            <Menu menuButton={<Button className='menu_but' variant="outlined" startIcon={<StackedLineChartOutlinedIcon />}>Статистика </Button>}>
                
            </Menu>
            <Menu menuButton={<Button className='menu_but' variant="outlined" startIcon={<ControlPointDuplicateOutlinedIcon />}>Прочее </Button>}>
                <MenuItem>Получение id</MenuItem>
               
            </Menu>
        </div>
        <div>
            <Menu menuButton={<IconButton className='menu_but' color="primary"><FaceOutlinedIcon  variant="outlined"/></IconButton>}>
                <MenuItem>История</MenuItem>
                <MenuItem>Выход</MenuItem>
            </Menu>
        </div>
    </div>
  );
}

export default Header;
