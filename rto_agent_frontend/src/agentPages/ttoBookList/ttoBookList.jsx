import './ttoBookList.css';
import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import { bookList } from "../../action/agentAction/agentAction";
import BookList from '../bookList/bookList';
function TtoBookList() {
    const data = useSelector((state) => state.ttoBookList.state);
    const dispatch = useDispatch();
    const [stateOfBook, setStateOfBook] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const totalRows = useSelector((state) => state.ttoBookList.totalRows);
    React.useEffect(() => {
        dispatch(bookList(page + 1, rowsPerPage, 'TTO', stateOfBook))
    }, [dispatch, setRowsPerPage, setPage, stateOfBook])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(bookList(newPage + 1, rowsPerPage, 'TTO', stateOfBook))
    };

    const handleChangeRowsPerPage = (event) => {
        console.log('>>><<,', page, rowsPerPage);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log('>>>????', page, parseInt(event.target.value, 10));
        dispatch(bookList(page + 1, parseInt(event.target.value, 10), 'TTO', stateOfBook))
    };
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
            />
        </div>
    )
}

export default TtoBookList;