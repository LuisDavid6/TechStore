import s from "./Styles/Cart.module.css"
import NavBar from "./NavBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { verifyRole } from "../redux/actions"

export default function Cart(){
	
	const dispatch = useDispatch()
	const currentUser = useSelector(state=> state.currentUser) 

	useEffect(()=>{
		dispatch(verifyRole())
	},[])

  return(
		<div>
			<NavBar/>
			{/* <div className={s.main}>
				{cart && cart.length > 0 ? cart.map(e =>{
					return(
						<div key={e.id} className={s.product}>
							<img src={e.image} alt={e.name}></img>
							<h4>{e.name}</h4>
							<h4>Precio ${e.price}</h4>
							<h4>Cantidad: 1</h4>
							<h4>Total: ${e.price}</h4>
							<button className="" >DELETE</button>
						</div>
					)
				}) : <h4 className="text-white">No hay productos</h4>}
			</div> */}
			<div>
				{console.log(currentUser)}
				{currentUser.cart && currentUser.cart.products.map(e=>{
					return(
						<div>
							<h1>{e.name} {e.cant}</h1>
						</div>
					)	
				})}
				<h1>Total: {currentUser.cart && currentUser.cart.total}</h1>
			</div>
		</div>
  )
}