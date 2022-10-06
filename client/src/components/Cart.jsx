import s from "./Styles/Cart.module.css"
import NavBar from "./NavBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addToCart, payOut, removeFromCart, verifyRole } from "../redux/actions"
import { convertPrice } from "./Categories/Products"
import {CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart(){
	

	const successNotify = () =>{
		toast.success('Compra Exitosa', {
		  position: "top-center",
		  autoClose: 3000,
		  hideProgressBar: true,
		  closeOnClick: true,
		  pauseOnHover: true,
		  draggable: true,
		  progress: false,
		  theme:"dark",
		});
	} 
	
	const errorNotify = () =>{
		toast.error('No se ha podido completar la compra!', {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: false,
			theme:"dark",
		});
	}

	const history =  useNavigate()
	const stripe = useStripe()
	const elements = useElements()
	const dispatch = useDispatch()
	const currentUser = useSelector(state=> state.currentUser) 
	const [loading,setLoading] = useState(true)
	const [load,setLoad] = useState(0)
	const [correctCard, setCorrectCard] = useState(false)
	const [payment, setPayment] = useState()
	const [errorPayment, setErrorPayment] = useState(false)

	const verifyPayment = async() =>{
		const {error, paymentMethod} = await stripe.createPaymentMethod({
			type:"card",
			card: elements.getElement(CardElement),
		})

		if(!error){
			setPayment(paymentMethod)
			setCorrectCard(true)
		}
	}

	const handleSubmit = async(e)=>{

		e.preventDefault()
		setLoading(true)
		setErrorPayment(false)

		setTimeout(()=>{
			setLoad(load+20)
		},800)

		try{
			const {error, paymentMethod} = await stripe.createPaymentMethod({
				type:"card",
				card: elements.getElement(CardElement),
			})
			
			// if(!error){
				if(payment){

				
				// const pay = await dispatch(payOut(paymentMethod.id))
				const pay = await dispatch(payOut(payment.id))
				if(pay === "successfull purchase") {

					successNotify()
					setLoading(false)
					setLoad(0)
					// setTimeout(() => {
					// 	history("/profile", { replace: true });
					// }, 1000);
				} else{
					setErrorPayment(true)
					setLoading(false)
					setLoad(0)
					errorNotify()
				} 
			}
			
		}catch(e){
			setErrorPayment(true)
			setLoading(false)
			setLoad(0)
			errorNotify()
		}
	}

	useEffect(()=>{
		dispatch(verifyRole())
	},[])

	useEffect(()=>{

		if(load>=20){
			setTimeout(()=>{
				if(load<=100)setLoad(load+20)
			},800)
		}
	},[load])
	
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
							<button type="button" className="btn btn-secondary btn-lg px-5 my-4" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">Ir a pagar</button>
						</div>						

						<div className="modal fade" id="exampleModalToggle" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content bg-dark">
									<div className="modal-header">
										<h5 className="modal-title text-white" id="exampleModalToggleLabel">Realizar Pago</h5>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										<div className="text-white p-4">
											<form onSubmit={handleSubmit}>
												<CardElement className="form-control" onChange={e=>verifyPayment()}/> {/*options={element} */}
												<h6 className="fst-italic fw-normal text-start my-0 ms-4 mt-1">4242 4242 4242 4242 ---- 02/24  ---- 123 ---- 12345</h6>
												<button className="btn btn-outline-success mt-3" type="submit"  data-bs-toggle={correctCard ? "modal":null} data-bs-target={correctCard ? "#staticBackdrop" :null}>Pagar</button>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content bg-dark">
									{loading ?
										<div className="modal-body text-white h3">
											Estamos procesando tu pago...
											<div className="progress mt-3">
											<div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: load+"%"}}></div>
											</div>
										</div>
									: errorPayment ?
										<div className="modal-body text-white h3">
											<h3>Ha ocurrido un error con el pago</h3>
											<button className="btn btn-outline-info mt-3" data-bs-toggle="modal" data-bs-target="#exampleModalToggle">Intentar nuevamente</button>
										</div>
									:
										<div className="modal-body text-white h3">
											<h2>Felicidades tu compra se ha completado con exito</h2>
											<h3>Este es tu número de seguimiento </h3>
											<Link to="/home"><button className="btn btn-outline-info mt-3 me-3" data-bs-dismiss="modal" aria-label="Close">Volver a inicio</button></Link>
											<Link to="/profile"><button className="btn btn-outline-info mt-3" data-bs-dismiss="modal" aria-label="Close">Ir a mis compras</button></Link>
										</div>
									}
								</div>
							</div>
						</div>
					</div>
				: 
					<h2 className="text-white">NO HAY PRODUCTOS</h2>}
		</div>
	)
}
