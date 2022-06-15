import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getCountries, getRegions } from '../../http/API_other';
import Select from 'react-select';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
const OtherRegionsPage = () =>{
    
    const [country, setCountry] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)

    
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);
    
    useEffect(() =>{
        getCountries(decodedData.token).then(data => setCountry(data.response.items))
    },[])

    //const [data, setData] = useState(null)
    
    let data = country.map((item) => {
        return {
            value: item.id,
            label: item.title,
        }
    })
      
    const [region, setRegion] = useState(null)
    const [loading, setLoading]=useState(false)
    const Send = () =>{
        setLoading(true)
        console.log(selectedOption)
        let SelectedOption = (selectedOption===null? null:selectedOption.value)
        getRegions(decodedData.token, SelectedOption).then(data => setRegion(data)).finally(()=>setLoading(false))
    }
    

  return (
    <><div className='content con'>
        <h3 className='h'>Регионы</h3>
        <Select className='select' placeholder='Выберите страну' defaultValue={selectedOption} onChange={setSelectedOption} options={data} closeMenuOnSelect={false} />
        <div className='div1'>
            <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                Продолжить
            </LoadingButton>
        </div>
        
    </div>
    
        {(() => {
            switch (region!=null) {
            case true:
                return <>{region.response===undefined?
                    <div className='content con w'><h4>Ничего не найдено, проверьте правильность введенных данных</h4></div>
                        :<><div className='content con w'>
                    <label>Найдено <label className='war'>{region.response.count}</label> региона </label>
                <table className='table'>
                    <thead>
                        <th>№</th>
                        <th>ID</th>
                        <th>Название</th>
                    </thead>
                    <tbody>
                        {region.response.items.map((data, index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{data.id}</td>
                            <td>{data.title}</td>
                        </tr>
                        })}
                    </tbody>
                </table>
                </div></>}</>
            default: return<></>
        }
        })()}
    
</>
  );
}

export default OtherRegionsPage;