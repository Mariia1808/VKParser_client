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
import { searchVideo } from '../../http/API_media';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { useParams } from 'react-router-dom';


const MediaSearchVideoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    
    const {params} = useParams()
    const def = (params==='null'? null:JSON.parse(JSON.parse(params)))
    
    const [NameZapros, setNameZapros] = useState(def===null?'':def[0].name)
    const [name, setName] = useState(def===null?'':def[1].param)
    const [info, setInfo] = useState(null)
    const [selectedOptionSort, setSelectedOptionSort] = useState(def===null?'':def[2].sort)
    let sort = [{value: '0', label:'по дате добавления видеозаписи'},{value: '1' , label:'по длительности'},{value: '2', label:'по релевантности'},{value: '3' , label:'по количеству просмотров'}]
   
    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send =()=>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
            let Name = (name===''? null:name)
            let SelectedOptionSort = (selectedOptionSort===null? null:selectedOptionSort.value)
        searchVideo(decodedData.token, Name, SelectedOptionSort).then(data=>setInfo(data)).finally(()=>setLoading(false))
        }else{
            setOpen_error(true)
        }
    }

    const [open, setOpen] = useState(false);
    const Save = async ()=>{
        const parameters = JSON.stringify([{'name': NameZapros}, {'param':name}, {'sort':selectedOptionSort}])
        const data = await SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id), parameters, 17)
        if(data.response==='no_error'){
            setOpen(true)
        }
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Поиск видео</h3>
        <TextField className='text' id="filled-basic" defaultValue={NameZapros} onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
        <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
        <TextField className='text' id="filled-basic" defaultValue={name} onChange={e=>setName(e.target.value)} label="Введите поисковый запрос" />
        <Select className='select' placeholder='Сортировка' defaultValue={selectedOptionSort} onChange={setSelectedOptionSort} options={sort} closeMenuOnSelect={false} />
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
                        <label>Найденно видеозаписей: </label><label className='war'>{info.response.count}</label>
                    </div>
                    <div>
                        <CsvLink title='Экспорт' data={info.response.items} fileName={NameZapros} >
                            <IconButton color="primary" variant="outlined">
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
                    <th>Название</th>
                    <th>ID владельца</th>
                    <th>Тип</th>
                    <th>Категории</th>
                    <th>Лайки</th>
                    <th>Репосты</th>
                    <th>Просмотры</th>
                    <th>Обложка</th>
                </thead>
                <tbody>
                {info.response.items.map((data, index)=>{
                    return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td>
                            {(() => {
                                switch (data.subtitle!==undefined) {
                                case true: return <>{data.subtitle}</>
                                case false: return <>Видео доступно только в ВК</>
                                default: return <>-</>
                                }
                            })()}
                        </td>
                        <td>{data.owner_id}</td>
                        <td>   
                            {(() => {
                                switch (data.type) {
                                case 'video': return <>Видео</>
                                case 'music_video': return <>Клип</>
                                case 'movie': return <>Фильм</>
                                default: return <>-</>
                                }
                            })()}
                        </td>
                        <td>{(() => {
                                switch (data.genres!==undefined) {
                                case true: return <>{data.genres.map(data=> {return <>{data.name}<br/></>})}</>
                                default: return <>-</>
                                }
                            })()}
                        </td>
                        <td>{data.likes.count}</td>
                        <td>{data.reposts.count}</td>
                        <td>{data.views}</td>
                        <td><img src={data.image[0].url}/></td>
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

export default MediaSearchVideoPage;