import { useEffect, useState } from "react";
import { listShipments } from "../services/ForwardService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";



export const ShipListReportsDetails = () => {

    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        getAllShipments();
    }, []);

    
    const getAllShipments = async () => {
        try {
            const response = await listShipments();
            setShipments(response.data);
        } catch (error) {
            console.error(error);
        }
    }; 



    

    return(
        <div>
        <HeaderComponent/>
        <div className='container'>
            <h2 className='text-center'>Gemi Detay Rapor</h2>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                    <th>Yüklendiği Gemi</th>
                    <th>Yüklenme Tarihi</th>
                    <th>Kalkış Limanı</th>
                    <th>Varış Limanı</th>
                    <th>Yük</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments.map((shipment) => (
                        <tr key={shipment.id}>
                            <td>{shipment.ship.shipName}</td>
                            <td>{shipment.ship.uploadDate}</td>
                            <td>{shipment.ship.departurePort}</td>
                            <td>{shipment.ship.destinationPort}</td>
                            <td>{shipment.ship.load}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <FooterComponent/>
    </div>
    )
}