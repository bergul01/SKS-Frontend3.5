import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams} from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import FooterComponent from "./FooterComponent";

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams();

    const[errors, setErrors] = useState({
        firstName : '',
        lastName : '',
        email : ''
    })

    const navigator = useNavigate();

    useEffect(() => {     /* Update Employee */
        if(id){
            getEmployee(id).then((response) =>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error)
            })
        }

    }, [id])

    function handleFirstName(e){ {/* input alanında yapılan değişiklikleri yakalar ve state'i güncellemek için kullanılır
'e.target.value' kullanıcı tarafından input alanına girilen metini temsil eder ve bu değer 
'setFirstName' fonksiyonuyla 'firstName' adlı bir state'e atanır. */}
        setFirstName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value)
    }

    

    function handleEmail(e){
        setEmail(e.target.value)
    }
    
    function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){
            const employee = {firstName, lastName, email}
            console.log(employee)
/* update yapılırsa if blok çalışır normal bir add işlemi yapılırsa else blok çalışıcak */
            if(id){
                updateEmployee(id,employee).then((response) =>{
                    console.log(response.data)
                    navigator('/employees');  
                }).catch(error => {
                    console.error(error);
                })
            }
            else{
             {/* EmployeeService tarafında oluşturduğumuz createEmployee burda çağırdık bir employee kaydettiğimiz zaman
                                            unun database tarafında tutulması için aşağıda bulunan fonk ihtiyacımız var */}
                createEmployee(employee).then((response) =>{
                console.log(response.data);
                navigator('/employees')            /*kullanıcıyı ekledikten sonra navigator fonksiyonu ile kullanıcıyı employees sayfasına
            yani anasayfaya tekrardan gönderdik bunun için öncelikle import ettik navigatoru react router dom kütüphanesinden
            ardından navigator const oluşturduk ve bu kısımda çağırdık.*/
                }).catch(error => {
                    console.error(error);
                })
            }

       
        }

    }

    function validateForm(){
        let valid = true;

        const errorCopy = {...errors}

        if(firstName.trim()){
            errorCopy.firstName = '';
        }
        else{
            errorCopy.firstName = 'Adınız Gerekli';
            valid = false;
        }

        if(lastName.trim()){
            errorCopy.lastName = '';
        }
        else{
            errorCopy.lastName = 'Soyadınız Gerekli';
            valid = false;
        }

        if(email.trim()){
            errorCopy.email = '';
        }
        else{
            errorCopy.email = 'Email Gerekli'
            valid = false;
        }

        setErrors(errorCopy);
        return valid
    }

    function pageTitle(){   /* statik page update and add employee */
        if (id) {
            return <h2 className='text-center'>Personel Güncelle</h2>
        }
        else{
            return <h2 className='text-center'>Personel Ekle</h2>
        }

    }

  return (
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
                             <label className='form-label'> Ad:</label>
                             <input
                                type = 'text'
                                placeholder=' Personel Adını Giriniz'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : '' }`}
                                onChange={handleFirstName} 
/* input alanında herhangi bir değişiklik olduğunda tetiklenicek fonksiyonu belirtir.  onChange ={handleFirstName} satırından bahsediliyor.*/
                             
                             ></input>
                             {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}

                        </div>

                        <div className='form-group mb-2'>
                             <label className='form-label'> Soyad:</label>
                             <input
                                type = 'text'
                                placeholder=' Personel Soyadını Giriniz'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid' : '' }`}
                                onChange={handleLastName} 

                             
                             ></input>
                             {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                             <label className='form-label'> Email:</label>
                             <input
                                type = 'text'
                                placeholder=' Personel Email Giriniz'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid' : '' }`}
                                onChange={handleEmail} 

                             
                             ></input>
                             {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Kaydet</button>
                    </form>

                </div>
            </div>
        </div>


    </div>
    <FooterComponent/>
    </div>
  )
}

export default EmployeeComponent