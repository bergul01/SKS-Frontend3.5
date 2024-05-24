import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCompany, listCompanies } from "../services/CompanyService";
import HeaderComponent from "./HeaderComponent";


export const ListCompanyComponent = () => {

    const [companies, setCompanies] = useState([])
  
    const navigator = useNavigate();
  
    useEffect(() => {   /* add company */
        getAllCompanies();
  
    },[])
  
    function getAllCompanies(){
        listCompanies().then((response) => {
            setCompanies(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
  
    function addNewCompanies(){  {/* add company butonu için oluşturduğumuz fonksiyon */}
        navigator('/add-company')
    }
  
    function updateCompany(id){
        navigator(`/edit-company/${id}`)
    }
  
    function removeCompany(id){
        console.log(id);
  
        deleteCompany(id).then((response) =>{
            getAllCompanies();
        }).catch(error => {
            console.error(error);
        })
    }
  
    return(
    <div>
        <HeaderComponent/>
        <div className='.container'>
          <h2 className='text-center'>Firma Listesi</h2> 
          <button className='btn btn-primary mb-2' onClick={addNewCompanies}>Firma Ekle</button>
      <table className='table table-striped table-bordered'>
          <thead>
              <tr>
                  <th>Firma Id</th>
                  <th>Firma Adı</th>
                  <th>Telefon Numarası</th>
                  <th>Email</th>
                  <th>Vergi Dairesi</th>
                  <th>Vergi Numarası</th>
                  <th>Adres</th>
                  <th>İşlem</th>
  
              </tr>
          </thead>
          <tbody>
              {
                  companies.map(company =>
                      <tr key = {company.id}>
                          <td>{company.id}</td>
                          <td>{company.companyName}</td>
                          <td>{company.phoneNumber}</td>
                          <td>{company.email}</td>
                          <td>{company.taxOffice}</td>
                          <td>{company.taxNumber}</td>
                          <td>{company.address}</td>
                          <td>
                              <button className='btn btn-info' onClick={() => updateCompany(company.id)}>Güncelle</button>
                              <button className='btn btn-danger' onClick={() => removeCompany(company.id)}
                                  style={{marginLeft: '10px'}}
                              >Sil</button>
                          </td>
                          
                      </tr>)
              }
          </tbody>
      </table>
  
  
  
      </div>
      </div>
  
     
  

    )
}

export default ListCompanyComponent