import { useParams } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../NavBar";
import Filters from "./Filters";
import Products from "./Products";

export default function HomeProducts(){
  
  const {category} = useParams()

  return(
    <div className="position-relative">
      <NavBar/>
      <div className="row my-1 mx-0">
        <div className="col-md-3 bg-global me-0 pb-5 pt-3">
          <Filters/>
        </div>
        <div className="col bg-black rounded-5 py-3">
          <Products category={category}/>
        </div>
      </div>
      <Footer/>
    </div>
      
  )
}