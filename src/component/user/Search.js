
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from "query-string";
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import Select from 'react-select';
import { SaveHistory } from '../../http/API_main';
import { searchUserAll, searchUserSchool, searchUserUniversity, searchUserWork } from '../../http/API_user';
import { getFaculties, getCities, getRegions, getCountries, getUniversities } from '../../http/API_other';

const UserSearchPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [selectedOption, setSelectedOption] = useState(null)

    let data = [{value: 'activities,about,blacklisted,blacklisted_by_me,books,bdate,can_be_invited_group,can_post,can_see_all_posts,can_see_audio',label:'Основные'},
    {value: 'can_send_friend_request,can_write_private_message,career,common_count,connections,contacts,city,country,crop_photo,domain,education,exports',label:'Дополнительные'},
    {value: 'followers_count,friend_status,has_photo,has_mobile,home_town,photo_100,sex,site,schools,screen_name,status,verified,games,interests,is_favorite',label:'Дополнительные1'},
    {value: 'is_friend,is_hidden_from_feed,last_seen,maiden_name,military,movies,music,nickname,occupation,online,personal,photo_id,photo_max,photo_max_orig',label:'Дополнительные2'},
    {value: 'quotes,relation,relatives,timezone,tv,universities',label:'Дополнительные3'}]

    const [name, setName] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [info, setInfo] = useState(null)
    const [year, setYear] = useState(null)
    const [error, setError] = useState(null)
    
    const Send = async () =>{
        let field = `bdate,can_post,city,screen_name,friend_status,can_write_private_message,`
        console.log(field)
        if(selectedOption!=null)
        {selectedOption.map((data,index)=> field=field+String(data.value)+',')}
        if(value===1){
            const data = await searchUserAll(decodedData.token)
            setInfo(data)
        }
        if(value===2){
            const data = await searchUserSchool(decodedData.token)
            setInfo(data)
        }
        if(value===3){
            const data = await searchUserUniversity(decodedData.token)
            setInfo(data)
        }
        if(value===4){
            const data = await searchUserWork(decodedData.token)
            setInfo(data)
        }

    }
    
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
    const get_region = async() =>{
        if(selectedCountry!==null){
            const data = await getRegions(decodedData.token, selectedCountry.value)
            console.log(data)
            if(data.response.items.length!==0){
                regions = data.response.items.map((item) => {return {value: item.id,label: item.title,}})
                setRegions(regions)
                setT(true)
            }
        }
    }

    let [cities, setCities] = useState([])
    const get_city = async () =>{
        if(selectedRegion!==null){
            const data = await getCities(decodedData.token, selectedCountry.value, selectedRegion.value)
            cities = data.map((item) => {return {value: item.id, label: item.title,}})
            setCities(cities)
            setT(true)
            console.log(cities)
        }
    }
    let [universities, setUniversity] = useState([])
    const get_universities = async () =>{
        if(selectedCity!==null){
            const data = await getUniversities(decodedData.token, selectedCountry.value, selectedCity.value)
            universities = data.response.items.map((item) => {return {value: item.id, label: item.title,}})
            setUniversity(universities)
            setT(!t)
            console.log(universities)
        }
        
    }
    let [facults, setFacults] = useState([])
    const get_facults = async () =>{
        if(selectedUnivercity!==null){
            const data = await getFaculties(decodedData.token, selectedCountry.value, selectedCity.value, selectedUnivercity.value)
            facults = data.response.items.map((item) => {return {value: item.id, label: item.title,}})
            setFacults(facults)
            setT(!t)
            console.log(facults)
        }
        
    }

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedUnivercity, setSelectedUnivercity] = useState(null)
    const [selectedFacults, setSelectedFacults] = useState(null)

    const Save =()=>{
        SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id)).then()
    }

  return (
<>
    <div className='content con'>
        <h3 className='h'>Расширенный поиск по пользователям</h3>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Общий поиск" value="1" />
            <Tab label="По школе" value="2" />
            <Tab label="По универу" value="3" />
            <Tab label="По работе" value="4" />
          </TabList>
          {/* общий */}
        <TabPanel value="1">
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите запрос" />  
            <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedOption} onChange={setSelectedOption} options={data} isMulti closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите страну' defaultValue={selectedCountry} onChange={setSelectedCountry} onMenuClose={(e)=>get_region()} options={countries} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} onMenuClose={(e)=>get_city()} options={regions} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите город' defaultValue={selectedCity} onChange={setSelectedCity} options={cities} closeMenuOnSelect={false} />
            <div className='div1'>
                <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
                Продолжить  
                </Button>
            </div>
        </TabPanel>
        {/* школа */}
        <TabPanel value="2">
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите запрос" />  
            <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedOption} onChange={setSelectedOption} options={data} isMulti closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите страну' defaultValue={selectedCountry} onChange={setSelectedCountry} onMenuClose={(e)=>get_region()} options={countries} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} onMenuClose={(e)=>get_city()} options={regions} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите город' defaultValue={selectedCity} onChange={setSelectedCity} onMenuClose={(e)=>get_universities()} options={cities} closeMenuOnSelect={false} />
            
            <div className='div1'>
                <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
                Продолжить  
                </Button>
            </div>
        </TabPanel>
        {/* универ */}
        <TabPanel value="3">
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите запрос" />  
            <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedOption} onChange={setSelectedOption} options={data} isMulti closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите страну' defaultValue={selectedCountry} onChange={setSelectedCountry} onMenuClose={(e)=>get_region()} options={countries} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} onMenuClose={(e)=>get_city()} options={regions} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите город' defaultValue={selectedCity} onChange={setSelectedCity} onMenuClose={(e)=>get_universities()} options={cities} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите университет' defaultValue={selectedUnivercity} onChange={setSelectedUnivercity} onMenuClose={(e)=>get_facults()} options={universities} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите институт' defaultValue={selectedFacults} onChange={setSelectedFacults} options={facults} closeMenuOnSelect={false} />
            <TextField className='text' id="filled-basic" onChange={e=>setYear(e.target.value)} label="Введите год окончания" /> 
            <div className='div1'>
                <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
                Продолжить  
                </Button>
            </div>
        </TabPanel>
        {/* работа */}
        <TabPanel value="4">
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса" />
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите запрос" />  
            <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedOption} onChange={setSelectedOption} options={data} isMulti closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите страну' defaultValue={selectedCountry} onChange={setSelectedCountry} onMenuClose={(e)=>get_region()} options={countries} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} onMenuClose={(e)=>get_city()} options={regions} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите город' defaultValue={selectedCity} onChange={setSelectedCity} options={cities} closeMenuOnSelect={false} />
            
            <div className='div1'>
                <Button className='menu_but button' variant="outlined" onClick={()=>Send()} endIcon={<SendIcon/>}>
                Продолжить  
                </Button>
            </div>
        </TabPanel>
      </TabContext>
    </div>
</>
  );
}

export default UserSearchPage;