import "./Styles/Styles.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductDetail } from "../redux/actions"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { convertPrice } from "./Categories/Products"


export default function Details(){

  const {id} = useParams()
  const dispatch = useDispatch()
  const product = useSelector(state => state.productDetail)

  useEffect(()=>{
      dispatch(getProductDetail(id))
      window.scrollTo({ top: 0, behavior: 'smooth' })
  },[])

  return(
    <div >
      <NavBar/>
      <div className="row mx-5 mt-2 gap-2">
        <div className="col bg-global rounded-0 p-4">
              {product && <img src={product.image} className="img-fluid" style={{minWidth:"200px"}}></img>}
        </div>

        <div className="col bg-global ms-0 rounded-0 d-flex flex-column justify-content-around">
            {product.discount>1 && 
              <div className="d-flex justify-content-end">
                <span className="text-white h2 fw-bold bg-warning p-3 py-2">-{product.discount}%</span>
             </div>
            }
            <h2 className="text-white mt-0">{product.name}</h2>
            {product.discount>1 ?
             <div>
                <p className="m-0">
                    <span className="text-white h5 text-decoration-line-through opacity-75">{convertPrice(product.price)}</span>
                    <span className="text-warning h6 text-decoration-line-through ms-1">Antes</span>
                </p>
                <p className="text-white h3 fw-bold">{convertPrice(product.totalPrice)} <span className="text-warning h5">Hoy</span></p>
             </div>
             :
             <div>
                <p className="m-0">
                    <span className="text-white h5 text-decoration-line-through opacity-0">{convertPrice(product.price)}</span>
                </p>
                <p className="text-white h3 fw-bold">{convertPrice(product.totalPrice)}</p>
             </div>
            }
            <button className="btn btn-success mx-auto py-2 px-5">Agregar al carrito</button>
        </div>
      </div>

      <div className="bg-global mt-1 mx-5 rounded-0 p-5 mb-2">
        <h3 className="dropdown-toggle mb-0 w-25 text-white text-start" data-bs-toggle="collapse" data-bs-target="#collapseEspec" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Especificaciones
        </h3>
        <div className="collapse" id="collapseEspec">
          <div className="card card-body p-0 mt-3 mb-5 bg-global text-white border-0">
            <div className="pt-3 table-responsive">
              <table className="table table-bordered" style={{maxWidth:"500px"}}>
                <tbody>
                  {product.specs && product.specs.length>0 && product.specs.map(e=>{
                    return(
                      <tr className="text-white text-start h6 ">
                        <td>
                          <span className="">{Object.keys(e)}:</span>
                        </td>
                        <td>
                          <span className="">{Object.values(e)}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>  
          </div>
        </div>

        <h3 className="dropdown-toggle my-5 w-25 text-white text-start" data-bs-toggle="collapse" data-bs-target="#collapseDesc" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Descripción
        </h3>
        <div className="collapse" id="collapseDesc">
          <div className="card card-body bg-global text-white border-0 p-0">
            <h4>{product.description}</h4>
          </div>
        </div>
        <h3 className="dropdown-toggle my-5 w-25 text-white text-start" data-bs-toggle="collapse" data-bs-target="#collapseCom" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Opiniones
        </h3>
        <div className="collapse" id="collapseCom">
          <div className="card card-body bg-global text-white text-start border-0 p-0">
            <h6 className="px-5">@Vane - muy buen producto</h6>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
    )
}