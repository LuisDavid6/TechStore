import { useParams } from "react-router-dom";
import Filters from "./Filters";
import Products from "./Products";

export default function HomeProducts(){
  
  const {category} = useParams()

  return(
    <div className="position-relative my-1">
      <div className="row">
        <div className="col-2 bg-global me-3 pb-5 pt-3">
          <Filters/>
        </div>
        <div className="col bg-black ms-3 rounded-5 py-3">
          <Products category={category}/>
        </div>
      </div>  
    </div>
      
  )
}