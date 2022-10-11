import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Home from './components/Home/Home';
import Categories from './components/Categories/Container';
import Offers from './components/Offers/Container';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';
import Menu from './components/Admin/Menu';
import Profile from './components/Profile';
import Search from './components/Search';

const stripePromise = loadStripe("pk_test_51LfFezGdVap7KN5XWRFm01jJvbHJ7qlI6OiXYsKXPN8LI4Y8p3UcPCFIIjaiQMDAu7EPQD4P3cLOBj1epwJzGkvf00WRO5HhUS")

function App() {

  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <ToastContainer />
        {/* <NavBar /> */}
        <Routes>
          <Route exact path="/" element={<Redirect to="/home" />}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/products/:category' element={<Categories/>}/>
          <Route exact path='/offers' element={<Offers/>}/>
          <Route exact path='/shoppingCart' element={<Cart/>}/>
          <Route path='/product/:id' element={<ProductDetail/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/admin' element={<Menu/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/search/:query' element={<Search/>} />
        </Routes>
        {/* <Footer/> */}
      </Elements>
    </div>
  );
}

export default App;
