import './ttoBookList.css';
import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import { bookList } from "../../action/agentAction/agentAction";
import BookList from '../bookList/bookList';
import { exportExcel, recieptUpload, deleteBook, resetExport, resetExportError } from '../../action/agentAction/agentAction';
function TtoBookList() {
    const data = useSelector((state) => state.ttoBookList.state);
    const [filter, setFilter] = React.useState({
        searchOption: 20,
        startDate: null,
        endDate: null,
        dealerId: null,
        type: 2
    });
    const dispatch = useDispatch();
    const [stateOfBook, setStateOfBook] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const totalRows = useSelector((state) => state.ttoBookList.totalRows);
    React.useEffect(() => {
        dispatch(bookList(page + 1, rowsPerPage, filter, 2, stateOfBook))
    }, [dispatch, setRowsPerPage, setPage, stateOfBook])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(bookList(newPage + 1, rowsPerPage, filter, 2, stateOfBook))
    };

    const handleChangeRowsPerPage = (event) => {
        console.log('>>><<,', page, rowsPerPage);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log('>>>????', page, parseInt(event.target.value, 10));
        dispatch(bookList(page + 1, parseInt(event.target.value, 10), filter, 2, stateOfBook))
    };

    const handleExport = () => {
        // console.log(">>>>LLL")
        dispatch(exportExcel(filter, stateOfBook));
    }

    const applyFilter = () => {
        dispatch(bookList(page + 1, rowsPerPage, filter, 2, stateOfBook))
    }

    const resetFilter = () => {
        setFilter({
            searchOption: 20,
            startDate: null,
            endDate: null,
            dealerId: null,
            type: 2
        })
    }
    const moveToNextStep = (file, appointmentDate, bookId) => {
        dispatch(recieptUpload(file, appointmentDate, bookId))
        setTimeout(() => {
            dispatch(bookList(1, rowsPerPage, filter, 2, stateOfBook))
        }, 3000)
    }
    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id))
        setTimeout(() => {
            dispatch(bookList(page + 1, rowsPerPage, filter, 2, stateOfBook))
        }, 1000)
    }
    return (
        <div className="ttoListContainer">
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
            />
        </div>
    )
}

export default TtoBookList;