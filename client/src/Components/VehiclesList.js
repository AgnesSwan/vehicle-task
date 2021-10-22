import React, { useEffect, useState } from "react"
import './VehiclesList.css'
import NotFound from "./NotFound"

const VehiclesList = () => {
    const [makes, setMakes] = useState([])
    const [models, setModels] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [selectedMake, setSelectedMake] = useState("")
    const [selectedModel, setSelectedModel] = useState("")
    const [loading, setLoading] = useState(false)

    const getMakes = async () => {
        setLoading(true)
        await fetch('http://localhost:8080/api/makes')
            .then(res => res.json())
            .then(data => setMakes(data))
            .catch((err) => console.log(err))
        setLoading(false)
    }

    useEffect(() => {
        getMakes();
    }, []);

    const getModels = async () => {
        setLoading(true)
        await fetch("http://localhost:8080/api/models?make=" + selectedMake)
            .then(res => res.json())
            .then(data => setModels(data))
            .catch((err) => console.log(err))
        setLoading(false)
    }

    useEffect(() => {
        getModels();
    }, [selectedMake]);

    const getVehicles = async () => {
        setLoading(true)
        await fetch(`http://localhost:8080/api/vehicles?make=${selectedMake}&model=${selectedModel}`)
            .then(res => res.json())
            .then(data => setVehicles(data))
            .catch((err) => { return (console.log(err)) })
        setLoading(false)
    }

    useEffect(() => {
        getVehicles();
    }, [selectedMake, selectedModel]);


    const changeMake = (e) => {
        setModels([])
        setSelectedMake(e.target.value)
    }

    return (
        <>
            <div className="filters_container">
                <select onChange={changeMake}>
                    {makes.map((make, id) => (
                        <option key={id} value={make} >{make}</option>
                    ))}
                </select>
                {models.length > 0 && (
                    <select onChange={e => setSelectedModel(e.target.value)}>
                        {models.map((model, id) => (
                            <option key={id} value={model} >{model}</option>
                        ))}
                    </select>)}
            </div>
            {loading ? <div className="loading_container"><div className="loading" /></div> : vehicles.length !== 0 ? <div className="vehicle_container">{vehicles.map((vehicle, id) => (
                <div key={id}>{vehicle.bodyType}</div>
            ))}</div> : <NotFound />}
        </>
    )
}

export default VehiclesList