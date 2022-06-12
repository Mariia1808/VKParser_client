import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getCatalog, getCatalogInfo } from '../../http/API_groups';
import { SaveHistory } from '../../http/API_main';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import Select from 'react-select';


const GroupsCategoriesPage = () =>{
    const [catalogs, setCatalogs] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)

    const [NameZapros, setNameZapros] = useState(null)
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    
    useEffect(() =>{
        getCatalogInfo(decodedData.token).then(data => setCatalogs(data.response.categories))
    },[])

    //const [data, setData] = useState(null)
    
    let data = catalogs.map((item) => {
        return {
            value: item.id,
            label: item.name,
        }
    })
      
    const [categories, setCategories] = useState(null)
    const Send = () =>{
        console.log(selectedOption)
        getCatalog(decodedData.token, selectedOption.value).then(data => data.response===undefined? setCategories(null):setCategories(data.response))
    }
    const Save =()=>{
        SaveHistory(JSON.stringify(categories.items), NameZapros, parseInt(decodedData.id)).then()
    }
  return (
<>
    <div className='content con'>
        <h3 className='h'>Поиск по категории</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
        <Select className='select' placeholder='Выберите категорию' defaultValue={selectedOption} onChange={setSelectedOption} options={data} closeMenuOnSelect={false} />
        <div className='div1'>
            <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
            Продолжить  
            </Button>
        </div>
    </div>
    {(() => {
    switch (categories!=null) {
        case true:
            return <div className='content con w'>
            <div className='shapka'>
                <div>
                    <label>Найденно сообществ: </label><label className='war'>{categories.count}</label>
                </div>
                <div>
                    <CsvLink data={categories} fileName={NameZapros} >
                        <IconButton color="primary" variant="outlined">
                            <SaveAltIcon/>
                        </IconButton>
                    </CsvLink>
                    <IconButton color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
                    <IconButton color="primary" variant="outlined"><DeleteForeverIcon/></IconButton>
                </div>
            </div>
            <table className='table'>
            <thead>
                <th>№</th>
                <th>id</th>
                <th>Короткое имя</th>
                <th>Имя</th>
                <th>Тип</th>
                <th>Приватность</th>
                <th>Администратор</th>
                <th>Подписчик</th>
                <th>Рекламодатель</th>
            </thead>
            <tbody>
            {categories.items.map((data, index)=>{
                return <tr>
                    <td>{index+1}</td>
                    <td>{data.id}</td>
                    <td>{data.screen_name}</td>
                    <td>{data.name}</td>
                    <td>{(() => {
                        switch (data.type) {
                        case 'group': return <>Группа</>
                        case 'page': return <>Публичная страница</>
                        case 'event': return <>Мероприятие</>
                        default: return <>-</>
                        }
                        })()}</td>
                    <td>{(() => {
                        switch (data.is_closed) {
                        case 0: return <>Открытое</>
                        case 1: return <>Закрытое</>
                        case 2: return <>Частное</>
                        default: return <>-</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.is_admin) {
                        case 0: return <>Нет</>
                        case 1: return <>Да</>
                        default: return <>-</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.is_member) {
                        case 0: return <>Нет</>
                        case 1: return <>Да</>
                        default: return <>-</>
                        }
                    })()}</td>
                    <td>{(() => {
                        switch (data.is_advertiser) {
                        case 0: return <>Нет</>
                        case 1: return <>Да</>
                        default: return <>-</>
                        }
                    })()}</td>
                </tr>
            })}
                </tbody>
            </table>
        </div>
        default:
            return <div className='content'>По вашему запросу ничего не найдено</div>
        }
    })()} 
</>
  );
}

export default GroupsCategoriesPage;