import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { SaveHistory } from '../../http/API_main';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import Select from 'react-select';
import { getCities, getRegions } from '../../http/API_other';
import { searchEvent } from '../../http/API_groups';

const EventSearchPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [selectedOption, setSelectedOption] = useState(null)
    const [region, setRegion] = useState([])

    useEffect(() =>{
        getRegions(decodedData.token, 1).then(data => setRegion(data.response.items))
    },[])

    let regions = region.map((item) => {
        return {
            value: item.id,
            label: item.title,
        }
    })

    let type = [{value:'0', label:'сортировать по умолчанию'},{value: '6' , label:'сортировать по количеству пользователей'}]

    const [name, setName] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [info, setInfo] = useState(null)
    const [t, setT] = useState(null)
    
    const Send = () =>{
        searchEvent(decodedData.token, name, selectedCity.value, selectedOption.value).then(data=> setInfo(data))
        console.log(info)
    }

    const Save =()=>{
        SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id)).then()
    }

    let [cities, setCities] = useState([])
    const get_city = async () =>{
        const data = await getCities(decodedData.token, 1, selectedRegion.value)
        cities = data.map((item) => {
            return {
                value: item.id,
                label: item.title,
            }
        })
        setCities(cities)
        setT(!t)
        console.log(cities)
    }

    const [selectedRegion, setSelectedRegion] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)

  return (
<>
    <div className='content con'>
        <h3 className='h'>Поиск событий</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите запрос" />
        <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} onMenuClose={()=>get_city()} options={regions} closeMenuOnSelect={false} />
        <Select className='select' placeholder='Выберите город' defaultValue={selectedCity} onChange={setSelectedCity} options={cities} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите правило сортировки' defaultValue={selectedOption} onChange={setSelectedOption} options={type} closeMenuOnSelect={false} />
            <div className='div1'>
        <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
        Продолжить  
        </Button>
        </div>
    </div>
    {(() => {
        switch (info!=null) {
            case true:
                return <>{info.response===undefined?
                    <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                        :
                <div className='content con w'>
                <div className='shapka'>
                    <div>
                        <label>Всего найдено: </label><label className='war'>{info.response.count}</label>
                    </div>
                    <div>
                        <CsvLink data={info.response} fileName={NameZapros} >
                            <IconButton color="primary" variant="outlined">
                                <SaveAltIcon/>
                            </IconButton>
                        </CsvLink>
                        <IconButton color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
                    </div>
                </div>
                <table className='table'>
                <thead>
                    <th>№</th>
                    <th>id</th>
                    <th>Аватарка</th>
                    <th>Короткое имя</th>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Приватность сообщества</th>
                    <th>Оставить запись</th>
                </thead>
                <tbody>
                {info.response.items.map((data, index)=>{
                    return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td><img src={data.photo_50}/></td>
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
                            switch (data.can_post) {
                            case 1: return <>можно</>
                            default: return <>нельзя</>
                            }
                        })()}</td>
                    </tr>
                })}
                    </tbody>
                </table>
            </div>}</>
        default:
            return <></>
        }
    })()}
</>
  );
}

export default EventSearchPage;