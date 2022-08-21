import "./Styles/Styles.css"
import { useDispatch, useSelector } from "react-redux"
import { FilterByPrice, FilterBySubcategory } from "../redux/actions"
import { useState } from "react"
import { useEffect } from "react"


export default function Filters(){

    const dispatch = useDispatch()
    const [subCateg, setSubCateg] = useState([])
    const handleFilter = (e) =>{
      const value = e.target.value
      dispatch(FilterByPrice(value))
    }

    const handleSubCategory = (category) =>{
      const categ = subCateg.find(e=> e === category)
      if(categ){
        setSubCateg(subCateg.filter(e=> e!==category))
        dispatch(FilterBySubcategory(category, false))
      }else {
        setSubCateg([...subCateg, category])
        dispatch(FilterBySubcategory(category, true))
      }
    } 

    const categorySelect = useSelector(state => state.categorySelect)
    // const refresh = useSelector(state => state.refresh)

    // useEffect(()=>{
    //   console.log("HOLA")
    // },[refresh])

    return(
      <div>

{/* <div class="row">
  <div class="col-3">
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
      <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
      <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
      <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
    </div>
  </div>
  <div class="col-9">
    <div class="tab-content" id="v-pills-tabContent">
      <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
      <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
      <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
      <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
    </div>
  </div>
</div> */}

















        
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
          <div className="btn-group-vertical" role="group" aria-label="Basic checkbox toggle vertical button group">
          { categorySelect.subCategories && categorySelect.subCategories.map(e=>{
            return(
              <>
                <input type="checkbox" className="btn-check" id={e.name}/>
                <label className="btn btn-outline-secondary text-white rounded-4" for={e.name} onClick={()=> handleSubCategory(e.name)}>{e.name}</label>
              </>
                )
              })}
          </div>
        </div>
      </div>
    )
}