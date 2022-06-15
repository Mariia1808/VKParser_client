import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { statsAppAll } from '../../http/API_statictics';
import LoadingButton from '@mui/lab/LoadingButton';
import {VictoryPie} from 'victory'

const StatisticApplicationPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [name, setName] = useState(null)
    const [info, setInfo] = useState(null)

    const [loading, setLoading]=useState(false)
    const Send = () =>{
        setLoading(true)
        let Name = (name===''? null:name)
        statsAppAll(decodedData.token, Name).then(data=>setInfo(data)).finally(()=>setLoading(false))
    }
    
  return (
<>
    <div className='content con'>
        <h3 className='h'>Статистика приложения</h3>
        <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите идентификатор приложения" />
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
                        :<>{info.response[0].reach.reach===0?
                        <div className='content con'><h4>Данных недостаточно для формирования статиcтики</h4></div>
                        :  
                        <><div>
                <div className='content con'>
                    <h3 className='h'>Активность</h3>
                    <div className='dia'>
                        <VictoryPie data={[{ x: "Лайки: " + info.response[0].activity.likes, y: info.response[0].activity.likes},{ x: "Репосты: " + (info.response[0].activity.copies===undefined? 0 : info.response[0].activity.copies), y: (info.response[0].activity.copies===undefined? 0 : info.response[0].activity.copies)},{ x: "Комментарии: "+info.response[0].activity.comments, y: info.response[0].activity.comments }]} radius={80} colorScale={['#1976d2','#2684ff96','#0b3c6de8']}/>
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
                                        <td>{(() => {
                                                switch (String(data.value)[0]) {
                                                case 'f': return <>жен {String(data.value).slice(2)}</>
                                                case 'm': return <>муж {String(data.value).slice(2)}</>
                                                default: return <>-</>
                                                }
                                            })()}
                                        </td>
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
                                        <td>{(() => {
                                                switch (String(data.value)[0]) {
                                                case 'f': return <>жен {String(data.value).slice(2)}</>
                                                case 'm': return <>муж {String(data.value).slice(2)}</>
                                                default: return <>-</>
                                                }
                                            })()}
                                        </td>
                                        <td>{data.count}</td>
                                        </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div></>}</>}</>
         default: return<></>
    }
    })()}
    </>
  );
}

export default StatisticApplicationPage;