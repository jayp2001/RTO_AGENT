import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import './allBookList.css';
import { allBookList } from "../../action/agentAction/agentAction";
import BookList from '../bookList/bookList';
import { exportExcel, resetExport, resetExportError } from '../../action/agentAction/agentAction';
import { ToastContainer, toast } from 'react-toastify';

function AllBookList() {
    const data = useSelector((state) => state.allBookList.state);
    const { loading, success, error } = useSelector((state) => state.exportExcal);
    const dispatch = useDispatch();
    const [stateOfBook, setStateOfBook] = React.useState(10);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const totalRows = useSelector((state) => state.allBookList.totalRows);
    const [filter, setFilter] = React.useState({
        searchOption: 'lastUpdated',
        startDate: null,
        endDate: null,
        dealerId: null,
        type: null
    });

    React.useEffect(() => {
        dispatch(allBookList(page + 1, rowsPerPage, filter, stateOfBook))
    }, [dispatch, setRowsPerPage, setPage, stateOfBook])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        dispatch(allBookList(newPage + 1, rowsPerPage, 'TTO', stateOfBook))
    };

    const handleChangeRowsPerPage = (event) => {
        console.log('>>><<,', page, rowsPerPage);
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        console.log('>>>????', page, parseInt(event.target.value, 10));
        dispatch(allBookList(page + 1, parseInt(event.target.value, 10), 'TTO', stateOfBook))
    };

    const handleExport = () => {
        // console.log(">>>>LLL")
        dispatch(exportExcel(filter, stateOfBook));
    }

    const applyFilter = () => {
        dispatch(allBookList(page + 1, rowsPerPage, filter, stateOfBook))
    }

    console.log('>>>L>', error, success, loading)

    if (loading) {
        console.log('>>><<', loading)
        toast.loading("Please wait...", {
            toastId: 'll'
        })
        // window.alert()
    }
    if (success) {
        toast.dismiss('ll');
        toast.dismiss('error');
        toast('Excel Downloaded successfully',
            {
                type: 'success',
                toastId: 'successExcel',
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

        dispatch(resetExport())
        setTimeout(() => {
            // reset()
        }, 50)
    }
    if (error) {
        toast.dismiss('loading');
        toast(error, {
            type: 'error',
            position: "bottom-right",
            toastId: 'errorExcel',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        dispatch(resetExportError())
    }
    const resetFilter = () => {
        setFilter({
            searchOption: 'lastUpdated',
            startDate: null,
            endDate: null,
            dealerId: null,
            type: null
        })
    }
    console.log('>>>', totalRows)
    return (
        <>
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
                    applyFilter={applyFilter}
                    resetFilter={resetFilter}
                />
            </div>
            <ToastContainer />
        </>
    )
}
export default AllBookList;