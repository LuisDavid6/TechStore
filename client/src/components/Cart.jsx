import s from "./Styles/Cart.module.css"
import NavBar from "./NavBar"
import { useSelector } from "react-redux"

export default function Cart(){

	const cart = useSelector(state=> state.cart) 

  return(
		<div>
			<NavBar/>
			<div className={s.main}>
				{cart.length > 0 ? cart.map(e =>{
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
				}) : <h4>No hay productos</h4>}
			</div>
		</div>
  )
}