import s from "./Styles/Cart.module.css"
import NavBar from "./NavBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addToCart, removeFromCart, verifyRole } from "../redux/actions"
import { convertPrice } from "./Categories/Products"

export default function Cart(){
	
	const dispatch = useDispatch()
	const currentUser = useSelector(state=> state.currentUser) 

	useEffect(()=>{
		dispatch(verifyRole())
	},[])

  return(
		<div>
			<NavBar/>
			{currentUser.cart && currentUser.cart.products.length>0 
				?
					<div>
						{currentUser.cart.products.map(e=>{
							return(
								<div className="card bg-global my-2 w-75 mx-auto" key={e.name}>
									<div className="card-body row">
										<div className="col text-center">
											<img src={e.image} width="100" height="100"></img>
										</div>
										<div className="col my-auto ps-5">
											<span className="text-white">{e.name}</span>
										</div>
										<div className="col my-auto ps-5">
										<p className="text-white h6 text-decoration-line-through opacity-75 m-0">{convertPrice(e.price)}</p>
											<p className="text-white h5">{convertPrice(e.totalPrice)}</p>
										</div>
										<div className="col my-auto mx-auto text-center">
											<i className="bi bi-dash-circle h5 text-white cursor" title="remover" onClick={()=> dispatch(removeFromCart({userId: currentUser.id, productId: e.id}))}></i>
											<span className="text-white mx-2 fw-bold h5">{e.cant}</span>
											<i className="bi bi-plus-circle h5 text-white cursor" title="agregar" onClick={()=> dispatch(addToCart({userId: currentUser.id, productId: e.id}))}></i>
										</div>
										<div className="col my-auto ps-5">
											<p className="text-white">Total</p>
											<span className="text-white h5">{convertPrice(e.totalValue)}</span>
										</div>
										{/* <div className="col-1 my-auto">
											<i className="bi bi-trash3-fill h5 text-white cursor" title="Eliminar" data-bs-toggle="modal" data-bs-target={"#p"+e.id.slice(0,3)}></i>
										</div> */}
										<div className="modal fade" id={"p"+e.id.slice(0,3)} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
											<div className="modal-dialog">
												<div className="modal-content bg-global">
													<div className="modal-header">
														<h5 className="modal-title text-white" id="deleteModalLabel">¿Esta seguro de eliminar el producto?</h5>
														<button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
														<button type="button" className="btn btn-primary" data-bs-dismiss="modal" >Confirmar</button> {/* onClick={()=>dispatch(deleteProduct(e.id))} */}
													</div>
												</div>
											</div>
										</div>    
									</div>
								</div>
							)
						})}
						<h1 className="text-white">Total A Pagar: {currentUser.cart && convertPrice(currentUser.cart.total)}</h1>
					</div>
				: 
					<h2>NO HAY PRODUCTOS</h2>}
		</div>
	)
}
