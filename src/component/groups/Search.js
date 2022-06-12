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
import { searchGroup } from '../../http/API_groups';

const GroupsSearchPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedOptionT, setSelectedOptionT] = useState(null)

    let data = [{value: 'group',label:'Группы'},
    {value: 'page',label:'Сообщества'}]


    let type = [{value:'0', label:'сортировать по умолчанию'},{value: '6' , label:'сортировать по количеству пользователей'}]

    const [name, setName] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [info, setInfo] = useState(null)
    const [error, setError] = useState(null)
    
    const Send = () =>{
        searchGroup(decodedData.token, name, selectedOption.value, selectedOptionT.value).then(data=> setInfo(data))
        console.log(info)
    }

    const Save =()=>{
        SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id)).then()
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Поиск сообщества</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите запрос" />
        <Select className='select' placeholder='Выберите тип сообщетсва' defaultValue={selectedOption} onChange={setSelectedOption} options={data} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите правило сортировки' defaultValue={selectedOptionT} onChange={setSelectedOptionT} options={type} closeMenuOnSelect={false} />
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

export default GroupsSearchPage;