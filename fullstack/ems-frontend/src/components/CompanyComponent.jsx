import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createCompany, getCompany, updateCompany } from "../services/CompanyService"
import HeaderComponent from "./HeaderComponent"
import FooterComponent from "./FooterComponent";



const CompanyComponent = () => {

    const [companyName, setCompanyName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [taxOffice, setTaxOffice] = useState('')
    const [taxNumber, setTaxNumber] = useState('')
    const [address, setAddress] = useState('')

    const {id} = useParams();

    const[errors, setErrors] = useState({

        companyName : '',
        phoneNumber : '',
        email : '',
        taxOffice : '',
        taxNumber : '',
        address : ''
    })

    const navigator = useNavigate();

    useEffect(() => { /* update Company */
        if(id){
            getCompany(id).then((response) =>{
                setCompanyName(response.data.companyName);
                setPhoneNumber(response.data.phoneNumber);
                setEmail(response.data.email);
                setTaxOffice(response.data.taxOffice);
                setTaxNumber(response.data.taxNumber);
                setAddress(response.data.address);
            }).catch(error => {
                console.error(error)
            })
        }
    }, [id])

    function handleCompanyName(e){ 
        setCompanyName(e.target.value);
    
    }
    function handlePhoneNumber(e){
        setPhoneNumber(e.target.value)
    }
    function handleEmail(e){
        setEmail(e.target.value)
    }
    function handleTaxOffice(e){
        setTaxOffice(e.target.value)
    }
    function handleTaxNumber(e){
        setTaxNumber(e.target.value)
    }
    function handleAddress(e){
        setAddress(e.target.value)
    }
    

    function saveOrUpdateCompany(e){
        e.preventDefault();
        if(validateForm()){
            const company = {companyName, phoneNumber, email, taxOffice, taxNumber, address}
            console.log(company)
            if(id){
                updateCompany(id,company).then((response) =>{
                    console.log(response.data)
                    navigator('/company');  
                }).catch(error => {
                    console.error(error);
                })
            }
            else{
                createCompany(company).then((response) =>{
                console.log(response.data);
                navigator('/company') 
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }


    function validateForm(){
        let valid = true;

        const errorCopy = {...errors}

        if(companyName.trim()){
            errorCopy.companyName = '';
        }
        else{
            errorCopy.companyName = 'Firma Adı Gerekli';
            valid = false;
        }

        if(phoneNumber.trim()){
            errorCopy.phoneNumber = '';
        }
        else{
            errorCopy.phoneNumber = 'Firma Telefon Numarası Gerekli';
            valid = false;
        }

        if(email.trim()){
            errorCopy.email = '';
        }
        else{
            errorCopy.email = 'Email Gerekli'
            valid = false;
        }

        if(taxOffice.trim()){
            errorCopy.taxOffice = '';
        }
        else{
            errorCopy.taxOffice = 'Vergi Dairesi Gerekli'
            valid = false;
        }

        if(taxNumber.trim()){
            errorCopy.taxNumber = '';
        }
        else{
            errorCopy.taxNumber = 'Vergi Numarası Gerekli'
            valid = false;
        }

        if(address.trim()){
            errorCopy.address = '';
        }
        else{
            errorCopy.address = 'Firma Adresi Gerekli'
            valid = false;
        }

        setErrors(errorCopy);
        return valid
    }


    function pageTitle(){  
        if (id) {
            return <h2 className='text-center'>FİRMA GÜNCELLE</h2>
        }
        else{
            return <h2 className='text-center'>FİRMA EKLEME</h2>
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
                                 <label className='form-label'> Firma Adı:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Firma Adını Giriniz'
                                    name='companyName'
                                    value={companyName}
                                    className={`form-control ${errors.companyName ? 'is-invalid' : '' }`}
                                    onChange={handleCompanyName} 
                                 ></input>
                                 {errors.companyName && <div className='invalid-feedback'>{errors.companyName}</div>}
    
                            </div>
    
                            <div className='form-group mb-2'>
                                 <label className='form-label'> Telefon Numarası:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Firma Telefon Numarasını Giriniz'
                                    name='phoneNumber'
                                    value={phoneNumber}
                                    className={`form-control ${errors.phoneNumber ? 'is-invalid' : '' }`}
                                    onChange={handlePhoneNumber} 
                                 ></input>
                                 {errors.phoneNumber && <div className='invalid-feedback'>{errors.phoneNumber}</div>}
                            </div>
    
                            <div className='form-group mb-2'>
                                 <label className='form-label'> Email:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Email Giriniz'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : '' }`}
                                    onChange={handleEmail} 
                                 ></input>
                                 {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                 <label className='form-label'> Vergi Dairesi:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Vergi Dairesi Giriniz'
                                    name='taxOffice'
                                    value={taxOffice}
                                    className={`form-control ${errors.taxOffice ? 'is-invalid' : '' }`}
                                    onChange={handleTaxOffice} 
                                 ></input>
                                 {errors.taxOffice && <div className='invalid-feedback'>{errors.taxOffice}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                 <label className='form-label'> Vergi Numarası:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Vergi Numarası Giriniz'
                                    name='taxNumber'
                                    value={taxNumber}
                                    className={`form-control ${errors.taxNumber ? 'is-invalid' : '' }`}
                                    onChange={handleTaxNumber} 
                                 ></input>
                                 {errors.taxNumber && <div className='invalid-feedback'>{errors.taxNumber}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                 <label className='form-label'> Adres:</label>
                                 <input
                                    type = 'text'
                                    placeholder='Firma Adresi Giriniz'
                                    name='address'
                                    value={address}
                                    className={`form-control ${errors.address ? 'is-invalid' : '' }`}
                                    onChange={handleAddress} 
                                 ></input>
                                 {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateCompany}>Kaydet</button>
                        </form>
    
                    </div>
                </div>
            </div>
    
    
        </div>
        <FooterComponent/>
    </div>
    )
}

export default CompanyComponent