import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getCities, getCountries, getRegions } from '../../http/API_other';
import Select from 'react-select';
import SendIcon from '@mui/icons-material/Send';

const OtherCityPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [country, setCountry] = useState([])
    const [t, setT] = useState(false)

    useEffect(() =>{
        getCountries(decodedData.token).then(data => setCountry(data.response.items))
    },[])
  
    let countries = country.map((item) => {
        return {
            value: item.id,
            label: item.title,
        }
    })
    
    let [regions, setRegions] = useState([])
    const [region, setRegion] = useState([])
    const get_region = async () =>{
        const data = await getRegions(decodedData.token, selectedCountry.value)
        regions = data.response.items.map((item) => {
            return {
                value: item.id,
                label: item.title,
            }
        })
        setRegions(regions)
        setT(!t)
        console.log(regions)
    }

    const [city, setCity] = useState(null)
    const Send = () =>{
        getCities(decodedData.token, selectedCountry.value, selectedRegion.value).then(data => setCity(data))
    }

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedRegion, setSelectedRegion] = useState(null)

  return (
    <>
    <div className='content con'>
        <h3 className='h zag'>Города</h3>
        <Select className='select' placeholder='Выберите страну' defaultValue={selectedCountry} onChange={setSelectedCountry} onMenuClose={()=>get_region()} options={countries} closeMenuOnSelect={false} />
        <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} options={regions} closeMenuOnSelect={false} />
        <div className='div1'>
            <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
            Продолжить  
            </Button>
        </div>
    </div>
    {(() => {
        switch (city!=null) {
        case true:
            return <div className='content con w'>
                <label>Найдено <label className='war'>{city.length}</label> города </label>
            <table className='table'>
                <thead>
                    <th>№</th>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Район</th>
                    <th>Область</th>
                </thead>
                <tbody>
                    {city.map((data, index)=>{
                    return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td>{data.title}</td>
                        <td>{(() => {
                            switch (data.area!==undefined) {
                            case true: return <>{String(data.area).slice(0, -5)}</>
                            default: return <>-</>
                            }
                        })()}</td>
                        <td>{(() => {
                            switch (String(data.region).length<14) {
                            case true: return <>{data.region}</>
                            default: return <>{String(data.region).slice(0, -7)}</>
                            }
                        })()}</td>
                    </tr>
                    })}
                </tbody>
            </table>
            </div>
        default: return<></>
        }
        })()}
    </>
  );
}

export default OtherCityPage;