import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Home from './components/Home';
import HomeProducts from './components/HomeProducts';
import ProductDetail from './components/ProductDetail';
import Register from './components/Register';
import Login from './components/Login';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';

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
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Redirect to="/home" />}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/ofertas' element={<HomeProducts/>}/>
        <Route exact path='/shoppingCart' element={<Cart/>}/>
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
