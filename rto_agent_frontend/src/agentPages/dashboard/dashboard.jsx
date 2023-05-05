import DealerList from '../dealerList/dealerList';
import * as React from 'react';
import CountCardDashboard from './components/countCard/countCard';
import './dashboard.css';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../type/url';

function Dashboard() {
    const [count, setCount] = React.useState();
    React.useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        axios.get(
            `${BACKEND_BASE_URL}vehicleRegistrationrouter/dashBoardCountNumber`,
            config
        )
            .then((res) => {
                setCount(res.data);
            })

    }, [])
    if (!count) {
        return null;
    }
    console.log(">>>>>>>>>>>>",count)
    return (
        <div className='dashboardWrapper'>
            <div className='card_wrapper flex justify-between'>
                <div className='cardWrp'>
                    <CountCardDashboard color="blue" data={count.AllBook ? count.AllBook : 0} description={"Books"} icon={"allBook"} />
                </div>
                <div className='cardWrp'>
                    <CountCardDashboard color="pink" data={count.AllPendingBook ? count.AllPendingBook : 0} description={"Pending Books"} icon={"pending"} />
                </div>
                <div className='cardWrp'>
                    <CountCardDashboard color="yellow" data={count.AllAppointmentBook ? count.AllAppointmentBook : 0} description={"Appointment Books"} icon={"appointment"} />
                </div>
                <div className='cardWrp'>
                    <CountCardDashboard color="green" data={count.AllCompleteBook ? count.AllCompleteBook : 0} description={"Complete Books"} icon={"complete"} />
                </div>
            </div>
            <DealerList />
        </div>
    )
}

export default Dashboard;