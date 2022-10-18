import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import {getSalesAdmin} from "../../redux/actions"
import SalesBar from "./SalesBar"
import SalesByCategory from "./SalesByCategory"

const SalesManagement = () =>{

  const dispatch = useDispatch()
  const sales = useSelector(state => state.salesAdmin)

  useEffect(()=>{
    dispatch(getSalesAdmin("18"))
  },[])

  return(
    <div className='row mx-0 mt-3'>
      <div className='col-sm-4 card text-center bg-global mx-2 my-2'>
          <div className='card-header text-white'>
            <h4>Ventas por categoria</h4>
          </div>
          <div className='card-body'>
            <SalesByCategory sales={sales}/>
          </div>
          <div className='card-footer text-muted'>Top más vendidas</div>
      </div>

      <div className='col card text-center bg-global mx-2 my-2'>
        <div className='card-header text-white'>
          <h4>Ventas mensuales</h4>
        </div>
        <div className='card-body'>
          <SalesBar sales={sales}/>
        </div>
        <div className='card-footer text-muted'>Total de ventas de los ultimos meses</div>
      </div>
    </div>
  )
}

export default SalesManagement