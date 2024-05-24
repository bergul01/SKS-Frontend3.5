import axios from "axios";

import cors from 'cors';


const REST_API_BASE_URL = 'http://localhost:8080/vehicle';


export const listVehicles = () => axios.get(REST_API_BASE_URL);

export const createVehicle = (vehicle) => axios.post(REST_API_BASE_URL,vehicle)

export const getVehicle = (vehicleId) => axios.get(REST_API_BASE_URL + '/' + vehicleId)

export const updateVehicle = (vehicleId,vehicle) => axios.put(REST_API_BASE_URL + '/' + vehicleId, vehicle)

export const deleteVehicle = (vehicleId) => axios.delete(REST_API_BASE_URL + '/' + vehicleId)

export const getVehicleByDriverName = (driverName) => {
    const url = `${REST_API_BASE_URL}/driver/${driverName}`;
    return axios.get(url);
};


export const getVehicleByTypeAndPlatesAndDriverName = (vehicleType, towPlate, trailerPlate, driverName) => {
    const url = `${REST_API_BASE_URL}?vehicleType=${vehicleType}&towPlate=${towPlate}&trailerPlate=${trailerPlate}&driverName=${driverName}`;
    
    return axios.get(url);
};