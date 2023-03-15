import DetailCard from './detailCard/detailCard';
import './vehicleDetail.css'
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { bookDetail } from '../../action/agentAction/agentAction';
import { useParams } from 'react-router-dom';
function VehicleDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    var data = useSelector((state) => state.bookDetails.state);
    React.useEffect(() => {
        dispatch(bookDetail(id))
    }, [dispatch])
    console.log(data)
    if (!data) {
        return null
    }
    const keys = Object.keys(data);
    return (<>
        <div className='vehicleDetailContainer grid grid-cols-12'>
            <div className='col-span-9 grid gap-14'>
                {data ? keys.map((key) => (
                    <DetailCard header={key} data={data[key]} />
                ))
                    : null}
            </div>
        </div>
    </>)
}

export default VehicleDetail;