import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getCitiesById, getCountriesById, getLastShortenedLink } from '../../http/API_other';
import { getLinkStats } from '../../http/API_statictics';
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

const StatisticLinkPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setInfo(null)
    };

    const [link, setLink] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)

    useEffect(() =>{
        getLastShortenedLink(decodedData.token).then(data => setLink(data.response.items))
    },[])
    
    let data = link.map((item) => {
        return {
            value: item.key,
            label: item.short_url,
        }
    })
    const [info, setInfo] = useState(null)
    const [country, setCountry] = useState(null)
    const [city, setCity] = useState(null)
    const [loading, setLoading]=useState(false)
    const Send = async () =>{
        setLoading(true)
        console.log(selectedOption)
        let SelectedOption = (selectedOption===null? null:selectedOption.value)

        const data = await getLinkStats(decodedData.token, SelectedOption).finally(()=>setLoading(false))
        setInfo(data)
        let countries = ``
        let cities = ``
        if(data.response.stats.length!==0){
            data.response.stats[0].countries.map((data, index)=>
                countries = countries+data.country_id+`,`
            )
            const data_country = await getCountriesById(decodedData.token, countries)
            setCountry(data_country.response)
            data.response.stats[0].cities.map(data=>
               cities = cities+data.city_id+`,`
            )
            const data_city = await getCitiesById(decodedData.token, cities)
            setCity(data_city.response)
        }
        console.log(countries)
        console.log(cities)
    }
  return (
<>
    <div className='content con'>
        <h3 className='h'>Статистика сокращенной ссылки</h3>
        <Select className='select' placeholder='Выберите ссылку' defaultValue={selectedOption} onChange={setSelectedOption} options={data} closeMenuOnSelect={false} />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
        {(() => {
        switch ((info!==null)&&(country!==null)&&(city!==null)) {
        case true:
            return <>{info.response===undefined?
                <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                    :<><div className='content con'>{info.response.stats.length!==0?
                <>
                <label>Общее число переходов: <label className='war'>{info.response.stats[0].views}</label></label>
                <table className='table'>
                    <thead>
                        <th>Возраст</th>
                        <th>Муж</th>
                        <th>Жен</th>
                    </thead>
                    <tbody>
                        {info.response.stats[0].sex_age.map((data, index)=>{
                        return <tr>
                            <td>{data.age_range}</td>
                            <td>{data.female}</td>
                            <td>{data.male}</td>
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
                        {info.response.stats[0].countries.map((data, index)=>{
                        return <tr>
                            {country.map(i=>{
                                if(i.id===data.country_id){
                                    return <td>{i.title}</td>
                                }
                            })}
                             <td>{data.views}</td>
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
                        {info.response.stats[0].cities.map((data, index)=>{
                        return <tr>
                            <td>
                            {city.map(i=>{
                                if(i.id===data.city_id){
                                    return <>{i.title}</>
                                }
                            })}</td>
                            <td>{data.views}</td>
                        </tr>
                        })}
                    </tbody>
                </table>
                </>
                :<>Данные о статистике отсутсвуют</>}
            </div></>}</>
        default: return<></>
        }
        })()}
    
</>
  );
}

export default StatisticLinkPage;