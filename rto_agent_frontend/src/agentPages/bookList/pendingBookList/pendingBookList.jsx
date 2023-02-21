import './pendingBookList.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from "react-redux";
// import { dealerList } from "../../../action/agentAction/agentAction"
import { useNavigate } from "react-router-dom";
import { dealerList } from "../../../action/agentAction/agentAction";

function PendingBookList() {
    const [stateOfBook, setStateOfBook] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const totalRows = 10
    const data = useSelector((state) => state.dealerList.state);
    const totalRows = useSelector((state) => state.dealerList.totalRows);
    React.useEffect(() => {
        dispatch(dealerList(page + 1, rowsPerPage))
    }, [dispatch, setRowsPerPage, setPage])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(dealerList(newPage + 1, rowsPerPage))
    };

    const handleChangeRowsPerPage = (event) => {
        console.log('>>><<,', page, rowsPerPage);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log('>>>????', page, parseInt(event.target.value, 10));
        dispatch(dealerList(page + 1, parseInt(event.target.value, 10)))
    };

    const handleClickTable = (id) => {
        navigate(`/dealer/${id}`)
    }

    return (
        <div className='pendingTableWrapper'>
            <div className='pendingTableContainer'>
                <div className='flex justify-center w-full'>
                    <div className='tableHeader flex justify-between'>
                        <div>
                            Book List
                        </div>
                        <div>
                            {totalRows}
                        </div>
                    </div>
                </div>
                <div className='tabContainer content-center grid gap-2 grid-cols-12'>
                    <div className='col-span-8 flex tabWrapper'>
                        <div className={`${stateOfBook == 0 ? 'tabActive pink' : 'tab'}`}>
                            <button className={`${stateOfBook == 0 ? 'tabTextActive ' : 'tabText'}`} onClick={() => setStateOfBook(0)}>
                                Pendding
                            </button>
                        </div>
                        <div className={`${stateOfBook == 2 ? 'tabActive yellow' : 'tab'}`}>
                            <button className={`${stateOfBook == 2 ? 'tabTextActive' : 'tabText'}`} onClick={() => setStateOfBook(2)}>
                                Appointment
                            </button>
                        </div>
                        <div className={`${stateOfBook == 3 ? 'tabActive green' : 'tab'}`}>
                            <button className={`${stateOfBook == 3 ? 'tabTextActive' : 'tabText'}`} onClick={() => setStateOfBook(3)}>
                                Complete
                            </button>
                        </div>
                    </div>
                </div>
                <div className='tableContainerWrapper'>
                    <TableContainer sx={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', paddingLeft: '10px', paddingRight: '10px' }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Firm Name</TableCell>
                                    <TableCell align="left">Dealer Name</TableCell>
                                    <TableCell align="center">Dealer Code</TableCell>
                                    <TableCell align="right">Phone Number</TableCell>
                                    <TableCell align="right">Whatsapp Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((row, index) => (
                                    <TableRow
                                        key={row.dealerId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={() => handleClickTable(row.dealerId)}
                                        style={{ cursor: "pointer" }}
                                        className='tableRow'
                                    >
                                        <TableCell align="left">{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.dealerFirmName}
                                        </TableCell>
                                        <TableCell align="left">{row.dealerName}</TableCell>
                                        <TableCell align="center">{row.dealerDisplayName}</TableCell>
                                        <TableCell align="right">{row.dealerMobileNumber}</TableCell>
                                        <TableCell align="right">{row.dealerWhatsAppNumber}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={totalRows}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            </div>

        </div>
    )
}

export default PendingBookList;