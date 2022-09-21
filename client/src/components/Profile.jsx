import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyRole } from "../redux/actions";
import Footer from "./Footer";
import NavBar from "./NavBar";
import {convertPrice} from "../components/Categories/Products"

export default function Profile(){

	const dispatch = useDispatch()
	const currentUser = useSelector(state =>state.currentUser)

	useEffect(() =>{
		dispatch(verifyRole())
	}, [])

	return(
		<div>
			<NavBar/>
			<div>
				<span className="text-white h3 mx-3">{currentUser.email}</span>
				<span className="text-white h3 mx-3">{currentUser.userName}</span>
			</div>
			<div>
				{currentUser.sales && currentUser.sales.map(e=>{
					return(
						<div className="card bg-global w-50 my-3 mx-auto">
							<div className="card-body text-white">
								<p className="card-text text-end">{e.date.slice(0,10)}</p>
								<p>
									{e.cart.products && e.cart.products.map(f=>{
										return(
											<div className="text-start">
												<p>
													<span className="mx-2">{f.cant}</span>
													<span className="">{f.name}</span>
													<span className="ms-5">{convertPrice(f.totalValue)}</span>
												</p>
											</div>
										)
									})}
								</p>
								<p className="card-text text-start mt-5">Total Compra: {convertPrice(e.cart.total)}</p>

							</div>
						</div>
					)
				})

				}

			</div>
			<Footer/>
		</div>
  )
}