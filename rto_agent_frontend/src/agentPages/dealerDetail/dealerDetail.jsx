import './dealerDetail.css';
import * as React from 'react';
import CountCard from '../dashboard/components/countCard/countCard';
import { useDispatch, useSelector } from "react-redux";
import { dealerDetail, dealerBookList, exportExcel } from '../../action/agentAction/agentAction';
import { useParams } from 'react-router-dom';
import DealerBookList from '../dealerBookList/dealerBookList';
import BookList from '../bookList/bookList';
function DealerDetail() {
    const [filter, setFilter] = React.useState({
        searchOption: 20,
        startDate: null,
        endDate: null,
        dealerId: null,
        type: null
    });
    const [stateOfBook, setStateOfBook] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    let { id } = useParams();
    const dispatch = useDispatch();
    var detaildata = useSelector((state) => state.dealerDetail.state);
    const data = useSelector((state) => state.dealerBookList.state);
    const totalRows = useSelector((state) => state.dealerBookList.totalRows);

    React.useEffect(() => {
        dispatch(dealerDetail(id))
        // dispatch(dealerBookList(page + 1, rowsPerPage, filter, stateOfBook, id))
    }, [dispatch])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(dealerBookList(newPage + 1, rowsPerPage, filter, stateOfBook, id))
    };

    const handleChangeRowsPerPage = (event) => {
        console.log('>>><<,', page, rowsPerPage);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log('>>>????', page, parseInt(event.target.value, 10));
        dispatch(dealerBookList(page + 1, parseInt(event.target.value, 10), filter, stateOfBook, id))
    };

    const handleExport = () => {
        // console.log(">>>>LLL")
        dispatch(exportExcel(filter, stateOfBook));
    }

    const applyFilter = () => {
        dispatch(dealerBookList(page + 1, rowsPerPage, filter, stateOfBook, id))
    }

    const resetFilter = () => {
        setFilter({
            searchOption: 20,
            startDate: null,
            endDate: null,
            dealerId: null,
            type: null
        })
    }

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
                    {detaildata &&
                        <div className='detailWrapper'>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Firm Name
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata[0].dealerFirmName}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Dealer Name
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata[0].dealerName}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Dealer Code
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata[0].dealerDisplayName}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Phone no.
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata[0].dealerMobileNumber}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Whatsapp no.
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata[0].dealerWhatsAppNumber}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Email Id
                                </div>
                                <div className='emailIdValue col-span-6 col-start-6'>
                                    {detaildata[0].dealerEmailId}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    Firm Address
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata[0].Address}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    City/State
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata[0].StateandCity}
                                </div>
                            </div>
                            <div className='grid grid-cols-12 rowWrapper'>
                                <div className='title col-span-3 col-start-2'>
                                    pincode
                                </div>
                                <div className='value col-span-6 col-start-6'>
                                    {detaildata[0].dealerFirmPincode}
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