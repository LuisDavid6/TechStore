import "./Styles/Styles.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProductDetail } from "../redux/actions"
// import NavBar from "./NavBar"


export default function Details(){

  const {id} = useParams()
  const dispatch = useDispatch()
  const product = useSelector(state => state.productDetail)

  useEffect(()=>{
      dispatch(getProductDetail(id))
  },[])

  return(
    <div>
      {/* <NavBar/> */}
      <div className="row mx-5">
        <div className="col-7 bg-black me-2 rounded-4 p-4">
          <div className="row">
            <div className="col-4"></div>
            <div className="col"></div>
            <div className="col-6">
              {product && <img src={product.image} width="max-content" height="350px"></img>}

            </div>
            <div className="col"></div>
          </div>
        </div>

        <div className="col bg-black ms-2 rounded-4">

        </div>
      </div>

      <div className="bg-black mt-3 mx-5 rounded-4 p-5">
        <h3 className="dropdown-toggle mb-3 w-25 text-white text-start" data-bs-toggle="collapse" data-bs-target="#collapseEspec" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Especificaciones
        </h3>
        <div className="collapse" id="collapseEspec">
          <div className="card card-body mb-5">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <h3 className="dropdown-toggle my-5 w-25 text-white text-start" data-bs-toggle="collapse" data-bs-target="#collapseDesc" aria-expanded="false" aria-controls="collapseExample" style={{cursor:"pointer"}}>
          Descripción
        </h3>
        <div className="collapse" id="collapseDesc">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

      </div>
    </div>
    )
}