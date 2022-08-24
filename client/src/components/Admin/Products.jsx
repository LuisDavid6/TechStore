import "../Styles/Styles.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterByCategory, getCategories, getProducts } from "../../redux/actions"
import { useState } from "react"
import ProductCard from "./ProductCard"


export default function Products(){
    
  const dispatch = useDispatch()
  const categories = useSelector((state)=> state.categories)
  const refresh = useSelector(state => state.refresh)

  const [search, setSearch] = useState()
  const [filterCategory, setFilterCategory] = useState(false)

  const handleSearch = (e)=>{
    e.preventDefault()
  }

  const handleCategory = (name)=>{
    dispatch(filterByCategory(name))
    setFilterCategory(true)
  }
  
  useEffect(()=>{
    dispatch(getProducts())
    dispatch(getCategories())
  },[refresh])

  return (
    <div className="">
      <div className="row mx-0">
        <div className="col-2 mt-2 py-4 ps-5 text-start text-white bg-global">
          <h6> Filtrar por categoria</h6>
          <div class="btn-group-vertical pt-4" role="group" aria-label="Vertical radio toggle button group">
            {categories && categories.map(e =>{
              return(
                <>
                  <input type="radio" class="btn-check" name="btnradio" id={e.name} autocomplete="off"/>
                  <label class="btn btn-outline-secondary text-white rounded-2" for={e.name} onClick={()=>handleCategory(e.name)}>{e.name}</label>
                </>
              )
            })}
          </div>
        </div>
        <div className="col">
          <div className="mx-auto pt-3 pb-5 text-end d-flex justify-content-end pe-1">
            <form className="d-flex mx-2">
                <div className="input-group flex-nowrap mx-auto" style={{maxWidth:"250px"}}>
                    <input type="text" className="form-control" placeholder="Buscar..." aria-label="buscar" aria-describedby="addon-wrapping" onChange={e=> setSearch(e.target.value)}/>
                    <button className="input-group-text btn-outline-light bg-dark" type="submit" id="addon-wrapping" onClick={handleSearch}>
                      <i className="bi bi-search text-white"></i>
                    </button>
                </div>
            </form> 
            <button className="btn btn-outline-secondary text-white py-2">Agregar Producto</button>
          </div>
          <div className="product-list-admin">
            <ProductCard filter={filterCategory}/>
          </div>
        </div>
      </div>
    </div>
  )
}