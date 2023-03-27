import './bookList.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from "react-redux";
// import { dealerList } from "../../../action/agentAction/agentAction"
import { useNavigate } from "react-router-dom";
import Menutemp from './menu';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { dealerDropdown } from '../../action/agentAction/agentAction'
import { useLocation } from 'react-router-dom';

function BookList(props) {
    const location = useLocation();
    const [state, setState] = React.useState({
        right: false,
    });
    const dealerDropdownList = useSelector((state) => state.dealerDropdown.state);
    // const [filter, setFilter] = React.useState({
    //     searchOption: 'lastUpdated',
    //     startDate: null,
    //     endDate: null,
    //     dealerId: null,
    //     type: null
    // });

    const navigate = useNavigate();
    const handleClickTable = (id) => {
        navigate(`/vehicleDetail/${id}`)
    }
    const dispatch = useDispatch();
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    React.useEffect(() => {
        dispatch(dealerDropdown());
    }, [dispatch])

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleChange = (e) => {
        props.setFilter((pervState) => ({
            ...pervState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleStartDate = (date) => {
        props.setFilter((prevState) => ({
            ...prevState,
            ["startDate"]: date && date['$d'] ? date['$d'] : null,
        }))
    };

    const handleEndDate = (date) => {
        props.setFilter((prevState) => ({
            ...prevState,
            ["endDate"]: date && date['$d'] ? date['$d'] : null,
        }))
    };

    return (
        <div className='pendingTableWrapper'>
            <div className='pendingTableContainer'>
                <div className='flex justify-center w-full'>
                    <div className='tableHeader flex justify-between'>
                        <div>
                            Book List
                        </div>
                        <div>
                            <button aria-describedby={id} type="button" onClick={handleClick}>
                                <TuneIcon sx={{ color: '#ffffff' }} />
                            </button>
                            <Popper id={id} open={open} style={{ zIndex: 10000, borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem' }} placement={'bottom-end'} anchorEl={anchorEl}>
                                <Box sx={{ bgcolor: 'background.paper', width: '700px', height: '260px', borderRadius: '10px' }}>
                                    <div className='filterWrp grid gap-6'>
                                        <div className='grid grid-cols-12 gap-6'>
                                            <div className='col-span-4'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Search Options</InputLabel>
                                                    <Select
                                                        labelId="Search"
                                                        id="Search"
                                                        name='searchOption'
                                                        value={props.filter.searchOption}
                                                        label="Search Options"
                                                        onChange={handleChange}
                                                        MenuProps={{
                                                            style: { zIndex: 35001 }
                                                        }}
                                                    >
                                                        <MenuItem value={'lastUpdated'}>Last Updated Data</MenuItem>
                                                        <MenuItem value={20}>Custom Search</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className='col-span-4'>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DesktopDatePicker
                                                        textFieldStyle={{ width: '100%' }}
                                                        InputProps={{ style: { fontSize: 16, width: '100%' } }}
                                                        InputLabelProps={{ style: { fontSize: 16 } }}
                                                        label="Start Date"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={props.filter.startDate}
                                                        onChange={handleStartDate}
                                                        name="startDate"
                                                        PopperProps={{
                                                            style: { zIndex: 35001 }
                                                        }}
                                                        renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                            <div className='col-span-4'>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DesktopDatePicker
                                                        textFieldStyle={{ width: '100%' }}
                                                        InputProps={{ style: { fontSize: 16, width: '100%' } }}
                                                        InputLabelProps={{ style: { fontSize: 16 } }}
                                                        label="End Date"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={props.filter.endDate}
                                                        onChange={handleEndDate}
                                                        name="endDate"
                                                        PopperProps={{
                                                            style: { zIndex: 35001 }
                                                        }}
                                                        renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-12 gap-6'>
                                            <div className='col-span-4'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Dealer</InputLabel>
                                                    <Select
                                                        labelId="DealerId"
                                                        id="DealerId"
                                                        name='dealerId'
                                                        value={props.filter.dealerId}
                                                        label="Dealer"
                                                        onChange={handleChange}
                                                        MenuProps={{
                                                            style: { zIndex: 35001 }
                                                        }}
                                                    >
                                                        <MenuItem value={null}>Clear</MenuItem>
                                                        {
                                                            dealerDropdownList ? dealerDropdownList.map((row) => (
                                                                <MenuItem value={row.dealerId}>{row.dealerDisplayName}</MenuItem>
                                                            ))
                                                                : null
                                                        }

                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className='col-span-4'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Work Filter</InputLabel>
                                                    <Select
                                                        labelId="workFilter"
                                                        id="workFilter"
                                                        name='type'
                                                        value={props.filter.type}
                                                        label="Work Filter"
                                                        onChange={handleChange}
                                                        MenuProps={{
                                                            style: { zIndex: 35001 }
                                                        }}
                                                    >
                                                        <MenuItem value={null}>Clear</MenuItem>
                                                        <MenuItem value={'TTO'}>TTO</MenuItem>
                                                        <MenuItem value={'RRF'}>RRF</MenuItem>
                                                        <MenuItem value={'OTHER'}>OTHER</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-12 gap-6'>
                                            <div className='col-span-4'>
                                                <button className='btn-reset' onClick={() => props.resetFilter()}>
                                                    Reset All
                                                </button>
                                            </div>
                                            <div className='col-span-4'>
                                                <button className='btn-apply' onClick={() => { handleClick(); props.applyFilter() }}>
                                                    Apply
                                                </button>
                                            </div>
                                            <div className='col-span-4'>
                                                <button className='btn-cancle' onClick={() => { handleClick(); props.resetFilter() }}>
                                                    Cancle
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            </Popper>
                            {/* <IconButton onClick={toggleDrawer('left', true)} fontSize='large' sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                                <TuneIcon sx={{ color: '#ffffff' }} />  
                            </IconButton> */}
                        </div>
                    </div>
                </div>
                <div className='tabContainer content-center grid gap-2 grid-cols-12'>
                    <div className='col-span-9 flex tabWrapper'>
                        {
                            location.pathname === "/bookList" && <div className={`${props.stateOfBook == 10 ? 'allTabActive' : 'allTab'}`}>
                                <button className={`${props.stateOfBook == 10 ? 'allTabTextActive ' : 'tabText'}`} onClick={() => props.setStateOfBook(10)}>
                                    ALL
                                </button>
                            </div>
                        }
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
                        <div className={location.pathname === "/bookList" ? 'allSearchFieldWrapper' : 'searchFieldWrapper'}>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                <InputLabel>Search</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type='text'
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="search"
                                            >
                                                {<SearchIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                    </div>
                    <div className='col-span-3 flex justify-end'>
                        <button className='exportBtnWrp' onClick={() => props.handleExport()}>
                            Export Excal
                        </button>
                    </div>
                </div>
                <div className='tableContainerWrapper'>
                    <TableContainer sx={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', paddingLeft: '10px', paddingRight: '10px' }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Vehicle Registration No</TableCell>
                                    <TableCell align="left">Dealer/Customer</TableCell>
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
                                        <TableCell align="left" onClick={() => handleClickTable(row.vehicleRegistrationId)}>{row['Dealer/Customer']}</TableCell>
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
            <React.Fragment key={'left'}>
                <SwipeableDrawer
                    style={{ zIndex: 7251 }}
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    )
}

export default BookList;