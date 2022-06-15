
import React from 'react';
import { useLocation } from 'react-router-dom';
import OtherCountryPage from '../component/other/Country';
import OtherRegionsPage from '../component/other/Regions';
import OtherCityPage from '../component/other/City';
import OtherUniversitiesPage from '../component/other/Universites';
import OtherFacultiesPage from '../component/other/Faculties';
import OtherIdentifikatorPage from '../component/other/Identifikator';
import OtherSholdLinkPage from '../component/other/SholdLink';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const OtherPage = () =>{

    const location = useLocation()
    

  return ( 
<>{localStorage.length!==0?
    <div className="content_wall">
        {console.log(location.pathname)}
        {(() => {
                switch (location.pathname) {
                case '/other/get_country':
                    return <OtherCountryPage/>
                case '/other/get_regions':
                    return <OtherRegionsPage/>
                case '/other/get_city':
                    return <OtherCityPage/>
                case '/other/get_universities':
                    return <OtherUniversitiesPage/>
                case '/other/get_faculties':
                    return <OtherFacultiesPage/>
                case '/other/get_identifikator':
                    return <OtherIdentifikatorPage/>
                case '/other/get_shold_link':
                    return <OtherSholdLinkPage/>
                default:
                    return <></>
                }
            })()}
        
    </div>
    :
    <div className="content content_wall c">
        <label>Перед началом работы необходимо авторизоваться.</label><br/>
        <Button className='button' variant="outlined" endIcon={<LoginIcon />}><a href='https://oauth.vk.com/authorize?client_id=8143523&revoke=1&redirect_uri=http://localhost:3000/main&display=page&scope=friends,offline,photos,audio,video,wall,groups,email,stats,ads,market&response_type=code'>Вход</a></Button>
        <br/><label><label className='war'>ВАЖНО:</label> необходимо передоставить права ко всем пунктам, в том числе к email.
        Даже если ваш текущий email другой, он необходим для создания личного кабинета.</label>
    </div>
 }
</>
  );
}

export default OtherPage;