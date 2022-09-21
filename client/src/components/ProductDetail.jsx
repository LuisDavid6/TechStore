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
      <div className="row mx-5 mt-2">
        <div className="col bg-global me-1 rounded-0 p-4">
          <div className="row">
            <div className="col-4"></div>
            <div className="col"></div>
            <div className="col-6">
              {product && <img src={product.image} className="img-fluid"></img>}

            </div>
            <div className="col"></div>
          </div>
        </div>

        <div className="col bg-global ms-0 rounded-0 d-flex flex-column justify-content-around">
            {/* <div className="px-3 d-flex justify-content-end">
              <span className="text-white h4 fw-bold bg-warning px-3 py-2">-{product.discount}%</span>
            </div> */}
            <h4 className="text-white mt-3">{product.name}</h4>
            {product.discount>1 ?
             <div>
                <div className="d-flex justify-content-end">
                  <span className="text-white h4 fw-bold bg-warning px-3 py-2">-{product.discount}%</span>
                </div> 
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
        </div>
      </div>

      <div className="bg-global mt-1 mx-5 rounded-0 p-5 mb-2">
        <h3 className="dropdown-toggle mb-0 w-25 text-white text-start" data-bs-toggle="collapse" data-bs-target="#collapseEspec" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Descripción
        </h3>
        <div className="collapse" id="collapseEspec">
          <div className="card card-body mb-5 bg-global text-white border-0">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <h3 className="dropdown-toggle my-5 w-25 text-white text-start" data-bs-toggle="collapse" data-bs-target="#collapseDesc" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Comentarios
        </h3>
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