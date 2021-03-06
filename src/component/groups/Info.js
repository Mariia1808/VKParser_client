import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import { getById } from '../../http/API_groups';
import { SaveHistory } from '../../http/API_main';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import CsvLink from 'react-csv-export';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import { useParams } from 'react-router-dom';


const GroupsInfoPage = () =>{
    const storedToken = localStorage.getItem("token");
    let decodedData = jwt_decode(storedToken);

    const {params} = useParams()
    const def = (params==='null'? null:JSON.parse(JSON.parse(params)))

    const [name, setName] = useState(def===null?'':def[1].param)
    const [NameZapros, setNameZapros] = useState(def===null?'':def[0].name)
    const [info, setInfo] = useState(null)
    
    const [loading, setLoading]=useState(false)
    const [open_error, setOpen_error] = useState(false);
    const Send = () =>{
        if((NameZapros!==null)&&(NameZapros!=='')){
            setLoading(true)
        let field = `activity, ban_info, can_post,can_see_all_posts,city,contacts,counters,country,cover,description,finish_date,fixed_post,links,members_count,place,site,start_date,status,verified,wiki_page`
        console.log(decodedData.token)
        let Name = (name===''? null:name)
        getById(decodedData.token, Name, field).then(data=>setInfo(data)).finally(()=>setLoading(false))
        }else{
            setOpen_error(true)
        }
        console.log(info)
    }

    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const Save = async ()=>{
        const parameters = JSON.stringify([{'name': NameZapros}, {'param':name}])
        const data = await SaveHistory(JSON.stringify(info.response), NameZapros, parseInt(decodedData.id), parameters, 9)
        if(data.response==='no_error'){
            setOpen(true)
        }else{
            setOpenError(true)
        }
    }
  return (
    <>
    <div className='content con'>
        <h3 className='h'>?????????????????????? ???????????????????? ?? ????????????????????(-????)</h3>
        <div >
            <TextField className='text' id="filled-basic" defaultValue={NameZapros} onChange={e=>setNameZapros(e.target.value)} label="?????????????? ???????????????? ??????????????*" />
            <Collapse in={open_error}>
            <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen_error(false);}}>
                <CloseIcon fontSize="inherit" />
                </IconButton>}sx={{ mb: 2 }}>
                   ???? ???? ?????????? ???????????????? ??????????????
            </Alert>
        </Collapse>
            <TextField className='text' id="filled-basic" defaultValue={name} onChange={e=>setName(e.target.value)} label="?????????????? ?????????????????????????? ?????? ???????????????? ??????" />
            <div className='div1'>
                <LoadingButton onClick={()=>Send()} className='menu_but button' endIcon={<SendIcon/>} loading={loading} loadingPosition="end" variant="outlined"> 
                    ????????????????????
                </LoadingButton>
            </div>
        </div>
    </div>
    {(() => {
        switch (info!=null) {
            case true:
                return <>{info.response===undefined?
                    <div className='content con'><h4>???????????? ???? ??????????????, ?????????????????? ???????????????????????? ?????????????????? ????????????</h4></div>
                        :<><div className='content con p'>
                <div className='shapka'>
                    <div>
                        <label>?????????? ??????????????????: </label><label className='war'>{info.response.length}</label>
                    </div>
                    <div>
                        <CsvLink data={info.response} fileName={NameZapros} >
                            <IconButton title='??????????????' color="primary" variant="outlined">
                                <SaveAltIcon/>
                            </IconButton>
                        </CsvLink>
                        <IconButton title='??????????????????' color="primary" variant="outlined" onClick={()=>Save()}><SaveAsIcon/></IconButton>
                        
                    </div>
                </div>
                <Collapse in={open}>
                    <Alert action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpen(false);}}>
                        <CloseIcon fontSize="inherit" />
                        </IconButton>}sx={{ mb: 2 }}>
                            ???????????? ?????????????? ????????????????
                    </Alert>
                </Collapse>
                <Collapse in={openError}>
                        <Alert severity="error" action={<IconButton aria-label="close" color="inherit" size="small" onClick={() => {setOpenError(false);}}>
                            <CloseIcon fontSize="inherit" />
                            </IconButton>}sx={{ mb: 2 }}>
                            ???????????????????? ?????????????????? ?????????????? ??????????.
                        </Alert>
                    </Collapse>
                <table className='table'>
                <thead>
                    <th>???</th>
                    <th>id</th>
                    <th>???????????????? ??????</th>
                    <th>????????????????</th>
                    <th>????????????????</th>
                    <th>??????</th>
                    <th>??????-???? ??????????????????????</th>
                    <th>?????????????????????? ????????????????????</th>
                    <th>???????????????? ????????????</th>
                </thead>
                <tbody>
                {info.response.map((data, index)=>{
                    return <tr>
                        <td>{index+1}</td>
                        <td>{data.id}</td>
                        <td><>{data.screen_name}</></td>
                        <td>{data.name}</td>
                        <td>{data.activity}</td>
                        <td>{(() => {
                                switch (data.type) {
                                case 'group': return <>????????????</>
                                case 'page': return <>?????????????????? ????????????????</>
                                case 'event': return <>??????????????????????</>
                                default: return <>-</>
                                }
                            })()}</td>
                        <td>{data.members_count}</td>
                        <td>{(() => {
                            switch (data.is_closed) {
                            case 0: return <>????????????????</>
                            case 1: return <>????????????????</>
                            case 2: return <>??????????????</>
                            default: return <>-</>
                            }
                        })()}</td>
                        <td>{(() => {
                            switch (data.can_post) {
                            case 1: return <>??????????</>
                            default: return <>????????????</>
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

export default GroupsInfoPage;