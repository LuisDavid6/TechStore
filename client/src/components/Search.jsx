import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {addToCart, searchProducts } from "../redux/actions"
import Footer from "./Footer"
import NavBar from "./NavBar"
import { Link, useParams } from "react-router-dom"
import { convertPrice } from "./Categories/Products"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Search(){
    
	const dispatch = useDispatch()
  const params = useParams()
	const productsFilter = useSelector(state => state.productsFilter)
	const currentUser = useSelector(state => state.currentUser)
  const role = useSelector(state => state.role)
	const refresh = useSelector(state => state.refresh)


  const add = (data) =>{
    if(role === "user" || role === "admin"){
      dispatch(addToCart(data))
      notifyAddToCart();
    }
    else errorNotify()
  }

  const notifyAddToCart = () => {
    toast.success("Articulo agregado al carrito", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      theme: "dark",
    });
  }

  const errorNotify = () =>{
    toast.error('Debes iniciar sesión primero', {
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

	useEffect(()=>{
    dispatch(searchProducts(params.query))
	},[params])

	return(
		<div>
			<NavBar/>
			<div className="mt-4">
				{productsFilter[0] === "notFound" ?
						<div className="text-white mt-5 h2"> 
							<h3 className="my-5">No se encontraron resultados para tu búsqueda</h3>
							<img src="/assets/NoResults.gif"></img>
						</div>
				: 
					productsFilter.length>0 ?
            <div className="product-list">
              {productsFilter.map((e) => {
                return (
                  <div key={e.id} className="card rounded bg-global">
                    <div className="card-body p-0 h-100">
                      <img
                        src={e.image}
                        className="rounded"
                        alt={e.name}
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div className="card-body">
                      <h6 className="card-title text-white text-wrap lh-base text-truncate" style={{ height: "50px" }}>{e.name}</h6>
                    </div>
                      <div className="card-body">
                        {/* {e.discount >0 ?
                        <p className="card-text text-white h6 product-price text-decoration-line-through opacity-50 m-0">{convertPrice(e.price)}</p>
                        : <p className="card-text text-white h6 product-price text-decoration-line-through opacity-0 m-0">0</p>
                        }
                        <p className="card-text h5 text-white product-price">{convertPrice(e.totalPrice)}</p> */}
                        {e.discount>0 ?
                          <div className="my-1">
                            <p className="m-0">
                              <span className="text-white h6 text-decoration-line-through opacity-75">{convertPrice(e.price)}</span>
                              <span className="text-warning h6 text-decoration-line-through ms-1">Antes</span>
                            </p>
                            <p className="text-white h5 fw-bold">{convertPrice(e.totalPrice)} <span className="text-warning h5">Hoy</span></p>
                          </div>
                        :
                          <div className="my-1">
                            <p className="m-0">
                              <span className="text-white h5 text-decoration-line-through opacity-0">{convertPrice(e.price)}</span>
                            </p>
                            <p className="text-white h5 fw-bold">{convertPrice(e.totalPrice)}</p>
                          </div>
                        }
                      </div>
                    <div className="card-body px-0 down" >
                      <Link to={`/product/${e.id}`}>  
                        <a
                          href="#"
                          className="btn ms-3"
                          style={{
                            height: "fit-content",
                            backgroundColor: "black",
                            color: "white",
                          }}
                          >
                          Ver producto
                        </a>
                      </Link>
                      <i
                        className="bi bi-cart-check h2 m-0 text-white float-end pe-3 cursor"
                        title="Agregar al carrito"
                        onClick={() => add({userId: currentUser.id, productId: e.id}) }>
                      </i>
                    </div>
                  </div>
                );
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