import Filters from "./Filters";
// import Footer from "./Footer";
// import NavBar from "./NavBar";
import Products from "./Products";

export default function HomeProducts(){

  return(
    <div class="position-relative">
      {/* <NavBar/> */}
      <div className="row mx-5">
        <div className="col-2 bg-black me-3 rounded-5 pb-5 pt-3" style={{height:"max-content", minHeight:"500px"}}>
          <Filters/>
        </div>
        <div className="col bg-black ms-3 rounded-5 py-3">
          <Products/>
        </div>
      </div>
      {/* <div class="position-relative"> */}
        {/* <div className="position-absolute bottom-0 start-0"> */}
          {/* <Footer/> */}
        {/* </div> */}
      {/* </div> */}     
    </div>
      
  )
}