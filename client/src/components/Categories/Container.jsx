import { useParams } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar";
import Filters from "./Filters";
import Products from "./Products";

export default function HomeProducts(){
  
  const {category} = useParams()

  return(
    <div className="position-relative mb-1">
      <NavBar/>
      <div className="row my-1 mx-0">
        <div className="col-2 bg-global me-3 pb-5 pt-3">
          <Filters/>
        </div>
        <div className="col bg-black ms-3 rounded-5 py-3">
          <Products category={category}/>
        </div>
      </div>
      <Footer/>
    </div>
      
  )
}