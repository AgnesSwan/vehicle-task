import React from "react"
import './VehicleCard.css'
import { FaCarAlt } from 'react-icons/fa'

const VehicleCard = ({ model, make, engineCapacity, bodyType, fuelType, enginePowerPW, enginePowerPS }) => {
    return (
        <>
            <div className="card">
                <div className="title">
                    <h1>{make} {model}</h1>
                    <FaCarAlt size='60px' />
                </div>
                <p>Fuel type: {fuelType}</p>
                <p>Body type: {bodyType}</p>
                <p>Engine Capacity: {engineCapacity}</p>
                <p>Engine Power PS: {enginePowerPS}</p>
                {enginePowerPW && <p>Engine Power PW: {enginePowerPW}</p>}
                <button>Select</button>
            </div>
        </>
    )
}

export default VehicleCard