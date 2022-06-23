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
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { useParams } from 'react-router-dom';


const GroupsSearchPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const {params} = useParams()
    const def = (params==='null'? null:JSON.parse(JSON.parse(params)))

    const [selectedOption, setSelectedOption] = useState(def===null?'':def[2].select)
    const [selectedOptionT, setSelectedOptionT] = useState(def===null?'':def[3].selectT)

    let data = [{value: 'group',label:'Группы'},
    {value: 'page',label:'Сообщества'}]


    let type = [{value:'0', label:'сортировать по умолчанию'},{value: '6' , label:'сортировать по количеству пользователей'}]

    const [name, setName] = useState(def===null?'':def[1].param)
    const [NameZapros, setNameZapros] = useState(def===null?'':def[0].name)
    const [info, setInfo] = useState(null)
    const [error, setError] = useState(null)
    
    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send = () =>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
            let Name = (name===''? null:name)
            let SelectedOption = (selectedOption===null? null:selectedOption.value)
            let SelectedOptionT = (selectedOptionT===null? null:selectedOptionT.value)

        searchGroup(decodedData.token, Name, SelectedOption, SelectedOptionT).then(data=> setInfo(data)).finally(()=>setLoading(false))
        }else{
            setOpen_error(true)
        }
        console.log(info)
    }

    const [open, setOpen] = useState(false);
    const Save = async ()=>{
        const parameters = JSON.stringify([{'name': NameZapros}, {'param':name}, {'select':selectedOption}, {'selectT':selectedOptionT}])
        const data = await SaveHistory(JSON.stringify(info.response.items), NameZapros, parseInt(decodedData.id), parameters, 10)
        if(data.response==='no_error'){
            setOpen(true)
        }
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Поиск сообществ</h3>
        <TextField className='text' id="filled-basic" defaultValue={NameZapros} onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
        <TextField className='text' id="filled-basic" defaultValue={name} onChange={e=>setName(e.target.value)} label="Введите запрос" />
        <Select className='select' placeholder='Выберите тип сообщетсва' defaultValue={selectedOption} onChange={setSelectedOption} options={data} closeMenuOnSelect={false} />
        <Select className='select' placeholder='Выберите правило сортировки' defaultValue={selectedOptionT} onChange={setSelectedOptionT} options={type} closeMenuOnSelect={false} />
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
                        :
                <div className='content con w'>
                <div className='shapka'>
                    <div>
                        <label>Всего найдено: </label><label className='war'>{info.response.count}</label>
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