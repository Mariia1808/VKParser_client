import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import { SaveHistory } from '../../http/API_main';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Select from 'react-select';
import { searchPhoto } from '../../http/API_media';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';


const MediaSearchPhotoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [NameZapros, setNameZapros] = useState(null)
    const [name, setName] = useState(null)
    const [Dates, setDate] = useState(null)
    const [info, setInfo] = useState(null)
    const [selectedOptionSort, setSelectedOptionSort] = useState(null)
    const [selectedOptionRadius, setSelectedOptionRadius] = useState(null)
    let sort = [{value: '1', label:'по количеству отметок «Мне нравится»'},{value: '0' , label:'по дате добавления фотографии'}]
    let radius = [{value: '10', label:'10 метров'},{value: '100' , label:'100 метров'},{value:'800', label:'800 метров'},{value:'6000', label:'6000 метров'},{value:'50000', label:'50000 метров'}]

    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send =()=>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)

        let Name = (name===''? null:name)
        let SelectedOptionSort = (selectedOptionSort===null? null:selectedOptionSort.value)
        let SelectedOptionRadius = (selectedOptionRadius===null? null:selectedOptionRadius.value)
        searchPhoto(decodedData.token, Name, new Date(Dates).valueOf()/1000, SelectedOptionSort, SelectedOptionRadius).then(data=>setInfo(data)).finally(()=>setLoading(false))
        }else{
            setOpen_error(true)
        }
    }

    const [open, setOpen] = useState(false);
    const Save = async ()=>{
        const data = await SaveHistory(JSON.stringify(info.response.items), NameZapros, parseInt(decodedData.id))
        if(data.response==='no_error'){
            setOpen(true)
        }
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Поиск фото</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите поисковый запрос" />
        {/* <TextField id="date" label="Вернуть фото добавленые не ранее" sx={{ width: 220 }} onChange={e=>setDate(e.target.value)} type="date" InputLabelProps={{shrink: true,}}/> */}
        <Select className='select' placeholder='Сортировать' defaultValue={selectedOptionSort} onChange={setSelectedOptionSort} options={sort} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Поиск фото в радиусе' defaultValue={selectedOptionRadius} onChange={setSelectedOptionRadius} options={radius} closeMenuOnSelect={false} />
            <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
    {(() => {
    switch (info!=null) {
        case true:
            return <>{info.response===undefined?
                <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                    :<><div className='content w'>
            <div className='shapka'>
                <div>
                    <label>Найденно фотографий: </label><label className='war'>{info.response.count}</label>
                </div>
                <div>
                    <CsvLink data={info.response.items} fileName={NameZapros} >
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
                <th>ID альбома</th>
                <th>ID владельца</th>
                <th>Текст</th>
                <th>Фото</th>
            </thead>
            <tbody>
            {info.response.items.map((data, index)=>{
                return <tr>
                    <td>{index+1}</td>
                    <td>{data.id}</td>
                    <td>{data.album_id}</td>
                    <td>{data.owner_id}</td>
                    <td>{data.text}</td>
                    <td> <img src={data.sizes[1].url}/></td>
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

export default MediaSearchPhotoPage;