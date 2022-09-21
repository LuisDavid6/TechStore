import "../Styles/Styles.css"
import { useDispatch, useSelector } from "react-redux"
import { filterByPrice, filterBySubcategory } from "../../redux/actions"
import { useState } from "react"
import { useEffect } from "react"


export default function Filters(){

    const dispatch = useDispatch()
    const [subCateg, setSubCateg] = useState([])
    const categorySelect = useSelector(state => state.categorySelect)

    const handleFilter = (e) =>{
      const value = e.target.value
      dispatch(filterByPrice(value))
    }

    const handleSubCategory = (category) =>{
      const categ = subCateg.find(e=> e === category)
      if(categ){
        setSubCateg(subCateg.filter(e=> e!==category))
        dispatch(filterBySubcategory(category, false))
      }else {
        setSubCateg([...subCateg, category])
        dispatch(filterBySubcategory(category, true))
      }
    } 

    useEffect(()=>{
        setSubCateg([])      
    },[categorySelect])

    return(
      <div>
        <div className="mx-0" style={{display: "flex", justifyContent: "center",}}>
          <div className="form-floating my-4">
            <select className="form-select border-dark border-2 bg-black text-white" id="floatingSelect" aria-label="Floating label select example" onChange={handleFilter}>
              <option value=""selected >Relevantes</option>
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
          <div className="btn-group-vertical" role="group" aria-label="Basic checkbox toggle vertical button group">
          { categorySelect.subCategories && categorySelect.subCategories.map(e=>{
            return(
                <button className={`btn btn-outline-secondary text-white rounded-4 my-1 ${subCateg.includes(e.name) ? "active" : null} `} key={e.name} onClick={()=> handleSubCategory(e.name)}>{e.name}</button>
                )
              })}
          </div>
        </div>
      </div>
    )
}