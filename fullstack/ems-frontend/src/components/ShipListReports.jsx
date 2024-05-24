import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listShips } from "../services/ShipService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";



export const ShipListReports =  () => {

    const [ships, setShips] = useState([])
    

    const navigator = useNavigate();

    useEffect(() => {
        getAllShips();
    },[])

    function getAllShips(){
        listShips().then((response) =>{
            setShips(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const detailRapor = () => {
        navigator('/shipRaportsDetails')
    }


    return(
        <div>
        <HeaderComponent/>
        <div className='.container'>
          <h2 className='text-center'>Gemi Raporları</h2> 
          <button className='btn btn-info' onClick={detailRapor}>Görüntüle</button>
          <br /><br />
         
      <table className='table table-striped table-bordered'>
          <thead>
              <tr>
                  <th>Gemi Adı</th>
              </tr>
          </thead>
          <tbody>
              {
                  ships.map(ship =>
                      <tr key = {ship.id}>
                         
                          <td>{ship.shipName}</td>

                          
                      </tr>)
              }
          </tbody>
      </table>
  
  
  
      </div>
      <FooterComponent/>
  </div>
     
  
    )
}

export default ShipListReports