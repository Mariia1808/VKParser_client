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
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';


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
    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send = () =>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
        console.log(selectedOption)
        let SelectedOption = (selectedOption===null? null:selectedOption.value)
        getCatalog(decodedData.token, SelectedOption).then(data => setCategories(data)).finally(()=>setLoading(false))
        }else{
            setOpen_error(true)
        }
    }
    const [open, setOpen] = useState(false);
    const Save = async ()=>{
        const data = await SaveHistory(JSON.stringify(categories.response.items), NameZapros, parseInt(decodedData.id))
        if(data.response==='no_error'){
            setOpen(true)
        }
    }
  return (
<>
    <div className='content con'>
        <h3 className='h'>Поиск по категории</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
        <Select className='select' placeholder='Выберите категорию' defaultValue={selectedOption} onChange={setSelectedOption} options={data} closeMenuOnSelect={false} />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
    {(() => {
    switch (categories!=null) {
        case true:
            return <>{categories.response===undefined?
                <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                    :<><div className='content con w'>
            <div className='shapka'>
                <div>
                    <label>Найденно сообществ: </label><label className='war'>{categories.response.count}</label>
                </div>
                <div>
                    <CsvLink data={categories.response.items} fileName={NameZapros} >
                        <IconButton title='Экспорт' color="primary" variant="outlined">
                            <SaveAltIcon/>
                        </IconButton>
                    </CsvLink>
                    <IconButton title='Сохранить' color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
                    
                </div>
            </div>
            <Collapse in={open}>
                <Alert action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen(false);}}>
                    <CloseIcon fontSize="inherit" />
                    </IconButton>}sx={{ mb: 2 }}>
                        Запрос успешно сохранен
                </Alert>
            </Collapse>
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
            {categories.response.items.map((data, index)=>{
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
        </>}</>
        default:
            return <></>
        }
    })()} 
</>
  );
}

export default GroupsCategoriesPage;