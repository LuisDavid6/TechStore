import { useDispatch, useSelector } from "react-redux";
import {  getProducts, updateProduct } from "../../redux/actions";
import { useEffect, useState } from "react";
import AddOffer from "./AddOffer";

const Offers = () =>{

	const dispatch = useDispatch()
  const products = useSelector((state)=> state.products)
  const refresh = useSelector((state)=> state.refresh)

  const deleteOffer = (id) =>{
    dispatch(updateProduct({imageOffer:null},id))
  }

  const [show, setShow] = useState(true)
  let showIcon = false

  if(window.screen.width < 777) showIcon = true
  
  
  useEffect(()=>{
    if(window.screen.width < 777) setShow(false)
    dispatch(getProducts())
  },[refresh])

	return(
    <div className="text-center">
		  <div className="row mx-0">
        <div className="col-md-4 mt-2 py-2 text-white bg-global">
          {showIcon &&
            <i class="bi bi-text-center text-white h1" onClick={()=> setShow(!show)}></i>
          }
          {show &&       
            <AddOffer/>
          }
        </div>
        <div className="col mb-5">
          <div className=" product-list-offers-admin">
            {products && products.map(e=>{
              return(
                e.imageOffer &&
                <div className="d-flex flex-column bg-global rounded-3 mt-3">
                  <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target={"#p"+e.id.slice(0,3)}>Eliminar</button>
                  {/* <i className="bi bi-x-circle-fill h1 position-absolute top-0 end-0" style={{color:"red"}}></i> */}
                  <img src={e.imageOffer} className="rounded" alt={e.name} width="100%" height="100%"/>
                  <h6 className="text-wrap text-white text-truncate mt-2 px-2" style={{height:"55px"}}>{e.name}</h6>
                  
                  <div className="modal fade" id={"p"+e.id.slice(0,3)} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content bg-global">
                        <div className="modal-header">
                          <h5 className="modal-title text-white" id="deleteModalLabel">¿Esta seguro de eliminar la oferta?</h5>
                          <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                          <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=> deleteOffer(e.id)}>Confirmar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )
              })}
          </div> 
        </div>
      </div>
		</div>
      
	)
}


export default Offers