import s from "./Styles/Cart.module.css"
import NavBar from "./NavBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addToCart, payOut, removeFromCart, verifyRole } from "../redux/actions"
import { convertPrice } from "./Categories/Products"
import Checkout from "./Checkout"
import { Link } from "react-router-dom"

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
											<Link to={`/product/${e.id}`}><img src={e.image} width="100" height="100"></img></Link>
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
											<p className="text-white">SubTotal</p>
											<span className="text-white h5">{convertPrice(e.totalValue)}</span>
										</div>
										<div className="modal fade" id={"p"+e.id.slice(0,3)} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
											<div className="modal-dialog">
												<div className="modal-content bg-global">
													<div className="modal-header">
														<h5 className="modal-title text-white" id="deleteModalLabel">¿Esta seguro de eliminar el producto?</h5>
														<button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
													</div>
													<div className="modal-footer">
														<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
														<button type="button" className="btn btn-primary" data-bs-dismiss="modal" >Confirmar</button>
													</div>
												</div>
											</div>
										</div>    
									</div>
								</div>
							)
						})}
						<div className="container bg-global container-fix rounded-3 p-3 mt-5">
							<h3 className="text-white my-4">Total A Pagar: {currentUser.cart && convertPrice(currentUser.cart.total)}</h3>
							<button type="button" className="btn btn-secondary btn-lg px-5 my-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Ir a pagar</button>
						</div>
						<div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
							<div class="offcanvas-header">
								<h5 class="offcanvas-title" id="offcanvasBottomLabel">Realizar Pago</h5>
								<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
							</div>
							<div class="offcanvas-body small">
								<Checkout/>
							</div>
						</div>


					</div>
				: 
					<h2 className="text-white">NO HAY PRODUCTOS</h2>}
		</div>
	)
}
