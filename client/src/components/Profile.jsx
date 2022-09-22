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

			<div className="bg-global mt-1 mx-5 rounded-0 p-5 mb-2 text-start">
				<i class="bi bi-card-checklist h1 text-white me-3"></i>
				<span className="dropdown-toggle mb-0 w-25 text-white h3" data-bs-toggle="collapse" data-bs-target="#collapseEspec" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Historial de compras
        </span>
        <div className="collapse" id="collapseEspec">
          <div className="card card-body mb-5 bg-black text-white border-0 shopping-history">
						{currentUser.sales && currentUser.sales.map(e=>{
							return(
								<div className="card bg-global my-3">
									<div className="card-body text-white">
										<p className="card-text text-end">{e.date.slice(0,10)}</p>
										<p>
											{e.cart.products && e.cart.products.map(f=>{
												return(
													<div className="text-start">
														<p>
															<span className="">- {f.name}</span> <br></br>
															<span className="mx-2">{f.cant}</span>
															<span className="">{convertPrice(f.totalValue)}</span>
														</p>
													</div>
												)
											})}
										</p>
										<p className="card-text text-start mt-5">Total Compra: {convertPrice(e.cart.total)}</p>

									</div>
								</div>
							)
						})}
          </div>
        </div><br/><br/><br/>
				<i class="bi bi-chat-text h1 text-white me-3"></i>
        <span className="dropdown-toggle my-5 w-25 text-white h3" data-bs-toggle="collapse" data-bs-target="#collapseDesc" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Comentarios
        </span>
        <div className="collapse" id="collapseDesc">
          <div className="card card-body bg-global text-white border-0">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
+          </div>
        </div>
			</div>
			<Footer/>
		</div>
  )
}