import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, getCategories, logout, verifyRole } from "../redux/actions";
import "./Styles/Styles.css"
import { useEffect } from "react";
import { useState } from "react";

export default function NavBar() {
  const categories = useSelector(state => state.categories)
  const role = useSelector(state => state.role)
  const currentUser = useSelector(state => state.currentUser)
  const refresh = useSelector(state => state.refresh)
  const dispatch = useDispatch();

  const cantProductsCart = currentUser.cart && currentUser.cart.products.reduce((acum,e)=> acum+=e.cant,0)

  const [search, setSearch] = useState("")

  const handleCategory = (category) => {
    dispatch(filterByCategory(category));
  };

  const handleSearch = (e) =>{
    e.preventDefault()
    alert(search)
  }

  useEffect(()=>{
    dispatch(getCategories())
    dispatch(verifyRole())
  },[refresh])

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-global px-3 h5 m-0">
      <div className="container-fluid py-2">
      <Link className="navbar-brand me-5" to="/">
          TECHSTORE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="text-decoration-none"><a className="nav-link mx-3 active" aria-current="page" href="#">Inicio</a></Link>
            </li>
            <li className="nav-item">
              <Link to="/offers" className="text-decoration-none"><a className="nav-link mx-3 active" aria-current="page" href="#">Ofertas</a></Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle mx-3 active"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >Categorias</a>
              <ul className="dropdown-menu bg-dark p-0 mx-auto" aria-labelledby="navbarDropdown" style={{maxWidth:"200px"}}>
                <div className="list-group">
                  {categories && categories.map(e=>{
                    return (
                      <Link to={`/products/${e.name}`} className="text-decoration-none" key={e.id}> <li className="list-group-item list-group-item-action list-group-item-dark select-console" onClick={() => handleCategory(e.name)}>{e.name}</li></Link>
                      )
                  })}
                </div>
              </ul>
            </li>
          </ul>          
          <form className="d-flex mx-5">
            <div className="input-group flex-nowrap mx-auto" style={{maxWidth:"250px"}}>
                <input type="text" className="form-control" placeholder="Buscar..." aria-label="buscar" aria-describedby="addon-wrapping" onChange={e=> setSearch(e.target.value)}/>
                <button className="input-group-text btn-outline-light bg-dark" type="submit" id="addon-wrapping" onClick={handleSearch}>
                  <i className="bi bi-search text-white"></i>
                </button>
            </div>
          </form> 
          <Link to="/shoppingCart">
            <i className="bi bi-cart-check h2 mb-0 mx-3 position-relative text-white" >
              <span className={currentUser.cart && currentUser.cart.products.length>0 ? "position-absolute top-0 p-2 start-100  translate-middle badge rounded-pill bg-danger" : ""} style={{fontSize:"12px"}}>
                {currentUser.cart && currentUser.cart.products.length>0 && cantProductsCart}

              </span>
            </i>
          </Link>        
          <div className="dropdown">
            <i className="bi bi-person-circle h2 mb-0 mx-3 text-white" data-bs-toggle="dropdown" aria-expanded="false" style={{cursor:"pointer"}}></i>
            <ul className="dropdown-menu dropdown-menu-end bg-dark p-0 mt-2" aria-labelledby="navbarDropdown">
              {role ==="admin" ?
                <div className="list-group">
                  <Link to="/admin" className="text-decoration-none"><li className="list-group-item list-group-item-action list-group-item-dark select-console">Panel de Admin</li></Link>
                  <Link to="/" className="text-decoration-none"><li className="list-group-item list-group-item-action list-group-item-dark select-console" onClick={logout()}>Cerrar Sesión</li></Link>
                </div>
              : role === "user" ?
                <div className="list-group">
                  <li className="list-group-item list-group-item-action list-group-item-dark select-console">Perfil</li>
                  <Link to="/" className="text-decoration-none"><li className="list-group-item list-group-item-action list-group-item-dark select-console" onClick={logout()}>Cerrar Sesión</li></Link>
                </div>
              : 
                <div className="list-group">
                  <Link to="/login" className="text-decoration-none"><li className="list-group-item list-group-item-action list-group-item-dark select-console">Iniciar Sesión</li></Link>
                  <Link to="/register" className="text-decoration-none"><li className="list-group-item list-group-item-action list-group-item-dark select-console">Registrarme</li></Link>
                </div>
              }
            </ul>
          </div>      
        </div>
      </div>
    </nav>
  );
}
