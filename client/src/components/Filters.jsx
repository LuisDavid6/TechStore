import "./Styles/Styles.css"
import { useDispatch, useSelector } from "react-redux"
import { FilterByPrice } from "../redux/actions"


export default function Filters(){

    const dispatch = useDispatch()

    const handleFilter = (e) =>{
      const value = e.target.value
      dispatch(FilterByPrice(value))
    }

    const categorySelect = useSelector(state => state.categorySelect)
    const filter = useSelector(state => state.filter)

    return(
      <div>
        <div className="mx-0" style={{display: "flex", justifyContent: "center",}}>
          <div className="form-floating my-4">
          <select className="form-select border-dark border-2 bg-black text-white" id="floatingSelect" aria-label="Floating label select example" onChange={handleFilter}>
            <option selected >Relevantes</option>
            <option value="asc" >Menor precio</option>
            <option value="desc">Mayor precio</option>            
          </select>
          <label className="text-white" for="floatingSelect">Ordenar por:</label>
          </div>
        </div>
        <br/>
        <h6 className="text-white">Filtra por categorias</h6>
        <br/>
        <div>
          <div class="btn-group-vertical" role="group" aria-label="Basic checkbox toggle vertical button group">
          { categorySelect.subCategories && categorySelect.subCategories.map(e=>{
            return(
              <>
                <input type="checkbox" class="btn-check" id={e.name} autocomplete="off"/>
                <label className="btn btn-outline-secondary text-white rounded-4" for={e.name}>{e.name}</label>
              </>
                )
              })}
          </div>
        </div>
      </div>
    )
}