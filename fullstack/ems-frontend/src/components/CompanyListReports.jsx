import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCompanies } from "../services/CompanyService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";


export const ComapnyListReports = () => {

    const [companies, setCompanies] = useState([])
  
    const navigator = useNavigate();

    useEffect(() => {  
        getAllCompanies();
  
    },[])

    function getAllCompanies(){
        listCompanies().then((response) => {
            setCompanies(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const detailRapor = () => {
        navigator('/companyRaportsDetails')
    }



    return(
        <div>
        <HeaderComponent/>
        <div className='.container'>
          <h2 className='text-center'>Firma Raporları</h2> 
          <button className='btn btn-info' onClick={detailRapor}>Görüntüle</button>
          <br /><br />
      <table className='table table-striped table-bordered'>
          <thead>
              <tr>
                  <th>Firma</th>  
              </tr>
          </thead>
          <tbody>
              {
                  companies.map(company =>
                      <tr key = {company.id}>
                          <td>{company.companyName}</td>
                      </tr>)
              }
          </tbody>
      </table>
  
  
  
      </div>
      
      </div>
  
  
    )
}

export default ComapnyListReports