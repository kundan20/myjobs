import React, {useEffect,useState} from 'react'
import * as moment from 'moment'
const Test = () => {
    const [time, setTime] = useState();
    let currentTime;

  
    //{moment(currentTime).format('DD-MM-YYYY HH:mm:ss')}
    useEffect(() => {
        currentTime  = new Date()
        setTime(currentTime)
        // console.log(currentTime)
    })
    return (
        <div>
           Current Time: {String(time)}
        </div>
    )
}

export default Test
