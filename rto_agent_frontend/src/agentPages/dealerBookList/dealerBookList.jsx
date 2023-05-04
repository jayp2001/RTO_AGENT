import './dealerBookList.css'
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { dealerList } from "../../../action/agentAction/agentAction"
import { useNavigate } from "react-router-dom";
import { dealerBookList, exportExcel } from "../../action/agentAction/agentAction";
import Menutemp from './menu';
import BookList from '../bookList/bookList';

function DealerBookList(props) {
    const [stateOfBook, setStateOfBook] = React.useState(10);
    const [filter, setFilter] = React.useState({
        searchOption: 20,
        startDate: null,
        endDate: null,
        dealerId: props.dealerId,
        type: null
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.dealerBookList.state);
    const totalRows = useSelector((state) => state.dealerBookList.totalRows);
    React.useEffect(() => {
        dispatch(dealerBookList(page + 1, rowsPerPage, filter, stateOfBook, props.dealerId))
    }, [dispatch, setRowsPerPage, setPage, stateOfBook])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(dealerBookList(newPage + 1, rowsPerPage, filter, stateOfBook, props.dealerId))
    };

    const handleChangeRowsPerPage = (event) => {
        console.log('>>><<,', page, rowsPerPage);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log('>>>????', page, parseInt(event.target.value, 10));
        dispatch(dealerBookList(page + 1, parseInt(event.target.value, 10), filter, stateOfBook, props.dealerId))
    };

    const handleExport = () => {
        if (window.confirm('are you sure you want to export excel file ?'))
            dispatch(exportExcel(filter, stateOfBook));
    }

    const applyFilter = () => {
        dispatch(dealerBookList(page + 1, rowsPerPage, filter, stateOfBook, props.dealerId))
    }

    const resetFilter = () => {
        setFilter({
            searchOption: 20,
            startDate: null,
            endDate: null,
            dealerId: props.dealerId,
            type: null
        })
    }
    return (
        <BookList
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
        />
    )
}

export default DealerBookList;