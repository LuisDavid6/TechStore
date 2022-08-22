import "../Styles/Styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts, addToCart, filterByCategory } from "../../redux/actions";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products({ category }) {
  const convertPrice = (price) => {
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
    return result;
  };

  const dispatch = useDispatch();

  const products = useSelector((state) => state.productsFilter);
  const categorySelect = useSelector(state => state.categorySelect)

  const refresh = useSelector((state) => state.refresh);

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
  };

  useEffect(() => {
    dispatch(filterByCategory(category))
  }, []);

  return (
    <div>
      <div className="product-list">
        {products &&
          products.map((e) => {
            return (
              <div key={e.id} className="card rounded">
                <div className="card-body p-0 h-100">
                  <img
                    src={e.image}
                    className="rounded"
                    alt={e.name}
                    width="100%"
                    height="100%"
                    // style={{ height: "240px" }}
                  />
                </div>
                <div className="card-body ">
                  <h6 className="card-title text-wrap lh-base text-truncate" style={{ height: "50px" }}>{e.name}</h6>
                </div>
                  <div className="card-body">
                    <p className="card-text h6 product-price text-decoration-line-through fw-normal opacity-50 m-0">${convertPrice(e.totalPrice)}</p>
                    <p className="card-text h5 product-price">${convertPrice(e.price)}</p>
                  </div>
                <div className="card-body px-0" >
                  <Link to={`/product/${e.id}`}>  
                    <a
                      href="#"
                      className="btn"
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
                    className="bi bi-cart-check h2 m-0 text-black float-end pe-1"
                    style={{ cursor: "pointer" }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Agregar al carrito"
                    onClick={() => {
                      dispatch(addToCart(e));
                      notifyAddToCart();
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
