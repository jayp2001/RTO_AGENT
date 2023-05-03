import './dealerDetail.css';
import * as React from 'react';
import CountCard from '../dashboard/components/countCardDetail/countCardDetail';
import { useDispatch, useSelector } from "react-redux";
import { dealerDetail, dealerBookList, exportExcel } from '../../action/agentAction/agentAction';
import { useParams } from 'react-router-dom';
import DealerBookList from '../dealerBookList/dealerBookList';

function DealerDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    var detaildata = useSelector((state) => state.dealerDetail.state);

    React.useEffect(() => {
        dispatch(dealerDetail(id))
    }, [dispatch])

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
                    {detaildata && detaildata.Dealerdetails &&
                        <div className='detailWrapper'>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Firm Name
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata.Dealerdetails.dealerFirmName}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Dealer Name
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata.Dealerdetails.dealerName}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Dealer Code
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata.Dealerdetails.dealerDisplayName}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Phone no.
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata.Dealerdetails.dealerMobileNumber}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Whatsapp no.
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata.Dealerdetails.dealerWhatsAppNumber}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Email Id
                                </div>
                                <div className='emailIdValue col-span-6 col-start-6'>
                                    {detaildata.Dealerdetails.dealerEmailId}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Firm Address
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata.Dealerdetails.Address}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    City/State
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata.Dealerdetails.StateandCity}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    pincode
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata.Dealerdetails.dealerFirmPincode}
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className='countCardWrapper'>
                    <div className='h w-full flex justify-between'>
                        <div className='w-2/4'>
                            <CountCard color="black" data={detaildata && detaildata.DealerCounterdetails ? detaildata.DealerCounterdetails.TotalBooksOfDealer : ''} description={"Total Book"} icon={"allBook"} />
                        </div>
                        <div className='w-2/4 '>
                            <CountCard color="orange" data={detaildata && detaildata.DealerCounterdetails ? detaildata.DealerCounterdetails.PendingBooksOfDealer : ''} description={"Total Pending"} icon={"pending"} />
                        </div>


                    </div>
                    <div className='h w-full flex justify-between'>
                        <div className='w-2/4'>
                            <CountCard color="blue" data={detaildata && detaildata.DealerCounterdetails ? detaildata.DealerCounterdetails.LastMonthBooksOfDealer : ''} description={"Last Month"} icon={"lastMonth"} />
                        </div>
                        <div className='w-2/4 '>
                            <CountCard color="yellow" data={detaildata && detaildata.DealerCounterdetails ? detaildata.DealerCounterdetails.AppointmentBooksOfDealer : ''} description={"Total Appointment"} icon={"appointment"} />
                        </div>

                    </div>
                    <div className='h w-full flex justify-between'>
                        <div className='w-2/4 '>
                            <CountCard color="pink" data={detaildata && detaildata.DealerCounterdetails ? detaildata.DealerCounterdetails.LastUpdatedBooksOfDealer : ''} description={"Last Updated"} icon={"lastUpdated"} />
                        </div>
                        <div className='w-2/4 '>
                            <CountCard color="green" data={detaildata && detaildata.DealerCounterdetails ? detaildata.DealerCounterdetails.CompleteBooksOfDealer : ''} description={"Total Complete"} icon={"complete"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <DealerBookList dealerId={id} />
                {/* <BookList
                    data={data}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    stateOfBook={stateOfBook}
                    setStateOfBook={setStateOfBook}
                    totalRows={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleExport={handleExport}
                    filter={filter}
                    setFilter={setFilter}
                    applyFilter={applyFilter}
                    resetFilter={resetFilter}
                /> */}
            </div>
        </div>
    )
}
export default DealerDetail;