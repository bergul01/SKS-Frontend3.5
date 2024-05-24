import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listShipments } from "../services/ForwardService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";



export const CompanyListReportsDetails = () => {

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
            <h2 className='text-center'>Firma Detay Rapor</h2>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                    <th>Tarih</th>
                    <th>Firma</th>
                    <th>Yüklendiği Gemi</th>
                    <th>Araç Sınıfı</th>
                    <th>Çekici</th>
                    <th>Dorse</th>
                    <th>Kalkış Yeri</th>
                    <th>Varış Yeri</th>
                    <th>Ürün Yeri</th>
                    <th>Fiyat</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments.map((shipment) => (
                        <tr key={shipment.id}>
                            <td>{shipment.shipmentDate}</td>
                            <td>{shipment.company.companyName}</td>
                            <td>{shipment.ship.shipName}</td>
                            <td>{shipment.vehicles[0].vehicleType}</td>
                            <td>{shipment.vehicles[0].towPlate}</td>
                            <td>{shipment.vehicles[0].trailerPlate}</td>
                            <td>{shipment.departurePoint}</td>
                            <td>{shipment.destinationPoint}</td>
                            <td>{shipment.product.productName}</td>
                            <td>{shipment.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    </div>
    )

}