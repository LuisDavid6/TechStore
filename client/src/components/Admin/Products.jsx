import "../Styles/Styles.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByCategory, filterCategoryByPage, getCategories, getProductsByPage } from "../../redux/actions"
import { useState } from "react"
import ProductCard from "./ProductCard"
import AddCategory from "./AddCategory"
import AddProduct from "./AddProduct"


export default function Products(){
    
  const dispatch = useDispatch()
  const categories = useSelector((state)=> state.categories)

  const refresh = useSelector(state => state.refresh)

  const [search, setSearch] = useState()
  const [filterCategory, setFilterCategory] = useState()

  const handleSearch = (e)=>{
    e.preventDefault()
  }

  const handleCategory = (name)=>{
    dispatch(filterByCategory(name))
    dispatch(filterCategoryByPage("1",name))
    setFilterCategory(name)
  }
  
  useEffect(()=>{
    dispatch(getProductsByPage("1"))
    dispatch(getCategories())
  },[refresh])

  return (
    <div className="text-center">
      <div className="row mx-0">
        <div className="col-md-3 mt-2 py-4 text-white bg-global">
          <div className="">
            <AddCategory/>
          </div>
          <div className="pt-5">
            <h6> Filtrar por categoria</h6>
            <div className="btn-group-vertical pt-4" role="group" aria-label="Vertical radio toggle button group">
              {categories && categories.map(e =>{
                return(
                  <>
                    <input type="radio" className="btn-check" name="btnradio" id={e.name} autoComplete="off"/>
                    <label className="btn btn-outline-secondary text-white rounded-2" for={e.name} onClick={()=>handleCategory(e.name)}>{e.name}</label>
                  </>
                )
              })}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="mx-auto pt-3 pb-5 text-end d-flex justify-content-end pe-1">
            {/* <form className="d-flex mx-2">
                <div className="input-group flex-nowrap mx-auto" style={{maxWidth:"250px"}}>
                    <input type="text" className="form-control" placeholder="Buscar..." aria-label="buscar" aria-describedby="addon-wrapping" onChange={e=> setSearch(e.target.value)}/>
                    <button className="input-group-text btn-outline-light bg-dark" type="submit" id="addon-wrapping" onClick={handleSearch}>
                      <i className="bi bi-search text-white"></i>
                    </button>
                </div>
            </form> */}
            <button className="btn btn-outline-secondary text-white py-2" data-bs-toggle="modal" data-bs-target="#newProductModal">Agregar Producto</button>
            <div className="modal fade" id="newProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content bg-global">
                  <div className="modal-header text-white">
                    <h5 className="modal-title" id="staticBackdropLabel">Nuevo Producto</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <AddProduct/>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <ProductCard filter={filterCategory}/>
          </div>
        </div>
      </div>
    </div>
  )
}