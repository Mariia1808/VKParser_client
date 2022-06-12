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

const MediaSearchPhotoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [NameZapros, setNameZapros] = useState(null)
    const [Name, setName] = useState(null)
    const [Dates, setDate] = useState(null)
    const [info, setInfo] = useState(null)
    const [selectedOptionSort, setSelectedOptionSort] = useState(null)
    const [selectedOptionRadius, setSelectedOptionRadius] = useState(null)
    let sort = [{value: '1', label:'по количеству отметок «Мне нравится»'},{value: '0' , label:'по дате добавления фотографии'}]
    let radius = [{value: '10', label:'10 метров'},{value: '100' , label:'100 метров'},{value:'800', label:'800 метров'},{value:'6000', label:'6000 метров'},{value:'50000', label:'50000 метров'}]

    const Send =()=>{
        console.log(selectedOptionSort.value)
        console.log(new Date(Dates).valueOf()/1000)
        searchPhoto(decodedData.token, Name, new Date(Dates).valueOf()/1000, selectedOptionSort.value, selectedOptionRadius.value).then(data=>setInfo(data))
    }

    const Save =()=>{
        SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id)).then()
    }

    const Delete = () =>{
        setInfo(null)
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Поиск фото</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите поисковый запрос" />
        {/* <TextField id="date" label="Вернуть фото добавленые не ранее" sx={{ width: 220 }} onChange={e=>setDate(e.target.value)} type="date" InputLabelProps={{shrink: true,}}/> */}
        <Select className='select' placeholder='Сортировать' defaultValue={selectedOptionSort} onChange={setSelectedOptionSort} options={sort} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Поиск фото в радиусе' defaultValue={selectedOptionRadius} onChange={setSelectedOptionRadius} options={radius} closeMenuOnSelect={false} />
            <div className='div1'>
            <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
            Продолжить  
            </Button>
        </div>
    </div>
    {(() => {
    switch (info!=null) {
        case true:
            return <div className='content w'>
            <div className='shapka'>
                <div>
                    <label>Найденно фотографий: </label><label className='war'>{info.response.count}</label>
                </div>
                <div>
                    <CsvLink data={info.response.items} fileName={NameZapros} >
                        <IconButton color="primary" variant="outlined">
                            <SaveAltIcon/>
                        </IconButton>
                    </CsvLink>
                    <IconButton color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
                    <IconButton color="primary" variant="outlined" onClick={()=>Delete()}><DeleteForeverIcon/></IconButton>
                </div>
            </div>
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
        default:
            return <></>
        }
    })()} 
</>
  );
}

export default MediaSearchPhotoPage;