import React, { useState } from "react"
import './VehicleCard.css'
import { FaCarAlt } from 'react-icons/fa'
import ChosenCarModal from "./ChosenCarModel"

const VehicleCard = ({ model, make, engineCapacity, bodyType, fuelType, enginePowerPW, enginePowerPS }) => {
    const [isOpenModal, setOpenModal] = useState(false);

    return (
        <>
            <div className="card">
                <div className="title">
                    <h1>{make} {model}</h1>
                    <FaCarAlt size='60px' />
                </div>
                {fuelType && <p>Fuel type: {fuelType}</p>}
                {bodyType && <p>Body type: {bodyType}</p>}
                {engineCapacity && <p>Engine Capacity: {engineCapacity}</p>}
                {enginePowerPS && <p>Engine Power PS: {enginePowerPS}</p>}
                {enginePowerPW && <p>Engine Power PW: {enginePowerPW}</p>}
                <button onClick={() => setOpenModal(true)}>Select</button>
            </div>
            {isOpenModal && <ChosenCarModal onClose={() => setOpenModal(false)} show={isOpenModal}>
                <content>
                    <h2>{make} {model}</h2>
                    {fuelType && <p>Fuel type: {fuelType}</p>}
                    {bodyType && <p>Body type: {bodyType}</p>}
                    {engineCapacity && <p>Engine Capacity: {engineCapacity}</p>}
                    {enginePowerPS && <p>Engine Power PS: {enginePowerPS}</p>}
                    {enginePowerPW && <p>Engine Power PW: {enginePowerPW}</p>}
                </content>
            </ChosenCarModal>}
        </>
    )
}

export default VehicleCard