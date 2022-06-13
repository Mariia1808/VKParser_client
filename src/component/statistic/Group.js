import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getGroups, statsGroup, statsGroupAll } from '../../http/API_statictics';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import { SaveHistory } from '../../http/API_main';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Select from 'react-select';
import {VictoryPie} from 'victory'
import LoadingButton from '@mui/lab/LoadingButton';

const StatisticGroupPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setInfo(null)
    };

    const [group, setGroup] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)

    useEffect(() =>{
        getGroups(decodedData.token).then(data => setGroup(data.response.items))
    },[])
    
    let data = group.map((item) => {
        return {
            value: item.id,
            label: item.name,
        }
    })
      
    const [info, setInfo] = useState(null)
    const [loading, setLoading]=useState(false)
    const Send = async () =>{
        setLoading(true)
        console.log(selectedOption)
        let SelectedOption = (selectedOption===null? null:selectedOption.value)
        const data = await statsGroupAll(decodedData.token, SelectedOption).finally(()=>setLoading(false))
        setInfo(data)
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Статистика группы за весь период</h3>
        <Select className='select' placeholder='Выберите группу' defaultValue={selectedOption} onChange={setSelectedOption} options={data} closeMenuOnSelect={false} />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
    {(() => {
        switch (info!==null) {
            case true:
                return <>{info.response===undefined?
                    <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                        :<><div>
                <div className='content con'>
                    <h3 className='h'>Активность</h3>
                    <div className='dia'>
                        <VictoryPie data={[{ x: "Лайки: " + info.response[0].activity.likes, y: info.response[0].activity.likes},{ x: "Репосты: " + (info.response[0].activity.copies===undefined? 0 : info.response[0].activity.copies), y: info.response[0].activity.copies},{ x: "Комментарии: "+info.response[0].activity.comments, y: info.response[0].activity.comments }]} radius={80} colorScale={['#1976d2','#2684ff96','#0b3c6de8']}/>
                        <VictoryPie data={[{ x: "Подписки: "+info.response[0].activity.subscribed, y: info.response[0].activity.subscribed },{ x: "Отписки: "+info.response[0].activity.unsubscribed, y: info.response[0].activity.unsubscribed }]} radius={80} colorScale={['#1976d2','#2684ff96']}/>
                    </div>
                </div>
                <div className='stat'>
                <div className='content con'>
                    <h3 className='h'>Посетителей: {info.response[0].visitors.visitors}</h3>
                    <div className='diaT'>
                        <table className='table'>
                            <thead>
                                <th>Возраст</th>
                                <th>Кол-во</th>
                            </thead>
                            <tbody>
                                {info.response[0].visitors.age.map(data=>{
                                    return <tr>
                                        <td>{data.value}</td>
                                        <td>{data.count}</td>
                                        </tr>
                                })}
                            </tbody>
                        </table>

                    <table className='table'>
                        <thead>
                            <th>Город</th>
                            <th>Кол-во</th>
                        </thead>
                        <tbody>
                            {info.response[0].visitors.cities.map(data=>{
                                return <tr>
                                    <td>{data.name}</td>
                                    <td>{data.count}</td>
                                </tr>
                                
                            })}
                        </tbody>
                    </table>
                    <table className='table'>
                            <thead>
                                <th>Страна</th>
                                <th>Кол-во</th>
                            </thead>
                            <tbody>
                                {info.response[0].visitors.countries.map(data=>{
                                    return <tr>
                                        <td>{data.name}</td>
                                        <td>{data.count}</td>
                                        </tr>
                                })}
                            </tbody>
                        </table>
                    
                    <table className='table'>
                            <thead>
                                <th>Пол</th>
                                <th>Кол-во</th>
                            </thead>
                            <tbody>
                                {info.response[0].visitors.sex_age.map(data=>{
                                    return <tr>
                                        <td>{data.value}</td>
                                        <td>{data.count}</td>
                                        </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    </div>
                    <div className='content con b'>
                    <h3 className='h'>Охваты: {info.response[0].reach.reach}</h3>
                    <div className='diaT'>
                        <table className='table'>
                            <thead>
                                <th>Возраст</th>
                                <th>Кол-во</th>
                            </thead>
                            <tbody>
                                {info.response[0].reach.age.map(data=>{
                                    return <tr>
                                        <td>{data.value}</td>
                                        <td>{data.count}</td>
                                        </tr>
                                })}
                            </tbody>
                        </table>

                    <table className='table'>
                        <thead>
                            <th>Город</th>
                            <th>Кол-во</th>
                        </thead>
                        <tbody>
                            {info.response[0].reach.cities.map(data=>{
                                return <tr>
                                    <td>{data.name}</td>
                                    <td>{data.count}</td>
                                </tr>
                                
                            })}
                        </tbody>
                    </table>
                    <table className='table'>
                            <thead>
                                <th>Страна</th>
                                <th>Кол-во</th>
                            </thead>
                            <tbody>
                                {info.response[0].reach.countries.map(data=>{
                                    return <tr>
                                        <td>{data.name}</td>
                                        <td>{data.count}</td>
                                        </tr>
                                })}
                            </tbody>
                        </table>
                    
                    <table className='table'>
                            <thead>
                                <th>Пол</th>
                                <th>Кол-во</th>
                            </thead>
                            <tbody>
                                {info.response[0].reach.sex_age.map(data=>{
                                    return <tr>
                                        <td>{data.value}</td>
                                        <td>{data.count}</td>
                                        </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div></>}</>
         default: return<></>
    }
    })()}
    </>
  );
}

export default StatisticGroupPage;