import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyRole } from "../redux/actions";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {convertPrice} from "../components/Categories/Products"
import { Link } from "react-router-dom";

export default function Profile(){

	const dispatch = useDispatch()
	const currentUser = useSelector(state =>state.currentUser)

	useEffect(() =>{
		dispatch(verifyRole())
	}, [])

	return(
		<div>
			<NavBar/>
			<div className="bg-global mx-0 my-2 p-4 pt-5 rounded-0 text-start">
        <i className="bi bi-person-circle text-white h1 me-3" style={{fontSize:"64px"}}></i>
				<span className="mb-0 w-25 text-secondary h1">
        {currentUser.userName}
        </span><br/><br/><br/>
        <i className="bi bi-envelope text-white h1 me-3" style={{fontSize:"44px"}}></i>
				<span className="mb-0 w-25 text-secondary h2">
        {currentUser.email}
        </span><br/><br/><br/>
				<i className="bi bi-card-checklist h1 text-white me-3"></i>
				<span className="dropdown-toggle mb-0 w-25 text-white h3" data-bs-toggle="collapse" data-bs-target="#collapseEspec" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Historial de compras
        </span>
        <div className="collapse" id="collapseEspec">
          {currentUser.sales &&
            <div className="card card-body mb-3 bg-global text-white border-0 shopping-history">
              {currentUser.sales.length>0 ?
                currentUser.sales.map(e=>{
                  return(
                    <div className="card bg-global my-3 border border-1">
                      <div className="card-body text-white">
                        <p className="card-text text-start">Fecha: {e.date.slice(0,10)}</p>
                        <p className="card-text text-start">Número de orden: {e.orderNum}</p>
                        <p className="card-text text-start">Total Compra: {convertPrice(e.cart.total)}</p>
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
                                    <div>
                                      <div className="row mx-0">
                                        <div className="col-4">
                                          <img src={f.image} width="100" height="100"></img>
                                        </div>
                                        <div className="col d-flex align-items-center">
                                          <span className="text-wrap">{f.name}</span> <br></br>
                                        </div>
                                      </div>
                                      <div className="text-center fw-bold">
                                        <span className="me-2">{f.cant} </span>
                                        <span className="">{convertPrice(f.totalValue)}</span>
                                      </div>
                                      <hr/>
                                    </div>
                                  )
                                })}
                                <div className="text-center fw-bold h5">
                                  <span className="">Total Compra: {convertPrice(e.cart.total)}</span>
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
                })
              :
                <div className="bg-global text-white border-0 h6 mt-4 ms-4">
                  No has realizado ninguna compra
                </div>
              }
            </div>
          }
        </div><br/><br/><br/>
				<i className="bi bi-chat-text h1 text-white me-3"></i>
        <span className="dropdown-toggle my-5 w-25 text-white h3" data-bs-toggle="collapse" data-bs-target="#collapseDesc" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Comentarios
        </span>
        <div className="collapse" id="collapseDesc">
          <div className="card card-body bg-global text-white border-0 h6 mt-4 ms-4">
            No has hecho comentarios aún
          </div>
        </div>
			</div>
			<Footer/>
		</div>
  )
}