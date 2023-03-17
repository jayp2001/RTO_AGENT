import './dealerList.css'
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
import { dealerList } from "../../action/agentAction/agentAction"
import { useNavigate } from "react-router-dom";
import Menutemp from './menu';
// import { dealerList } from "../../action/adminAction/adminAction";

function DealerList() {
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
        <div className='tableWrapper'>
            <div className='tableContainer'>
                <div className='flex justify-center w-full'>
                    <div className='tableHeader flex justify-between'>
                        <div>
                            Dealer List
                        </div>
                        <div>
                            {totalRows}
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
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((row, index) => (
                                    <TableRow
                                        key={row.dealerId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        style={{ cursor: "pointer" }}
                                        className='tableRow'
                                    >
                                        <TableCell align="left" onClick={() => handleClickTable(row.dealerId)}>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row" onClick={() => handleClickTable(row.dealerId)}>
                                            {row.dealerFirmName}
                                        </TableCell>
                                        <TableCell align="left" onClick={() => handleClickTable(row.dealerId)}>{row.dealerName}</TableCell>
                                        <TableCell align="center" onClick={() => handleClickTable(row.dealerId)}>{row.dealerDisplayName}</TableCell>
                                        <TableCell align="right" onClick={() => handleClickTable(row.dealerId)}>{row.dealerMobileNumber}</TableCell>
                                        <TableCell align="right" onClick={() => handleClickTable(row.dealerId)}>{row.dealerWhatsAppNumber}</TableCell>
                                        <TableCell align='right'><Menutemp /></TableCell>
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

export default DealerList;