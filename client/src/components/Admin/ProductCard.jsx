import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, filterCategoryByPage, getProductsByPage } from "../../redux/actions"
import ModifyProduct from "./ModifyProduct"

export default function ProductCard({filter}){
  
  const dispatch = useDispatch()
  const [page,setPage] = useState("1")
  const products = useSelector((state)=> state.productsByPage)
  const refresh = useSelector((state)=> state.refresh)
  const categoryProductsByPage = useSelector((state)=> state.categoryProductsByPage)
  let list = []
  let pages = []

  if(products.cant){
    let cant = Math.ceil(products.cant/8)
    for(let i=1; i<=cant;i++){
      pages.push(i+"")
    }
  }

  if(filter && categoryProductsByPage.cant){
    pages=[]
    let cant = Math.ceil(categoryProductsByPage.cant/8)
    for(let i=1; i<=cant;i++){
      pages.push(i+"")
    }
  }

  filter ? list = categoryProductsByPage.products : list = products.products

  return(
    <> 
    {list && list.length>0 ?
      <div>
        <div className="product-list-admin">
          {list.map(e =>{
            return( 
              <div className="card bg-global mb-2 w-100" key={e.name}>
                <div className="card-body row">
                  <div className="col-2 text-start">
                    <img src={e.image} width="100" height="100"></img>
                  </div>
                  <div className="col my-auto ps-5">
                    <span className="text-white">{e.name}</span>
                  </div>
                  <div className="col-1 my-auto">
                    <i className="bi bi-pencil-fill h5 text-white cursor" title="Modificar" data-bs-toggle="modal" data-bs-target={"#m"+e.id.slice(0,3)}></i>
                    <div className="modal fade" id={"m"+e.id.slice(0,3)} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                      <div className="modal-dialog">
                      <div className="modal-content bg-global">
                        <div className="modal-header text-white">
                          <h5 className="modal-title" id="staticBackdropLabel">Modificar Producto</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <ModifyProduct data={e}/>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  </div>
                  <div className="col-1 my-auto">
                    <i className="bi bi-trash3-fill h5 text-white cursor" title="Eliminar" data-bs-toggle="modal" data-bs-target={"#p"+e.id.slice(0,3)}></i>
                  </div>
                  <div className="modal fade" id={"p"+e.id.slice(0,3)} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content bg-global">
                        <div className="modal-header">
                          <h5 className="modal-title text-white" id="deleteModalLabel">¿Esta seguro de eliminar el producto?</h5>
                          <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                          <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>dispatch(deleteProduct(e.id))}>Confirmar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            )
          })}      
        </div>
        <div className="d-flex justify-content-center gap-3 mt-3 mb-4">
        {pages.length>1 && pages.map(e=>{
          return(
            <button className={page===e ? "btn btn-secondary" : "btn btn-dark"} 
              onClick={()=>{ filter ? dispatch(filterCategoryByPage(e,filter)) : dispatch(getProductsByPage(e)) ;setPage(e)}}>
              {e}
            </button>
            )
          })}
        </div>
      </div>
    :
      <div className="text-center">
        <div className="spinner-border text-primary mt-5" role="status" style={{width: "6rem", height: "6rem"}}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }
    </>
  )
}


