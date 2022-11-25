import "../Styles/Styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToCart, filterByCategory } from "../../redux/actions";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const convertPrice = (price) => {
  const priceLong = "" + price;
  let punt = 0;
  let result = "";
  for (let i = priceLong.length - 1; i >= 0; i--) {
    result = priceLong[i] + result;
    punt++;
    if (punt === 3 && i !== 0) {
      result = "." + result;
      punt = 0;
    }
  }
  return "$"+result;
};

export default function Products({ category }) {
  

  const dispatch = useDispatch();

  const products = useSelector((state) => state.productsFilter);
  const categorySelect = useSelector(state => state.categorySelect)
  const currentUser = useSelector(state => state.currentUser)
  const role = useSelector(state => state.role)
  const refresh = useSelector((state) => state.refresh);

  const [page,setPage] = useState(1)
	let pages = []
  
	if(products){
	  let cant = Math.ceil((products.length)/8)
	  for(let i=1; i<=cant;i++){
		pages.push(i)
	  }
	}

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

  useEffect(() => {
    dispatch(filterByCategory(category))
  }, []); 

  useEffect(() => {
    setPage(1)
  }, [refresh]); 

  return (
    <div>
      {products.length>0 ?
        <div className="product-list">
          {products.slice((page*8)-8,page*8).map((e) => {
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
                    } */}
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
                    {/* <p className="card-text h5 text-white product-price">{convertPrice(e.totalPrice)}</p> */}
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
                    onClick={() => add({userId: currentUser.id, productId: e.id})}>
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

      <div className="d-flex justify-content-center gap-3 mt-3 mb-4">
        {pages.length>1 && pages.map(e=>{
          return(
            <button className={page===e ? "btn btn-secondary" : "btn btn-dark"} onClick={()=>{setPage(e); window.scrollTo({ top: 0, behavior: 'smooth' })}}>{e}</button>
          )
        })}
      </div>
    </div>
  );
}
