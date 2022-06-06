
import React from 'react';
import { useLocation } from 'react-router-dom';
import OtherCountryPage from '../component/other/Country';
import OtherRegionsPage from '../component/other/Regions';
import OtherCityPage from '../component/other/City';
import OtherUniversitiesPage from '../component/other/Universites';
import OtherFacultiesPage from '../component/other/Faculties';
import OtherIdentifikatorPage from '../component/other/Identifikator';
import OtherSholdLinkPage from '../component/other/SholdLink';


const OtherPage = () =>{

    const location = useLocation()
    

  return (
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
  );
}

export default OtherPage;