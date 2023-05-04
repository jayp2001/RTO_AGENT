import './rrfBookList.css';
import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import { bookList } from "../../action/agentAction/agentAction";
import BookList from '../bookList/bookList';
import { exportExcel, recieptUpload, deleteBook, moveToComplete, resetExport, resetExportError } from '../../action/agentAction/agentAction';
function RrfBookList() {
    const data = useSelector((state) => state.rrfBookList.state);
    const [filter, setFilter] = React.useState({
        searchOption: 20,
        appointmentDate: null,
        startDate: null,
        endDate: null,
        dealerId: null,
        type: 1
    });
    const dispatch = useDispatch();
    const [stateOfBook, setStateOfBook] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const totalRows = useSelector((state) => state.rrfBookList.totalRows);
    React.useEffect(() => {
        dispatch(bookList(page + 1, rowsPerPage, filter, 1, stateOfBook))
    }, [dispatch, setRowsPerPage, setPage, stateOfBook])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(bookList(newPage + 1, rowsPerPage, filter, 1, stateOfBook))
    };

    const handleChangeRowsPerPage = (event) => {
        console.log('>>><<,', page, rowsPerPage);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log('>>>????', page, parseInt(event.target.value, 10));
        dispatch(bookList(0 + 1, parseInt(event.target.value, 10), filter, 1, stateOfBook))
    };

    const handleExport = () => {
        if (window.confirm('are you sure you want to export excel file ?'))
            dispatch(exportExcel(filter, stateOfBook));
    }

    const applyFilter = () => {
        dispatch(bookList(page + 1, rowsPerPage, filter, 1, stateOfBook))
    }
    const resetFilter = () => {
        setFilter({
            searchOption: 20,
            appointmentDate: null,
            startDate: null,
            endDate: null,
            dealerId: null,
            type: 1
        })
    }

    const moveToNextStep = (file, appointmentDate, bookId) => {
        dispatch(recieptUpload(file, appointmentDate, bookId))
        setTimeout(() => {
            dispatch(bookList(page + 1, rowsPerPage, filter, 1, stateOfBook))
        }, 3000)
    }
    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id))
        setTimeout(() => {
            dispatch(bookList(page + 1, rowsPerPage, filter, 1, stateOfBook))
        }, 1000)
    }
    const handleMoveToComplete = (id) => {
        dispatch(moveToComplete(id))
        setTimeout(() => {
            dispatch(bookList(page + 1, rowsPerPage, filter, 1, stateOfBook))
        }, 1000)
    }

    const appointmentToComplete = (bookId) => {
        dispatch(recieptUpload(bookId))
        setTimeout(() => {
            dispatch(bookList(page + 1, rowsPerPage, filter, 1, stateOfBook))
        }, 1000)
    }

    return (
        <div className="rrfListContainer">
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
                setPage={setPage}
                applyFilter={applyFilter}
                resetFilter={resetFilter}
                moveToNextStep={moveToNextStep}
                handleDeleteBook={handleDeleteBook}
                handleMoveToComplete={handleMoveToComplete}
                appointmentToComplete={appointmentToComplete}
            />
        </div>
    )
}

export default RrfBookList;