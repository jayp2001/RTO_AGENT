import './dealerDetail.css';
import * as React from 'react';
import CountCard from '../dashboard/components/countCard/countCard';
import { useDispatch, useSelector } from "react-redux";
// import { dealerDetail } from ' action/agentAction/agentAction';
import { dealerDetail } from '../../action/agentAction/agentAction';
import { useParams } from 'react-router-dom';
import PendingBookList from '../bookList/pendingBookList/pendingBookList';
function DealerDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    var data = useSelector((state) => state.dealerDetail.state);
    React.useEffect(() => {
        dispatch(dealerDetail(id))
    }, [dispatch])
    // if (!data) {
    //     data = []
    // }
    console.log(data)
    return (
        <div className='dealerDetailWrapper'>
            <div className='card_wrapper_dealer flex justify-between'>
                <div className='dealerDetailContainer'>
                    <div className='dealerDetailHeader flex items-center'>
                        <div className="grid justify-items-center w-full">
                            <div className="header_text">
                                Dealer Detail
                            </div>
                        </div>
                    </div>
                    {data &&
                        <div className='detailWrapper'>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Firm Name
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {data[0].dealerFirmName}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Dealer Name
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {data[0].dealerName}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Dealer Code
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {data[0].dealerDisplayName}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Phone no.
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {data[0].dealerMobileNumber}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Whatsapp no.
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {data[0].dealerWhatsAppNumber}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Email Id
                                </div>
                                <div className='emailIdValue col-span-6 col-start-6'>
                                    {data[0].dealerEmailId}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Firm Address
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {data[0].Address}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    City/State
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {data[0].StateandCity}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    pincode
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {data[0].dealerFirmPincode}
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className='countCardWrapper'>
                    <div className='h w-full flex justify-between'>
                        <div className='w-2/4'>
                            <CountCard color="black" />
                        </div>
                        <div className='w-2/4 flex justify-end'>
                            <CountCard color="blue" />
                        </div>
                    </div>
                    <div className='h-full w-full flex justify-between'>
                        <div className='w-2/4'>
                            <CountCard color="green" />
                        </div>
                        <div className='w-2/4 flex justify-end'>
                            <CountCard color="pink" />
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <PendingBookList />
            </div>
        </div>
    )
}
export default DealerDetail;