import DealerList from '../dealerList/dealerList';
import * as React from 'react';
import CountCard from './components/countCard/countCard';
import { useDispatch, useSelector } from "react-redux";
import { getStateList, getCityList } from '../../action/adminAction/adminAction';
import './dashboard.css'

function Dashboard() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getStateList());
        dispatch(getCityList())
    }, [dispatch])
    return (
        <div className='dashboardWrapper'>
            <div className='card_wrapper flex justify-between'>
                <div>
                    <CountCard color="black" />
                </div>

                <div>
                    <CountCard color="blue" />
                </div>
                <div>
                    <CountCard color="green" />
                </div>
                <div>
                    <CountCard color="pink" />
                </div>
            </div>
            <DealerList />
        </div>
    )
}

export default Dashboard;