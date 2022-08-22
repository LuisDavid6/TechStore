import Footer from "../Footer";
import NavBar from "../NavBar";
import Carousel from "./Carousel";
import ProductsList from "./ProductsList";


export default function Home(){

    return(
        <div>
            <NavBar/>
            <Carousel/>
            <ProductsList/>
            <Footer/>
        </div>
        
    )
}