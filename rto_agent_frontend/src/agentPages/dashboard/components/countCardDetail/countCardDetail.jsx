import './countCardDetail.css'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventIcon from '@mui/icons-material/Event';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
function CountCard({ color, data, description, icon }) {
    return (
        <div className='cardDealer'>
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
                    {
                        icon === 'lastMonth' && <EventRepeatIcon />
                    }
                    {
                        icon === 'lastUpdated' && <EditCalendarIcon />
                    }

                </div>
            </div>
            <div className='count'>
                {data ? data : 0}
            </div>
            <hr className='hrCount'></hr>
            <div className='countDescription'>
                {description}
            </div>
        </div>
    )
}

export default CountCard;