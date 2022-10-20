import { useState } from "react"
import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getSalesShipment, setShipmentStatus } from "../../redux/actions"
import { convertPrice } from "../Categories/Products"

const Shipment = () =>{

  const dispatch = useDispatch()
  const sales = useSelector(state => state.salesShipment)
  const refresh = useSelector(state => state.refresh)
  const [status, setStatus] = useState("")


  const changeStatus = (id,status,userId) =>{
    let newStatus = ""

    if(status === "Pendiente") newStatus = "Enviado"
    else if(status === "Enviado") newStatus = "Entregado"
    dispatch(setShipmentStatus({id, status: newStatus, userId}))
  }

  useEffect(() =>{
    dispatch(getSalesShipment(status))
  },[status, refresh])

  return(
    <div >
      <div className="bg-global mt-3 py-5" >
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" name="btnradio" id="all" defaultChecked onClick={()=>setStatus("")}/>
          <label className="btn btn-outline-secondary text-white" for="all">Todos</label>

          <input type="radio" className="btn-check" name="btnradio" id="pending" onClick={()=>setStatus("Pendiente")}/>
          <label className="btn btn-outline-secondary text-white" for="pending">Pendientes</label>

          <input type="radio" className="btn-check" name="btnradio" id="send" onClick={()=>setStatus("Enviado")}/>
          <label className="btn btn-outline-secondary text-white" for="send">Enviados</label>

          <input type="radio" className="btn-check" name="btnradio" id="received" onClick={()=>setStatus("Entregado")}/>
          <label className="btn btn-outline-secondary text-white" for="received">Entregados</label>
        </div>
      </div>
      {sales.length>0 ?
        <div className="card card-body mx-0 my-0 bg-global text-white border-0 shopping-history">
          {sales && sales.map(e=>{
            return(
              <div className="card bg-global my-3 border border-1" key={e.id}>
                <div className="card-body text-white">
                  <p className="card-text text-start">Fecha: {e.date.slice(0,10)}</p>
                  <p className="card-text text-start">Número de orden: {e.orderNum}</p>
                  <p className="card-text text-start">Estado: <span className={e.status==="Pendiente" ? "text-warning" : e.status==="Enviado" ? "text-info" : "text-success"}>{e.status}</span></p>

                  <button className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target={"#d"+e.id.slice(0,3)}>Detalles</button>

                  <div className="modal fade" id={"d"+e.id.slice(0,3)} tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content bg-global">
                        <div className="modal-header">
                          <h5 className="modal-title" id="infoModalLabel">Detalles de compra</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          {e.cart.products && e.cart.products.map(f=>{
                            return(
                              <div key={f.id}>
                                <div className="row mx-0">
                                  <div className="col-1 text-center fw-bold d-flex align-items-center">
                                    <span className="h4">{f.cant} </span>
                                  </div>
                                  <div className="col-4">
                                    <img src={f.image} width="100" height="100"></img>
                                  </div>
                                  <div className="col d-flex align-items-center">
                                    <span className="text-wrap">{f.name}</span> <br></br>
                                  </div>
                                </div>
                                <hr/>
                              </div>
                            )
                          })}
                          <div className="text-center fw-bold h5">
                            {e.status === "Entregado" ?
                              <h3 className="text-success fw-bold fst-italic">El pedido ya fue entregado</h3>
                            :
                              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=> changeStatus(e.id,e.status,e.user.id)}>{e.status ==="Pendiente" ? "Confirmar envio" : "Confirmar entrega"}</button>
                            }
                          </div>
                        </div>		
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      :
        <div className="text-center">
          <h3 className="text-white my-5">No se encontraron resultados</h3>
        </div>
      }
    </div>
  )
}

export default Shipment