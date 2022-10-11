import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {searchProducts } from "../redux/actions"
import Footer from "./Footer"
import NavBar from "./NavBar"
import { Link, useParams } from "react-router-dom"

export default function Search(){
    
	const dispatch = useDispatch()
  const params = useParams()
	const productsFilter = useSelector(state => state.productsFilter)
	const currentUser = useSelector(state => state.currentUser)
	const refresh = useSelector(state => state.refresh)

    
	useEffect(()=>{
    dispatch(searchProducts(params.query))
	},[params])

	return(
		<div>
			<NavBar/>
			<div>
				{productsFilter[0] === "notFound" ?
						<div className="text-white mt-5 h2"> 
							<h3 className="my-5">No se encontraron resultados para tu búsqueda</h3>
							<img src="/assets/NoResults.gif"></img>
						</div>
				: 
					productsFilter.length>0 ?
						<div className="product-list-offers">
							{productsFilter.map(e =>{
								return(
									<div key={e.id} className="card rounded bg-global border border-primary">
										<div className="card-body p-0 h-100">
												<Link to={`/product/${e.id}`}>  
													<img
														src={e.image}
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
		</div>
  )
}