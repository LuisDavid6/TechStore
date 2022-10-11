import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../redux/actions"
import Footer from "../Footer"
import NavBar from "../NavBar"
import { Link } from "react-router-dom"

export default function Container(){
    
	const dispatch = useDispatch()
	const products = useSelector(state => state.products)
	const currentUser = useSelector(state => state.currentUser)
    
	useEffect(()=>{
			dispatch(getProducts())
	},[])

	return(
		<div>
			<NavBar/>
			<div>
				{products.length>0 ?
					<div className="product-list-offers">
						{products.map(e =>{
							return(
								e.imageOffer &&
								<div key={e.id} className="card rounded bg-global border border-primary">
									<div className="card-body p-0 h-100">
										<Link to={`/product/${e.id}`}>  
											<img
												src={e.imageOffer}
												className="rounded"
												alt={e.name}
												width="100%"
												height="100%"
											/>
										</Link>
									</div>
									
								</div>
							)
						})}
					</div>
				:
					<div className="text-center">
						<div className="spinner-border text-primary mt-5" role="status" style={{width: "6rem", height: "6rem"}}>
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				}
			</div>
			<Footer/>  
		</div>
  )
}