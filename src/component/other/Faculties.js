import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getFaculties, getCountries, getCities, getRegions, getUniversities } from '../../http/API_other';
import Select from 'react-select';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

const OtherFacultiesPage = () =>{
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
    const get_region = async() =>{
        const data = await getRegions(decodedData.token, selectedCountry.value)
        console.log(data)
        if(data.response.items.length!==0){
            regions = data.response.items.map((item) => {
            return {
                value: item.id,
                label: item.title,
            }
            })
            setRegions(regions)
            setT(true)
        }
        
        
        console.log(regions)
    }

    let [cities, setCities] = useState([])
    const [city, setCity] = useState([])
    const get_city = async () =>{
        const data = await getCities(decodedData.token, selectedCountry.value, selectedRegion.value)
        cities = data.map((item) => {
            return {
                value: item.id,
                label: item.title,
            }
            
        })
        setCities(cities)
        setT(true)
        console.log(cities)
    }
    let [universities, setUniversity] = useState([])
    const [universite, setUniversites] = useState([])
    const get_universities = async () =>{
        const data = await getUniversities(decodedData.token, selectedCountry.value, selectedCity.value)
        universities = data.response.items.map((item) => {
            return {
                value: item.id,
                label: item.title,
            }
        })
        setUniversity(universities)
        setT(!t)
        console.log(universities)
    }
    const [facults, setFacults] = useState(null)
    const [loading, setLoading]=useState(false)
    const Send = () =>{
        setLoading(true)
        let SelectedUnivercity = (selectedUnivercity===null? null:selectedUnivercity.value)
        getFaculties(decodedData.token, SelectedUnivercity).then(data => setFacults(data)).finally(()=>setLoading(false))
    }

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedUnivercity, setSelectedUnivercity] = useState(null)

  return (
    <>
    <div className='content con'>
        <h3 className='h'>Институты/факультеты</h3>
        <Select className='select' placeholder='Выберите страну' defaultValue={selectedCountry} onChange={setSelectedCountry} onMenuClose={(e)=>get_region()} options={countries} closeMenuOnSelect={false} />
        <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} onMenuClose={(e)=>get_city()} options={regions} closeMenuOnSelect={false} />
        <Select className='select' placeholder='Выберите город' defaultValue={selectedCity} onChange={setSelectedCity} onMenuClose={(e)=>get_universities()} options={cities} closeMenuOnSelect={false} />
        <Select className='select' placeholder='Выберите университет' defaultValue={selectedUnivercity} onChange={setSelectedUnivercity} options={universities} closeMenuOnSelect={false} />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
    </div>
    {(() => {
            switch (facults!=null) {
            case true:
                return <>{facults.response===undefined?
                    <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                        :<><div className='content con w'>
                    <label>Найдено <label className='war'>{facults.response.count}</label> институтов/факультетов </label>
                <table className='table'>
                    <thead>
                        <th>№</th>
                        <th>ID</th>
                        <th>Название</th>
                    </thead>
                    <tbody>
                        {facults.response.items.map((data, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{data.id}</td>
                            <td>{data.title}</td>
                        </tr>
                        })}
                    </tbody>
                </table>
                </div>
                </>}</>
            default: return<></>
        }
        })()}
    </>
  );
}

export default OtherFacultiesPage;