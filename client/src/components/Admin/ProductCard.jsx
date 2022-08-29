import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "../../redux/actions"

export default function ProductCard({filter}){
  
  const dispatch = useDispatch()
  const products = useSelector((state)=> state.products)
  const categoryProductsAdmin = useSelector((state)=> state.categoryProductsAdmin)
  let list = []
        
  filter ? list = categoryProductsAdmin : list = products


  return(
    <> 
      {list && list.map(e =>{
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
                <i className="bi bi-pencil-fill h5 text-white cursor" title="Modificar"></i>
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
    </>
  )
}