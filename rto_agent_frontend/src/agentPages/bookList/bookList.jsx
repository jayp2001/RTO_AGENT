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
import Lottie from "lottie-react";
import loader from '../../animation/loader.json'
import successAnimation from '../../animation/success.json'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Box from '@mui/material/Box';

import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { dealerDropdown, recieptUpload, resetMoveToComplete, resetMoveToCompleteError, resetReciept, resetDeleteBook, resetRecieptError } from '../../action/agentAction/agentAction'
import { useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import { Checkbox } from '@mui/material';

function BookList(props) {
    const location = useLocation();
    const [state, setState] = React.useState({
        right: false,
    });
    const [searchWord, setSearchWord] = React.useState('');
    const [sendReceipt, setSendReceipt] = React.useState(true);
    const [appointmentDate, setAppointmentDate] = React.useState(null)
    const dealerDropdownList = useSelector((state) => state.dealerDropdown.state);
    const { loading, success, error } = useSelector((state) => state.recieptUpload);
    const deleteBookRes = useSelector((state) => state.deleteBook);
    const moveToComplete = useSelector((state) => state.moveToComplete);
    const [bookId, setBookId] = React.useState('');
    const [vehicleNo, setVehicleNo] = React.useState('')
    const today = new Date();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        height: 395,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    };
    const [openModal, setOpen] = React.useState(false);
    const handleOpen = (id, vehicleNum) => { setOpen(true); setVehicleNo(vehicleNum); setBookId(id) }
    const handleNextStep = (id) => { props.appointmentToComplete(id) }
    const handleClose = () => { setOpen(false); setBookId(''); setVehicleNo(''); }
    const [fileName, setFileName] = React.useState(null);
    const [file, setFile] = React.useState('');
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

    console.log('::::')

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        if (props.filter.searchOption === 'lastUpdated') {
            props.setStateOfBook(null)
        }
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;


    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args)
            }, 700)
        }

    }

    const handleChange = (e) => {
        console.log("LLLKKK")
        console.log(">>>>LLLL",e.target.name === 'searchOption' && props.filter[e.target.name] === 20 && e.target.value === 'lastUpdated');
        if(props.filter && e.target.name === 'searchOption' && props.filter[e.target.name] === 20 && e.target.value === 'lastUpdated'){
            console.log(">>>>LLLL");
            props.resetFilter()
        }
        props.setFilter((pervState) => ({
            ...pervState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSearchChange = (e) => {
        if (e.target.value.length > 0) {
            console.log("PPPPP", e.target.value.length, props.stateOfBook)
            props.setStateOfBook(100)
            console.log('state', props.stateOfBook)
        } else {
            props.setStateOfBook(10)
        }
        // setStateOfBook
        if (e.target.value.length > 0)
            props.resetFilter();
        setSearchWord(e.target.value)
    };
    const handleSearch = () => {
        console.log(':::???:::', document.getElementById('standard-adornment-password').value)
        props.search(document.getElementById('standard-adornment-password').value)
    }

    const debounceFunction = React.useCallback(debounce(handleSearch), [])
    const handleStartDate = (date) => {
        props.setFilter((prevState) => ({
            ...prevState,
            ["startDate"]: date && date['$d'] ? date['$d'] : null,
        }))
        props.setFilter((prevState) => ({
            ...prevState,
            ["endDate"]: date && date['$d'] ? date['$d'] : null,
        }))
    };
    const handleAppointmentDateFilter = (date) => {
        props.setFilter((prevState) => ({
            ...prevState,
            ["appointmentDate"]: date && date['$d'] ? date['$d'] : null,
        }))
    };

    const handleEndDate = (date) => {
        props.setFilter((prevState) => ({
            ...prevState,
            ["endDate"]: date && date['$d'] ? date['$d'] : null,
        }))
    };

    const handleAppointmentDate = (date) => {
        setAppointmentDate(date && date['$d'] ? date['$d'] : null)
    }

    const handleFileUpload = (event) => {
        console.log("FILE", event.target.files)
        setFile(event.target.files)
        setFileName(event.target.files[0].name)
    }

    const handleSave = () => {
        if(file && fileName){
        props.moveToNextStep(file, appointmentDate, bookId, sendReceipt)}
        else{
            alert("please upload file");
        }
    }
    const deleteBook = (id) => {
        if (window.confirm('Are you sure want to delete ?'))
            props.handleDeleteBook(id)
    }

    const markAsComplete = (id) => {
        props.handleMoveToComplete(id)
    }

    if (deleteBookRes.loading ? true : false) {
        toast.loading("Please wait...", {
            toastId: 'loading'
        })
    }
    if (deleteBookRes.success ? true : false) {
        toast.dismiss('loading');
        toast.dismiss('error');
        toast('Book deleted',
            {
                type: 'success',
                toastId: 'success',
                position: "bottom-right",
                toastId: 'error',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        dispatch(resetDeleteBook())
    }
    if (deleteBookRes.error ? true : false) {
        toast.dismiss('loading');
        toast(deleteBookRes.error, {
            type: 'error',
            position: "bottom-right",
            toastId: 'error',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        dispatch(resetDeleteBook())
    }

    if (moveToComplete.loading ? true : false) {
        toast.loading("Please wait...", {
            toastId: 'loading'
        })
    }
    if (moveToComplete.success ? true : false) {
        toast.dismiss('loading');
        toast.dismiss('error');
        toast('Book moved to complete',
            {
                type: 'success',
                toastId: 'success',
                position: "bottom-right",
                toastId: 'error',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        dispatch(resetMoveToComplete())
    }
    if (moveToComplete.error ? true : false) {
        toast.dismiss('loading');
        toast(moveToComplete.error, {
            type: 'error',
            position: "bottom-right",
            toastId: 'error',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        dispatch(resetMoveToCompleteError())
    }

    if ((loading ? true : false) && !openModal) {
        toast.loading("Please wait...", {
            toastId: 'loading'
        })
    }
    if ((success ? true : false) && !openModal) {
        toast.dismiss('loading');
        toast.dismiss('error');
        toast('Book moved to next step',
            {
                type: 'success',
                toastId: 'success',
                position: "bottom-right",
                toastId: 'error',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        dispatch(resetReciept())
    }
    if ((error ? true : false) && !openModal) {
        toast.dismiss('loading');
        toast(error, {
            type: 'error',
            position: "bottom-right",
            toastId: 'error',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        dispatch(resetRecieptError())
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
                            <button aria-describedby={id} type="button" onClick={handleClick}>
                                <TuneIcon sx={{ color: '#ffffff' }} />
                            </button>
                            <Popper id={id} open={open} style={{ zIndex: 10000, borderRadius: '10px', boxShadow: 'rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem' }} placement={'bottom-end'} anchorEl={anchorEl}>
                                <Box sx={{ bgcolor: 'background.paper', width: '700px', height: '260px', borderRadius: '10px' }}>
                                    <div className='filterWrp grid gap-6'>
                                        <div className='grid grid-cols-12 gap-6'>
                                            <div className='col-span-4'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label" disabled={props.stateOfBook == 2}>Search Options</InputLabel>
                                                    <Select
                                                        labelId="Search"
                                                        id="Search"
                                                        name='searchOption'
                                                        value={props.filter.searchOption}
                                                        label="Search Options"
                                                        disabled={props.stateOfBook == 2}
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
                                                        disabled={props.filter.searchOption === 'lastUpdated' || props.stateOfBook == 2}
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
                                                        disabled={props.filter.searchOption === 'lastUpdated' || props.stateOfBook == 2 || props.filter.startDate === null}
                                                        inputFormat="DD/MM/YYYY"
                                                        value={props.filter.endDate}
                                                        minDate={props.filter.startDate}
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
                                                    <InputLabel id="demo-simple-select-label" disabled={props.stateOfBook == 2}>Dealer</InputLabel>
                                                    <Select
                                                        labelId="DealerId"
                                                        id="DealerId"
                                                        name='dealerId'
                                                        value={props.filter.dealerId}
                                                        disabled={props.stateOfBook == 2 || location.pathname.split('/').at(-2) === 'dealer'}
                                                        label="Dealer"
                                                        onChange={handleChange}
                                                        MenuProps={{
                                                            style: { zIndex: 35001 }
                                                        }}
                                                    >
                                                        <MenuItem value={null}>Clear</MenuItem>
                                                        {
                                                            dealerDropdownList ? dealerDropdownList.map((row) => row && row.dealerId !== 100 ?(
                                                                <MenuItem value={row.dealerId}>{row.dealerDisplayName}</MenuItem>
                                                            ):null)
                                                                : null
                                                        }

                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className='col-span-4'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label" disabled={props.filter.searchOption === 'lastUpdated' || props.stateOfBook == 2}>Work Filter</InputLabel>
                                                    <Select
                                                        labelId="workFilter"
                                                        id="workFilter"
                                                        name='type'
                                                        disabled={props.filter.searchOption === 'lastUpdated' || props.stateOfBook == 2 || (location.pathname === "/TTO" || location.pathname === "/RRF" || location.pathname === "/OTHER")}
                                                        value={props.filter.type}
                                                        label="Work Filter"
                                                        onChange={handleChange}
                                                        MenuProps={{
                                                            style: { zIndex: 35001 }
                                                        }}
                                                    >
                                                        <MenuItem value={null}>Clear</MenuItem>
                                                        <MenuItem value={2}>TTO</MenuItem>
                                                        <MenuItem value={1}>RRF</MenuItem>
                                                        <MenuItem value={3}>OTHER</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className='col-span-4'>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DesktopDatePicker
                                                        textFieldStyle={{ width: '100%' }}
                                                        InputProps={{ style: { fontSize: 16, width: '100%' } }}
                                                        InputLabelProps={{ style: { fontSize: 16 } }}
                                                        label="Appointment Date"
                                                        inputFormat="DD/MM/YYYY"
                                                        disabled={props.stateOfBook !== 2}
                                                        value={props.filter.appointmentDate}
                                                        onChange={handleAppointmentDateFilter}
                                                        name="appointmentDate"
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
                    <div className='col-span-10 flex tabWrapper'>
                        {
                            (location.pathname === "/bookList" || location.pathname.split('/').at(-2) === 'dealer') && <div className={`${props.stateOfBook == 10 ? 'allTabActive' : 'allTab'}`}>
                                <button className={`${props.stateOfBook == 10 ? 'allTabTextActive ' : 'tabText'}`} onClick={() => { props.setStateOfBook(10); props.resetFilter(); setSearchWord(''); props.setPage(0) }}>
                                    ALL
                                </button>
                            </div>
                        }
                        <div className={`${props.stateOfBook == 0 ? 'tabActive pink' : 'tab'}`}>
                            <button className={`${props.stateOfBook == 0 ? 'tabTextActive ' : 'tabText'}`} onClick={() => {
                                props.setFilter((prevState) => ({
                                    ...prevState,
                                    ["appointmentDate"]: null,
                                })); props.setStateOfBook(0); props.setPage(0); setSearchWord('');
                            }}>
                                Pendding
                            </button>
                        </div>
                        <div className={`${props.stateOfBook == 2 ? 'tabActive yellow' : 'tab'}`}>
                            <button className={`${props.stateOfBook == 2 ? 'tabTextActive' : 'tabText'}`} onClick={() => { props.setStateOfBook(2); props.setPage(0); setSearchWord(''); }}>
                                Appointment
                            </button>
                        </div>
                        <div className={`${props.stateOfBook == 3 ? 'tabActive green' : 'tab'}`}>
                            <button className={`${props.stateOfBook == 3 ? 'tabTextActive' : 'tabText'}`} onClick={() => {
                                props.setFilter((prevState) => ({
                                    ...prevState,
                                    ["appointmentDate"]: null,
                                })); props.setStateOfBook(3); props.setPage(0); setSearchWord('');
                            }}>
                                Complete
                            </button>
                        </div>
                        <div className={location.pathname === "/bookList" ? 'allSearchFieldWrapper' : 'searchFieldWrapper'}>
                            {location.pathname !== "/TTO" && location.pathname !== "/RRF" && location.pathname !== "/OTHER" ?
                                <FormControl sx={{ m: 1, width: '95%' }} variant="standard">
                                    <InputLabel>Search</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type='text'
                                        value={searchWord}
                                        onChange={(e) => { handleSearchChange(e); debounceFunction() }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="search"
                                                    onClick={() => props.search(searchWord)}
                                                >
                                                    {<SearchIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                : null}
                        </div>
                    </div>
                    <div className='col-span-2 flex justify-end'>
                        <button className={searchWord.length === 0 && props.totalRows !== 0 ? 'exportBtnWrp' : 'exportBtnWrpDisable'} onClick={() => searchWord.length === 0 && props.totalRows !== 0 ? props.handleExport() : null}>
                            Export Excel
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
                                    props.totalRows !== 0 ?
                                        <TableRow
                                            key={row.vehicleRegistrationId}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            style={{ cursor: "pointer" }}
                                            className='tableRow'
                                        >
                                            <TableCell align="left" onClick={() => handleClickTable(row.vehicleRegistrationId)}>{(index + 1) + (props.page * props.rowsPerPage)}</TableCell>
                                            <TableCell component="th" scope="row" onClick={() => handleClickTable(row.vehicleRegistrationId)}>
                                                {row.vehicleRegistrationNumber}
                                            </TableCell>
                                            <TableCell align="left" onClick={() => handleClickTable(row.vehicleRegistrationId)}>{row['Dealer/Customer']}</TableCell>
                                            <TableCell align="left" onClick={() => handleClickTable(row.vehicleRegistrationId)}>{row.workType}</TableCell>
                                            <TableCell align="right" onClick={() => handleClickTable(row.vehicleRegistrationId)}>{row.clientWhatsAppNumber}</TableCell>
                                            <TableCell align="right">
                                                <Menutemp bookId={row.vehicleRegistrationId} deleteBook={deleteBook} handleNextStep={handleNextStep} markAsComplete={markAsComplete} vehicleWorkStatus={row.vehicleWorkStatus} vehicleNum={row.vehicleRegistrationNumber} handleOpen={handleOpen} />
                                            </TableCell>
                                        </TableRow> :
                                        <TableRow
                                            key={row.vehicleRegistrationId}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            {/* <TableCell align="left" ></TableCell>
                                            <TableCell component="th" scope="row" >
                                            </TableCell> */}
                                            <TableCell align="left" style={{ fontSize: "18px" }} >{"No Data Found...!"}</TableCell>
                                            {/* <TableCell align="left" ></TableCell>
                                            <TableCell align="right" ></TableCell> */}
                                        </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={props.totalRows ? props.totalRows : 0}
                            rowsPerPage={props.rowsPerPage}
                            page={props.page}
                            onPageChange={props.handleChangePage}
                            onRowsPerPageChange={props.handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            </div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {(loading ? true : false) ?
                    <Box Box sx={style}>
                        <Lottie style={{ height: '100%', width: '100%' }} animationData={loader} loop={true} autoPlay={true} rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} />
                    </Box>
                    :
                    !(success ? true : false) ?
                        !(error) ?
                            <Box sx={style}>
                                <div className='uploadRecieptHeader'>
                                    <div className="header flex items-center ">
                                        <div className="grid justify-items-center w-full">
                                            <div className="header_text">
                                                {vehicleNo}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='fileUploadContainer'>
                                    <div className='grid grid-cols-12 fileName'>
                                        {fileName && <div className='fileNameWrp col-start-4 col-span-6 grid content-center'>
                                            <div className='w-full overflow-hidden flex justify-between'>
                                                <div className='fileN'>
                                                    {fileName}
                                                </div>
                                                <div>
                                                    <IconButton onClick={() => {
                                                        document.getElementById("fileUpload").value = "";
                                                        setFile(null)
                                                        setFileName('')
                                                    }} fontSize='large' sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                                                        <CloseIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                    <div className='uploadBtnWrp w-full flex justify-center'>
                                        <div className='col-start-4 col-span-5'>
                                            <Button variant="contained" component="label">
                                                Upload reciept
                                                <input hidden accept="application/pdf,image/*" id='fileUpload' onChange={handleFileUpload} type="file" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-12 mt-8'>
                                    <div className='col-start-1 col-span-5'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DesktopDatePicker
                                                textFieldStyle={{ width: '100%' }}
                                                InputProps={{ style: { fontSize: 14, width: '100%' } }}
                                                InputLabelProps={{ style: { fontSize: 14 } }}
                                                label="Appointment Date"
                                                required
                                                minDate={today}
                                                inputFormat="DD/MM/YYYY"
                                                value={appointmentDate}
                                                onChange={handleAppointmentDate}
                                                name="appointmentDate"
                                                PopperProps={{
                                                    style: { zIndex: 35001 }
                                                }}
                                                renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div className='col-start-6 col-span-2 flex justify-end'>
                                        <Checkbox checked={sendReceipt} onClick={() => setSendReceipt(!sendReceipt)} />
                                    </div>
                                    <div className='col-start-8 col-span-6'>
                                        <div className='flex'>
                                            <div className='grid content-center'><WhatsAppIcon fontSize='large' style={{ color: "green" }} /></div>&nbsp;&nbsp;
                                            <div>Send Receipt on Whatsapp !</div>
                                        </div>

                                    </div>
                                </div>
                                <div className='grid grid-cols-12 gap-4 mt-6'>
                                    <div className='col-start-7 col-span-3 text-center'>
                                        <button className='saveBtn' onClick={() => handleSave()}>
                                            Save
                                        </button>
                                    </div>
                                    <div className='col-span-3 text-center'>
                                        <button className='cancleBtn' onClick={() => {
                                            document.getElementById("fileUpload").value = "";
                                            setFile(null)
                                            setFileName('')
                                            setAppointmentDate(null)
                                            setOpen(false)
                                        }}
                                        >
                                            Cancle
                                        </button>
                                    </div>
                                </div>
                            </Box>:
                            (
                                <>
                                {
                                        setTimeout(() => {
                                            
                                            setFile(null)
                                            setFileName('')
                                            setOpen(false)
                                            setAppointmentDate(null)
                                            setTimeout(() => {
                                                dispatch(resetReciept())
                                            }, 3000)
                                        }, 0)

                                    }
                                </> 
                            )
                        : (
                            <>
                                <Box sx={style} className='flex justify-center'>
                                    <Lottie style={{ height: '100%', width: '80%' }} animationData={successAnimation} loop={false} autoPlay={true} rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} />
                                </Box>
                                {
                                    setTimeout(() => {
                                        dispatch(resetReciept())
                                        document.getElementById("fileUpload").value = "";
                                        setFile(null)
                                        setFileName('')
                                        setOpen(false)
                                        props.recallBook()
                                        setAppointmentDate(null)
                                    }, 2500)

                                }
                            </>
                        )
                }

            </Modal>
            <ToastContainer />
        </div >
    )
}

export default BookList;