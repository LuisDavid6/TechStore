import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getCategories } from "../../redux/actions"
import "../Styles/Styles.css"

export default function(){

  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()
  let images = false

  if(window.screen.width<900) images =true

  useEffect(()=>{
    dispatch(getCategories())
    
  },[])

  return(
    <div className="mx-0 mb-4">
      {categories.length>0 ? categories.slice(0,4).map(e =>{
        {var cont =0}
        return(
          <div className="card bg-global mt-3 p-0" key={e.name}>
            <div className="card-header text-white">
              <Link to={`/products/${e.name}`} className="text-decoration-none text-white"><h5>{e.name}</h5></Link>
            </div>
            <div className="card-body mx-0 d-flex" style={{overflowX:"auto"}}>
              {e.products && e.products.map(p=>{
                return(
                    p.imageOffer && cont<3 &&
                    <div className="px-2" key={p.name}>
                      <Link to={`/product/${p.id}`}><img src={p.imageOffer} alt={p.name} className={images ? "rounded-2" : "img-fluid rounded-2"} style={images ? {width:"320px", height:"auto"}:null}/></Link> 
                      {cont++}
                    </div>
                )
              })}
            </div>
          </div>
        )
      })
    :
    <div className="text-center">
    <div className="spinner-border text-primary mt-5" role="status" style={{width: "6rem", height: "6rem"}}>
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
    }
    </div>
  )
}
