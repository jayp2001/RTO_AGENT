import DetailCard from './detailCard/detailCard';
import './vehicleDetail.css'
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { bookDetail } from '../../action/agentAction/agentAction';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { deleteBook } from '../../action/agentAction/agentAction';
import PrintIcon from '@mui/icons-material/Print';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function VehicleDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    var data = useSelector((state) => state.bookDetails.state);
    React.useEffect(() => {
        dispatch(bookDetail(id))
    }, [dispatch])
    console.log(data)
    
    const navigate = useNavigate();
    const handleEditClick = (id) => {
        navigate(`/editVehicleDetail/${id}`)
    }

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure want to delete ?')){
            dispatch(deleteBook(id));
            navigate(`/bookList`)
        }
    }

    if (!data) {
        return null
    }
    const keys = Object.keys(data);
    return (<>
        <div className='vehicleDetailContainer grid grid-cols-12 gap-6'>
            <div className='col-span-9 grid gap-14'>
                {data ? keys.map((key) => (
                    <>
                    { key !== 'TTO Form Link'?
                        <DetailCard header={key} data={data[key]} />:null
                    }
                    </>
                ))
                    : null}
            </div>
            <div className='sidebarContainer col-span-3'>
                <div className='sideBarbtn'>
                    <div className="grid grid-rows-4  grid-flow-col gap-3">
                        {
                                (keys.includes("TTO Form Link")) === true ?
                                <div className='btnYellow printdiv justify-self-center'>
                                        <a href={data['TTO Form Link']['pdfURL']} target="_blank">
                                            <button className='btnPrintTTO'>
                                            <PrintIcon />&nbsp;Print TTO
                                            </button>
                                        </a>
                                    </div>
                                    :
                                    null
                            }
                            {/* <button className='btnPrintTTO'><PrintIcon />&nbsp;Print TTO</button> */}
                        
                        <div className='btnGreen printdiv justify-self-center'>
                            <button className='btnSendMsg'><WhatsAppIcon />&nbsp;Send Whatsapp</button>
                        </div>
                        <div className='btnBlue printdiv justify-self-center'>
                            <button className='btnEdit' onClick={() => handleEditClick(id)}><EditIcon />&nbsp;Edit</button>
                        </div>
                        <div className='btnRed printdiv justify-self-center'>
                            <button className='btnDelete' onClick={() => handleDeleteClick(id)}><DeleteIcon />&nbsp;Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default VehicleDetail;