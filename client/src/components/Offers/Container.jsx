import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, getProducts } from "../../redux/actions"
import Footer from "../Footer"
import NavBar from "../NavBar"
import { convertPrice } from "../Categories/Products"
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
								e.discount >0 &&
								<div key={e.id} className="card rounded bg-global">
									<h5 class="card-title bg-warning py-3">{e.discount}%</h5>
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
									<div className="card-body">
										<h6 className="card-title text-white text-wrap lh-base text-truncate" style={{ height: "50px" }}>{e.name}</h6>
									</div>
									<div className="card-body">
										{e.discount >0 ?
										<p className="card-text text-white h6 product-price text-decoration-line-through opacity-50 m-0">{convertPrice(e.price)}</p>
										: <p className="card-text text-white h6 product-price text-decoration-line-through opacity-0 m-0">0</p>
										}
										<p className="card-text h5 text-white product-price">{convertPrice(e.totalPrice)}</p>
									</div>
									<div className="card-body px-0 down" >
										<button className="btn btn-success" onClick={() => {dispatch(addToCart({userId: currentUser.id, productId: e.id}))}}>Agregar al carrito
										{/* <i
											className="bi bi-cart-check h2 m-0 text-white float-end pe-3 cursor"
											title="Agregar al carrito"
											onClick={() => {
												dispatch(addToCart({userId: currentUser.id, productId: e.id}));
											//   notifyAddToCart();
											}}
										></i> */}
										</button>
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