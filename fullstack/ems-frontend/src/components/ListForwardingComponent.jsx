import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import HeaderComponent from './HeaderComponent';
import { deleteShipment, listShipments } from '../services/ForwardService';
import FooterComponent from './FooterComponent';

export const ListForwardingComponent = () => {
    const [shipments, setShipments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllShipments();
    }, []);

    const getAllShipments = async () => {
        try {
            const response = await listShipments();
            setShipments(response.data);
        } catch (error) {
            console.error('v', error);
        }
    };

    const addNewShipment = () => {
        navigate('/add-forward');
    };

    const updateShipment = (id) => {
        navigate(`/edit-forward/${id}`);
    };

    const removeShipment = async (id) => {
        try {
            await deleteShipment(id);
            getAllShipments();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <HeaderComponent />
            <div className='container'>
                <h2 className='text-center'>Sevkiyat Listesi</h2>
                <button className='btn btn-primary mb-2' onClick={addNewShipment}>Sevkiyat Ekle</button>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                        <th>Comment</th>
                        <th>Tarih</th>
                        <th>Teslimat No</th>
                        <th>Müşteri Telefonu</th>
                        <th>Fiyat</th>
                        <th>Firma Adı</th>
                        <th>Gemi Adı</th>
                        <th>Kalkış Noktası</th>
                        <th>Varış Noktası</th>
                        <th>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map((shipment) => (
                            <tr key={shipment.id}>
                                <td>{shipment.comment}</td>
                                <td>{shipment.shipmentDate}</td>
                                <td>{shipment.teslimatNo}</td>
                                <td>{shipment.customerPhone}</td>
                                <td>{shipment.price}</td>
                                <td>{shipment.company.companyName}</td>
                                <td>{shipment.ship.shipName}</td>
                                <td>{shipment.departurePoint}</td>
                                <td>{shipment.destinationPoint}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateShipment(shipment.id)}>Güncelle</button>
                                    <button className='btn btn-danger' onClick={() => removeShipment(shipment.id)}
                                        style={{ marginLeft: '10px' }}
                                    >Sil</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};


export default ListForwardingComponent