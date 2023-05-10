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
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../type/url';

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

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const WhatsAppSend = async (Id) => {
            if(window.confirm('Are you sure want to send ?')){
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(
                    `${BACKEND_BASE_URL}whatsApprouter/sendReceiptOnWapp?vehicleRegistrationId=${Id}`,
                    config
                );
            }
        };

    if (!data) {
        return null
    }
    const keys = Object.keys(data);
    return (<>
        <div className='vehicleDetailContainer grid grid-cols-12 gap-6'>
            <div className='col-span-9 grid gap-14'>
                {data ? keys.map((key) => (
                    <>
                    { key !== 'TTO Form Link' && key !== 'Receipt Id'?
                        <DetailCard header={key} data={data[key]} />:null
                    }
                    </>
                ))
                    : null}
            </div>
            <div className='sidebarContainer col-span-3'>
                <div className='sideBarbtn'>
                    <div className="grid grid-rows-5  grid-flow-col gap-3">
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
                            {
                                (keys.includes("Receipt Id")) === true ?
                                <div className='btnPink printdiv justify-self-center'>
                                    <a href={data['Receipt Id']['receiptURL']} target="_blank">
                                        <button className='btnPrintTTO'>
                                        <RemoveRedEyeOutlinedIcon />&nbsp;View Receipt
                                        </button>
                                    </a>
                                </div>
                                    :
                                    null
                            }
                            {
                                (keys.includes("Receipt Id")) === true ?

                                        <div className='btnGreen printdiv justify-self-center'>
                                            <button className='btnSendMsg' onClick={()=>WhatsAppSend(id)}><WhatsAppIcon />&nbsp;Send Whatsapp</button>
                                        </div>
                                    
                                    :
                                    null
                            }   
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