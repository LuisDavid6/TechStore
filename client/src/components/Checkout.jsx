import {CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { payOut } from "../redux/actions"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Checkout(){
	
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

	const appearance = {
		theme: 'night'
	  };

	const options = "33"
	
	const dispatch = useDispatch()
	const history =  useNavigate()
	const stripe = useStripe()
	const elements = useElements()
	const element = stripe.elements({options},{appearance})

	const handleSubmit = async(e)=>{
		e.preventDefault()
		try{

			const {error, paymentMethod} = await stripe.createPaymentMethod({
				type:"card",
				card: elements.getElement(CardElement),
			})
			
			if(!error){

				const pay = await dispatch(payOut(paymentMethod.id))
				if(pay === "successfull purchase") {
					successNotify()
					setTimeout(() => {
						history("/profile", { replace: true });
					}, 1000);
				} else errorNotify()
			}
			
		}catch(e){
			errorNotify()
		}
	}
	return(
		<div className="text-white bg-white p-4">

			<form onSubmit={handleSubmit}>
				<CardElement className="form-control" options={element}/>
				<button type="submit">Pagar</button>
			</form>
			<button onClick={()=>history("/profile", { replace: true })}>IR</button>
		</div>
	)
}