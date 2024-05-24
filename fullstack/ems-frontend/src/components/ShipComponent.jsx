import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createShip, getShip, updateShip } from "../services/ShipService"
import HeaderComponent from "./HeaderComponent"
import FooterComponent from "./FooterComponent"




const ShipComponent = () => {

    const [shipName, setShipName] = useState('')
    const [exporter, setExporter] = useState('')
    const [departurePort, setDeparturePort] = useState('')
    const [destinationPort, setDestinationPort] = useState('')
    const [uploadDate, setUploadDate] = useState('')
    const [load, setLoad] = useState('')

    const {id} = useParams();

    const[errors, setErrors] = useState({
        shipName : '',
        exporter : '',
        departurePort : '', 
        destinationPort : '',
        uploadDate : '',
        load : ''
    })

    const navigator = useNavigate();

    useEffect(() => { /* Update Ship */
        if (id) {
            getShip(id).then((response) => {
                setShipName(response.data.shipName);
                setExporter(response.data.exporter);
                setDeparturePort(response.data.departurePort);
                setDestinationPort(response.data.destinationPort);
                setUploadDate(response.data.uploadDate);
                setLoad(response.data.load);
            }).catch(error => {
                console.error(error)
            })
        }
    }, [id])


    function handleShipName(e){
        setShipName(e.target.value);
    }
    function handleLoad(e){
        setLoad(e.target.value);
    }

    function handleExporter(e){
        setExporter(e.target.value)
    }
    function handleDeparturePort(e){
        setDeparturePort(e.target.value)
    }
    function handleDestinationPort(e){
        setDestinationPort(e.target.value)
    }
    function handleUploadDate(e){
        setUploadDate(e.target.value)
    }


    function saveOrUpdateShip(e){
        e.preventDefault();
        if(validateForm()){
            const ship = {shipName, exporter, departurePort, destinationPort, uploadDate, load}
            console.log(ship)

            if(id){
                updateShip(id,ship).then((response) =>{
                    console.log(response.data)
                    navigator('/ship');  
                }).catch(error => {
                    console.error(error);
                })
            }
            else{
                createShip(ship).then((response) =>{
                console.log(response.data);
                navigator('/ship')            
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm(){
        let valid = true;

        const errorCopy = {...errors}

        if(load.trim()){
            errorCopy.load= '';
        }
        else{
            errorCopy.load = 'Gemi Yükü Gerekli';
            valid = false;
        }

        if(uploadDate.trim()){
            errorCopy.uploadDate = '';
        }
        else{
            errorCopy.uploadDate = 'Yüklenme Tarihi Gerekli';
            valid = false;
        }

        if(shipName.trim()){
            errorCopy.shipName = '';
        }
        else{
            errorCopy.shipName = 'Gemi Adı Gerekli';
            valid = false;
        }

        if(exporter.trim()){
            errorCopy.exporter = '';
        }
        else{
            errorCopy.exporter = 'İhracatçı Gerekli';
            valid = false;
        }

        if(departurePort.trim()){
            errorCopy.departurePort = '';
        }
        else{
            errorCopy.departurePort = 'Kalkış Limanı Gerekli';
            valid = false;
        }

        if(destinationPort.trim()){
            errorCopy.destinationPort = '';
        }
        else{
            errorCopy.destinationPort = 'Varış Limanı Gerekli';
            valid = false;
        }

        setErrors(errorCopy);
        return valid

    }


    function pageTitle(){  
        if (id) {
            return <h2 className='text-center'>GEMİ GÜNCELLE</h2>
        }
        else{
            return <h2 className='text-center'>GEMİ EKLEME</h2>
        }
    }

    return(
<div>
        <HeaderComponent/>
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                   {
                    pageTitle()  
                   }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                 <label className='form-label'> Gemi Adı:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Gemi Adını Giriniz'
                                    name='shipName'
                                    value={shipName}
                                    className={`form-control ${errors.shipName ? 'is-invalid' : '' }`}
                                    onChange={handleShipName} 
    /* input alanında herhangi bir değişiklik olduğunda tetiklenicek fonksiyonu belirtir.  onChange ={handleFirstName} satırından bahsediliyor.*/
                                 
                                 ></input>
                                 {errors.shipName && <div className='invalid-feedback'>{errors.shipName}</div>}
    
                            </div>
    
                            <div className='form-group mb-2'>
                                 <label className='form-label'> İhracatçı Adı:</label>
                                 <input
                                    type = 'text'
                                    placeholder='İhracatçı Adını Giriniz'
                                    name='exporter'
                                    value={exporter}
                                    className={`form-control ${errors.exporter ? 'is-invalid' : '' }`}
                                    onChange={handleExporter} 
    
                                 
                                 ></input>
                                 {errors.exporter && <div className='invalid-feedback'>{errors.exporter}</div>}
                            </div>
    
                            <div className='form-group mb-2'>
                                 <label className='form-label'> Kalkış Limanı:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Kalkış Limanı Giriniz'
                                    name='departurePort'
                                    value={departurePort}
                                    className={`form-control ${errors.departurePort ? 'is-invalid' : '' }`}
                                    onChange={handleDeparturePort} 
    
                                 
                                 ></input>
                                 {errors.departurePort && <div className='invalid-feedback'>{errors.departurePort}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                 <label className='form-label'> Varış Limanı:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Varış Limanı Giriniz'
                                    name='destinationPort'
                                    value={destinationPort}
                                    className={`form-control ${errors.destinationPort ? 'is-invalid' : '' }`}
                                    onChange={handleDestinationPort} 
    
                                 
                                 ></input>
                                 {errors.destinationPort && <div className='invalid-feedback'>{errors.destinationPort}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                 <label className='form-label'> Gemi Yükü:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Gemi Yükünü Giriniz'
                                    name='load'
                                    value={load}
                                    className={`form-control ${errors.load ? 'is-invalid' : '' }`}
                                    onChange={handleLoad} 
    
                                 
                                 ></input>
                                 {errors.load && <div className='invalid-feedback'>{errors.load}</div>}
                            </div>
    

                            <div className='form-group mb-2'>
                                 <label className='form-label'> Yüklenme Tarihi:</label>
                                 <input
                                    type = 'date'
                                    placeholder='Yüklenme Tarihini Giriniz'
                                    name='exporter'
                                    value={uploadDate}
                                    className={`form-control ${errors.uploadDate ? 'is-invalid' : '' }`}
                                    onChange={handleUploadDate} 
    
                                 
                                 ></input>
                                 {errors.uploadDate && <div className='invalid-feedback'>{errors.uploadDate}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateShip}>Kaydet</button>
                        </form>
    
                    </div>
                </div>
            </div>
    
    
        </div>
        <FooterComponent/>
    </div>


    )
}


export default ShipComponent