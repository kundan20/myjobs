import React from 'react'
import * as constants from '../shared/Constants'

const NotFound = () => {
    return (
        <div className="v-center not-found" >
           <h3>{constants.ERROR_CODE}</h3>
           <h4>{constants.ERROR_TITLE}</h4>                
        </div>
    )
}

export default NotFound
