import './countCard.css'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventIcon from '@mui/icons-material/Event';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CountUp from 'react-countup';

function CountCardDashboard({ color, data, description, icon }) {
    return (
        <div className='card'>
            <div className={`card_header_box flex justify-center ${color}`}>
                <div className='grid content-center'>
                    {
                        icon === 'allBook' && <AutoStoriesIcon />
                    }
                    {
                        icon === 'pending' && <PendingActionsIcon />
                    }
                    {
                        icon === 'appointment' && <EventIcon />
                    }
                    {
                        icon === 'complete' && <AssignmentTurnedInIcon />
                    }

                </div>
            </div>
            <div className='count'>
            <CountUp start={0} end={data ? data : 0} duration={3} />
                {/* {data ? data : 0} */}
            </div>
            <hr className='hrCount'></hr>
            <div className='countDescription'>
                {description}
            </div>
        </div>
    )
}

export default CountCardDashboard;