import Filters from "./Filters";
// import NavBar from "./NavBar";
import Products from "./Products";

export default function Home(){

    return(
        <div>
            {/* <NavBar/> */}
            <Filters/>
            <Products/>
        </div>
        
    )
}