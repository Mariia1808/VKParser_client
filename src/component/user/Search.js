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
import { getFaculties, getSchools, getCities, getRegions, getCountries, getUniversities, resolveScreenName } from '../../http/API_other';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';


const UserSearchPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
      setValue(newValue);
      setInfo(null)
    };

    const [selectedFields, setSelectedFields] = useState(null)
    let fields = [{value: 'education,universities,schools,career,', label:'Образование'},
    {value: 'can_be_invited_group,can_see_all_posts,can_see_audio,can_send_friend_request,blacklisted,blacklisted_by_me', label:'Приватность'},
    {value: 'nickname,relation,relatives,timezone,maiden_name,military,home_town,verified,followers_count,country,site,personal,about', label:'Общее'},
    {value: 'books,movies,music,games,interests,tv,activities', label:'Интересы'},
    {value: 'common_count,connections,contacts,crop_photo,domain,exports,quotes,has_photo,has_mobile,,photo_100,status,is_favorite,occupation,online,photo_id', label:'Прочее'}]



    const [selectedSort, setSelectedSort] = useState(null)
    let sort = [{value:1, label:'по дате регистрации'},{value:0, label:'по популярности'}]
    const [selectedSex, setSelectedSex] = useState(null)
    let sex = [{value:1, label:'женский'},{value:2, label:'мужской'},{value:0, label:'любой'}]
    const [selectedStatus, setSelectedStatus] = useState(null)
    let status = [{value:1, label:'не женат (не замужем)'},{value:2, label:'встречается'},{value:3, label:'помолвлен(-а)'},{value:4, label:'женат (замужем)'},{value:5, label:'всё сложно'},{value:6, label:'в активном поиске'},{value:7, label:'влюблен(-а)'},{value:8, label:'в гражданском браке'}]
    const [selected_from_list, setSelected_from_list] = useState(null)
    let from_list = [{value:'friends ', label:'искать среди друзей'},{value:'subscriptions', label:'искать среди друзей и подписок'}]

    const [name, setName] = useState(null)
    const [NameZapros, setNameZapros] = useState(null)
    const [info, setInfo] = useState(null)
    const [year, setYear] = useState(null)
    const [group_id, set_group_id] = useState(null)
    const [company, set_company] = useState(null)
    const [position, set_position] = useState(null)
    const [age_from, set_age_from] = useState(null)
    const [age_to, set_age_to] = useState(null)
    const [birth_day, set_birth_day] = useState(null)
    const [birth_month, set_birth_month] = useState(null)
    const [birth_year, set_birth_year] = useState(null)
    const [error, setError] = useState(null)
    
    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send = async () =>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
            let field = `bdate,can_post,city,screen_name,friend_status,can_write_private_message,sex,`
            if(selectedFields!=null)
            {selectedFields.map((data,index)=> field=field+String(data.value)+',')}

            let ids = ``
            if((group_id!==null)||(group_id!==''))
            {
                const id = await resolveScreenName(decodedData.token, group_id)
                if(id!==''){
                    if(id[0].type==='group'){
                        ids = id[0].object_id
                    }else{
                        ids = null
                    }
                }else{
                    ids=null
                }
            }
            
            let Name = (name===''? null:name)
            let Field = (field===''? null:field)
            let Year = (year===''? null:year)
            let Company = (company===''? null:company)
            let Position = (position===''? null:position)
            let Age_from = (age_from===''? null:age_from)
            let Age_to = (age_to===''? null:age_to)
            let Birth_day = (birth_day===''? null:birth_day)
            let Birth_month = (birth_month===''? null:birth_month)
            let Birth_year = (birth_year===''? null:birth_year)

            let Sort = (selectedSort===null? null : selectedSort.value)
            let City = (selectedCity===null? null : selectedCity.value)
            let Sex = (selectedSex===null? null : selectedSex.value)
            let FromList = (selected_from_list===null? null : selected_from_list.value)
            let University = (selectedUnivercity===null? null : selectedUnivercity.value)
            let School = (selectedSchool===null? null : selectedSchool.value)
            let Facults = (selectedFacults===null? null : selectedFacults.value)
            let Status = (selectedStatus===null? null:selectedStatus.value)

            if(value==="1"){
                const data = await searchUserAll(decodedData.token, Name, Sort, Field, City, Sex, Status, Age_from, Age_to, Birth_day, Birth_month, Birth_year, ids, FromList).finally(()=>setLoading(false))
                setInfo(data)
            }
            if(value==="2"){
                const data = await searchUserSchool(decodedData.token, Name, Sort, Field, Sex, Age_from, Age_to, ids, FromList, School, Year).finally(()=>setLoading(false))
                setInfo(data)
            }
            if(value==="3"){
                const data = await searchUserUniversity(decodedData.token, Name, Sort, Field, Sex, Age_from, Age_to, ids, FromList, University, Year, Facults).finally(()=>setLoading(false))
                setInfo(data)
            }
            if(value==="4"){
                const data = await searchUserWork(decodedData.token, Name, Sort, Field, City, Sex, Age_from, Age_to, ids, FromList, Company, Position).finally(()=>setLoading(false))
                setInfo(data)
            }
        }else{
            setOpen_error(true)
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

    let [school, setSchool] = useState([])
    const get_school = async () =>{
        if(selectedCity!==null){
            const data = await getSchools(decodedData.token, selectedCity.value)
            school = data.response.items.map((item) => {return {value: item.id, label: item.title,}})
            setSchool(school)
            setT(!t)
            console.log(school)
        }
        
    }

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedUnivercity, setSelectedUnivercity] = useState(null)
    const [selectedFacults, setSelectedFacults] = useState(null)
    const [selectedSchool, setSelectedSchool] = useState(null)

    const [open, setOpen] = useState(false);
    const Save = async ()=>{
        const data = await SaveHistory(JSON.stringify(info.response.items), NameZapros, parseInt(decodedData.id))
        if(data.response==='no_error'){
            setOpen(true)
        }
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
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
            <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите запрос, например Иван Петров" />  
            <TextField className='text' id="filled-basic" onChange={e=>set_group_id(e.target.value)} label="Введите короткое имя группы" />  
            <Select className='select' placeholder='Выберите способ сортировки' defaultValue={selectedSort} onChange={setSelectedSort} options={sort} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите пол' defaultValue={selectedSex} onChange={setSelectedSex} options={sex} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите где искать' defaultValue={selected_from_list} onChange={setSelected_from_list} options={from_list} closeMenuOnSelect={false} />
            <div className='bdiv'>
                <TextField id="filled-number"  label="Возраст от" onChange={(e) => set_age_from(e.target.value)} type="number" step={1} min={0}/>
                <TextField id="filled-number"  label="Возраст до" onChange={(e) => set_age_to(e.target.value)} type="number" step={1} min={0}/>
            </div>
            <div className='bdiv'>
                <TextField id="filled-number" className='birth' label="День рож." onChange={(e) => set_birth_day(e.target.value)} type="number" step={1} min={0}/>
                <TextField id="filled-number" className='birth' label="Месяц рож." onChange={(e) => set_birth_month(e.target.value)} type="number" step={1} min={0}/>
                <TextField id="filled-number" className='birth' label="Год рож." onChange={(e) => set_birth_year(e.target.value)} type="number" step={1} min={0}/>
            </div>
            <Select className='select' placeholder='Выберите семейное положение' defaultValue={selectedStatus} onChange={setSelectedStatus} options={status} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedFields} onChange={setSelectedFields} options={fields} isMulti closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите страну' defaultValue={selectedCountry} onChange={setSelectedCountry} onMenuClose={(e)=>get_region()} options={countries} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} onMenuClose={(e)=>get_city()} options={regions} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите город' defaultValue={selectedCity} onChange={setSelectedCity} options={cities} closeMenuOnSelect={false} />
            <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
            </div>
        </TabPanel>
        {/* школа */}
        <TabPanel value="2">
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
            <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите запрос, например Иван Петров" />  
            <TextField className='text' id="filled-basic" onChange={e=>set_group_id(e.target.value)} label="Введите короткое имя группы" />  
            <Select className='select' placeholder='Выберите способ сортировки' defaultValue={selectedSort} onChange={setSelectedSort} options={sort} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите пол' defaultValue={selectedSex} onChange={setSelectedSex} options={sex} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите где искать' defaultValue={selected_from_list} onChange={setSelected_from_list} options={from_list} closeMenuOnSelect={false} />
            <div className='bdiv'>
                <TextField id="filled-number"  label="Возраст от" onChange={(e) => set_age_from(e.target.value)} type="number" step={1} min={0}/>
                <TextField id="filled-number"  label="Возраст до" onChange={(e) => set_age_to(e.target.value)} type="number" step={1} min={0}/>
            </div>
            <Select className='select' placeholder='Выберите способ сортировки' defaultValue={selectedSort} onChange={setSelectedSort} options={sort} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите пол' defaultValue={selectedSex} onChange={setSelectedSex} options={sex} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите где искать' defaultValue={selected_from_list} onChange={setSelected_from_list} options={from_list} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedFields} onChange={setSelectedFields} options={fields} isMulti closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите страну' defaultValue={selectedCountry} onChange={setSelectedCountry} onMenuClose={(e)=>get_region()} options={countries} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} onMenuClose={(e)=>get_city()} options={regions} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите город' defaultValue={selectedCity} onChange={setSelectedCity} onMenuClose={(e)=>get_school()} options={cities} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите школу' defaultValue={selectedSchool} onChange={setSelectedSchool} options={school} closeMenuOnSelect={false} />
            <TextField className='text' id="filled-basic" onChange={e=>setYear(e.target.value)} label="Введите год окончания" /> 
            <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
            </div>
        </TabPanel>
        {/* универ */}
        <TabPanel value="3">
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
            <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите запрос, например Иван Петров" />  
            <TextField className='text' id="filled-basic" onChange={e=>set_group_id(e.target.value)} label="Введите короткое имя группы" />  
            <Select className='select' placeholder='Выберите способ сортировки' defaultValue={selectedSort} onChange={setSelectedSort} options={sort} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите пол' defaultValue={selectedSex} onChange={setSelectedSex} options={sex} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите где искать' defaultValue={selected_from_list} onChange={setSelected_from_list} options={from_list} closeMenuOnSelect={false} />
            <div className='bdiv'>
                <TextField id="filled-number"  label="Возраст от" onChange={(e) => set_age_from(e.target.value)} type="number" step={1} min={0}/>
                <TextField id="filled-number"  label="Возраст до" onChange={(e) => set_age_to(e.target.value)} type="number" step={1} min={0}/>
            </div>
            <Select className='select' placeholder='Выберите способ сортировки' defaultValue={selectedSort} onChange={setSelectedSort} options={sort} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите пол' defaultValue={selectedSex} onChange={setSelectedSex} options={sex} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите где искать' defaultValue={selected_from_list} onChange={setSelected_from_list} options={from_list} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedFields} onChange={setSelectedFields} options={fields} isMulti closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите страну' defaultValue={selectedCountry} onChange={setSelectedCountry} onMenuClose={(e)=>get_region()} options={countries} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} onMenuClose={(e)=>get_city()} options={regions} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите город' defaultValue={selectedCity} onChange={setSelectedCity} onMenuClose={(e)=>get_universities()} options={cities} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите университет' defaultValue={selectedUnivercity} onChange={setSelectedUnivercity} onMenuClose={(e)=>get_facults()} options={universities} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите институт' defaultValue={selectedFacults} onChange={setSelectedFacults} options={facults} closeMenuOnSelect={false} />
            <TextField className='text' id="filled-basic" onChange={e=>setYear(e.target.value)} label="Введите год окончания" /> 
            <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
            </div>
        </TabPanel>
        {/* работа */}
        <TabPanel value="4">
            <TextField className='text' id="filled-basic" onChange={e=>setNameZapros(e.target.value)} label="Введите название запроса*" />
            <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   Вы не ввели название запроса
            </Alert>
        </Collapse>
            <TextField className='text' id="filled-basic" onChange={e=>setName(e.target.value)} label="Введите запрос, например Иван Петров" /> 
            <TextField className='text' id="filled-basic" onChange={e=>set_group_id(e.target.value)} label="Введите короткое имя группы" />  
            <Select className='select' placeholder='Выберите способ сортировки' defaultValue={selectedSort} onChange={setSelectedSort} options={sort} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите пол' defaultValue={selectedSex} onChange={setSelectedSex} options={sex} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите где искать' defaultValue={selected_from_list} onChange={setSelected_from_list} options={from_list} closeMenuOnSelect={false} />
            <div className='bdiv'>
                <TextField id="filled-number"  label="Возраст от" onChange={(e) => set_age_from(e.target.value)} type="number" step={1} min={0}/>
                <TextField id="filled-number"  label="Возраст до" onChange={(e) => set_age_to(e.target.value)} type="number" step={1} min={0}/>
            </div>
            <Select className='select' placeholder='Выберите способ сортировки' defaultValue={selectedSort} onChange={setSelectedSort} options={sort} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите пол' defaultValue={selectedSex} onChange={setSelectedSex} options={sex} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите где искать' defaultValue={selected_from_list} onChange={setSelected_from_list} options={from_list} closeMenuOnSelect={false} /> 
            <Select className='select' placeholder='Выберите поля, которые необходимо вернуть' defaultValue={selectedFields} onChange={setSelectedFields} options={fields} isMulti closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите страну' defaultValue={selectedCountry} onChange={setSelectedCountry} onMenuClose={(e)=>get_region()} options={countries} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите регион' defaultValue={selectedRegion} onChange={setSelectedRegion} onMenuClose={(e)=>get_city()} options={regions} closeMenuOnSelect={false} />
            <Select className='select' placeholder='Выберите город' defaultValue={selectedCity} onChange={setSelectedCity} options={cities} closeMenuOnSelect={false} />
            <TextField className='text' id="filled-basic" onChange={e=>set_company(e.target.value)} label="Введите название компании" />
            <TextField className='text' id="filled-basic" onChange={e=>set_position(e.target.value)} label="Введите должность" /> 
            
            <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
            </div>
        </TabPanel>
      </TabContext>
    </div>
    {(() => {
        switch (info!=null) {
            case true:
                return <>{info.response===undefined?
                    <div className='content con'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                        :<><div className='content con w'>
                <div className='shapka'>
                    <div>
                        <label>Найдено пользователей: </label><label className='war'>{info.response.count}</label>
                    </div>
                    <div>
                        <CsvLink data={info.response.items} fileName={NameZapros} >
                            <IconButton color="primary" variant="outlined">
                                <SaveAltIcon/>
                            </IconButton>
                        </CsvLink>
                        <IconButton color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
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
                    <th>Короткое имя</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Пол</th>
                    <th>Приватность профиля</th>
                    <th>Дата Рожд.</th>
                    <th>Город</th>
                    <th>Друзья</th>
                    <th>Написать в ЛС</th>
                    <th>Оставить запись</th>
                </thead>
                <tbody>
                {info.response.items.map((data, index)=>{
                    return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td>{data.screen_name}</td>
                        <td>{data.first_name}</td>
                        <td>{data.last_name}</td>
                        <td>{(() => {
                                switch (data.sex) {
                                case 1: return <>Женский</>
                                case 2: return <>Мужской</>
                                default: return <>-</>
                                }
                            })()}</td>
                        <td>{(() => {
                                switch (data.can_access_closed) {
                                case true: return <>Открыт</>
                                default: return <>Закрыт</>
                                }
                            })()}</td>
                        <td>{(() => {
                                switch (data.bdate!=undefined) {
                                case true: return <>{data.bdate}</>
                                default: return <>-</>
                                }
                            })()}</td>
                        <td>{(() => {
                                switch (data.city!=undefined) {
                                case true: return <>{data.city.title}</>
                                default: return <>-</>
                                }
                            })()}</td>
                            <td>{(() => {
                                switch (Number(data.friend_status)) {
                                case 3: return <>да</>
                                case 2: return <>подписан</>
                                case 1: return <>исходящяя заявка</>
                                default: return <>нет</>
                                }
                            })()}</td>
                            <td>{(() => {
                                switch (data.can_write_private_message) {
                                case 1: return <>можно</>
                                default: return <>нельзя</>
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
            </div>
            </>}</>
            default:
                return <></>
            }
        })()} 
</>
  );
}

export default UserSearchPage;