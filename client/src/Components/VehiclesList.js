import React, { useEffect, useState } from "react"
import './VehiclesList.css'
import NotFound from "./NotFound"
import VehicleCard from "./VehicleCard"

const VehiclesList = () => {
    const [makes, setMakes] = useState([])
    const [models, setModels] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [selectedMake, setSelectedMake] = useState("")
    const [selectedModel, setSelectedModel] = useState("")
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

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


    const filteredVehicles = searchTerm.length === 0 ? vehicles
        : vehicles.filter(vehicle =>
            vehicle?.fuelType?.toLowerCase().includes(searchTerm.toLowerCase()) || vehicle?.bodyType?.toLowerCase().includes(searchTerm.toLowerCase()))
    return (
        <>
            <div className="filters_container">
                <select data-testid='select' onChange={changeMake}>
                    <option data-testid="select-option">--Select Make--</option>
                    {makes.map((make, id) => (
                        <option data-testid="select-option" key={id} value={make} >{make}</option>
                    ))}
                </select>
                {models.length > 0 && (
                    <select onChange={e => setSelectedModel(e.target.value)}>
                        <option>--Select Model--</option>
                        {models.map((model, id) => (
                            <option key={id} value={model} >{model}</option>
                        ))}
                    </select>)}
                <input
                    type="text"
                    placeholder="Search by body/fuel type"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {loading ? <div className="loading_container"><div className="loading" /></div> : vehicles.length !== 0 ? <div className="vehicle_container">{filteredVehicles.map((vehicle, id) => (
                <VehicleCard key={id} model={selectedModel} make={selectedMake} enginePowerPS={vehicle.enginePowerPS} enginePowerPW={vehicle.enginePowerPW} fuelType={vehicle.fuelType} bodyType={vehicle.bodyType} engineCapacity={vehicle.engineCapacity} />
            ))}</div> : <NotFound />}
        </>
    )
}

export default VehiclesList