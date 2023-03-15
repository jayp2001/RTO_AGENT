import './bookList.css'
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
import { dealerBookList } from "../../action/agentAction/agentAction";
import Menutemp from './menu';

function BookList(props) {

    const navigate = useNavigate();
    const handleClickTable = (id) => {
        navigate(`/vehicleDetail/${id}`)
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
                            {props.totalRows}
                        </div>
                    </div>
                </div>
                <div className='tabContainer content-center grid gap-2 grid-cols-12'>
                    <div className='col-span-8 flex tabWrapper'>
                        <div className={`${props.stateOfBook == 0 ? 'tabActive pink' : 'tab'}`}>
                            <button className={`${props.stateOfBook == 0 ? 'tabTextActive ' : 'tabText'}`} onClick={() => props.setStateOfBook(0)}>
                                Pendding
                            </button>
                        </div>
                        <div className={`${props.stateOfBook == 2 ? 'tabActive yellow' : 'tab'}`}>
                            <button className={`${props.stateOfBook == 2 ? 'tabTextActive' : 'tabText'}`} onClick={() => props.setStateOfBook(2)}>
                                Appointment
                            </button>
                        </div>
                        <div className={`${props.stateOfBook == 3 ? 'tabActive green' : 'tab'}`}>
                            <button className={`${props.stateOfBook == 3 ? 'tabTextActive' : 'tabText'}`} onClick={() => props.setStateOfBook(3)}>
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
                                    <TableCell>Vehicle Registration No</TableCell>
                                    <TableCell align="left">Vehicle Model</TableCell>
                                    <TableCell align="center">Work List</TableCell>
                                    <TableCell align="right">Client Number</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.data?.map((row, index) => (
                                    <TableRow
                                        key={row.dealerId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        style={{ cursor: "pointer" }}
                                        className='tableRow'
                                    >
                                        <TableCell align="left" onClick={() => handleClickTable(row.vehicleRegistrationId)}>{row.serial_number}</TableCell>
                                        <TableCell component="th" scope="row" onClick={() => handleClickTable(row.vehicleRegistrationId)}>
                                            {row.vehicleRegistrationNumber}
                                        </TableCell>
                                        <TableCell align="left" onClick={() => handleClickTable(row.vehicleRegistrationId)}>{row.vehicleModelMake}</TableCell>
                                        <TableCell align="left" onClick={() => handleClickTable(row.vehicleRegistrationId)}>{row.workType}</TableCell>
                                        <TableCell align="right" onClick={() => handleClickTable(row.vehicleRegistrationId)}>{row.clientWhatsAppNumber}</TableCell>
                                        <TableCell align="right">
                                            <Menutemp />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={props.totalRows}
                            rowsPerPage={props.rowsPerPage}
                            page={props.page}
                            onPageChange={props.handleChangePage}
                            onRowsPerPageChange={props.handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            </div>

        </div>
    )
}

export default BookList;