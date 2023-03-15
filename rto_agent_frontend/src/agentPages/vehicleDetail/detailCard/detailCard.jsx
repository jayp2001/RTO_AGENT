import './detailcard.css'

function DetailCard({ header, data }) {
    // const data = [{ "dealerId": "Dealer_1676805673480_lebasy6g", "dealerName": "dddd dddd", "dealerFirmName": "dddd", "Address": "dddd, dddd", "StateandCity": "Sabarkantha,Gujarat", "dealerFirmPincode": 234567, "dealerDisplayName": "dddd", "dealerMobileNumber": "223123123", "dealerWhatsAppNumber": "123123123", "dealerEmailId": "dddd" }]
    if (!data) {
        return null
    }

    const keys = Object.keys(data);
    return (
        <>
            <div className='bookDetailContainer'>
                <div className='dealerDetailHeader flex items-center'>
                    <div className="grid justify-items-center w-full">
                        <div className="header_text">
                            {header}
                        </div>
                    </div>
                </div>

                <div className='detailWrapper'>
                    {data ? keys.map((key) => (
                        <div className='grid grid-cols-12 rowWrapper'>
                            <div className='title col-span-3 col-start-2'>
                                {key}
                            </div>
                            <div className='value col-span-6 col-start-6'>
                                {data[key]}
                            </div>
                        </div>
                    ))
                        : null}
                </div>
            </div>
        </>
    )
}

export default DetailCard;