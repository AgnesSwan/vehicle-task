import React from "react"
import {FaCarAlt} from 'react-icons/fa'

const NotFound = () => {

    return (
        <p style={{textAlign: 'center', color: 'lightgray', fontSize:'2em', display:'flex', flexDirection: 'column', alignItems: 'center', marginTop: '200px'}}>There's no available vehicles
        <FaCarAlt size='60px' />
        </p>
    )
}

export default NotFound