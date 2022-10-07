import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getCategories } from "../../redux/actions"
import "../Styles/Styles.css"

export default function(){

  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCategories())
  },[])

  return(
    <div className="mx-0 mb-4">
      {categories.length>0 ? categories.slice(0,4).map(e =>{
        return(
          <div className="card bg-global mx- mt-3 rounded-4" key={e.name}>
            <div className="card-header text-white">
              <Link to={`/products/${e.name}`} className="text-decoration-none text-white"><h5>{e.name}</h5></Link>
            </div>
            <div className="card-body row mx-0">
              {e.products && e.products.slice(0,4).map(p=>{
                return(
                  <div className="col py-3" key={p.name}>
                    <Link to={`/product/${p.id}`}><img src={p.image} alt={p.name} className=" img-fluid rounded-2" style={{MaxWidth:"100%",height:"auto"}}/></Link>
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