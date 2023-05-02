import './countCard.css'

function CountCard({ color, data, description }) {
    return (
        <div className='cardDealer'>
            <div className={`card_header_box ${color}`}>

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