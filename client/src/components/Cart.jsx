import { Component } from "react"
import { connect } from "react-redux"
import s from "./Styles/Cart.module.css"
import {GrAddCircle, GrSubtractCircle} from "react-icons/gr"
import {RiDeleteBinLine} from "react-icons/ri"
import {deleteFromCart} from "../redux/actions"
// import NavBar from "./NavBar"

export class Cart extends Component{

    render(){
        return(
            <div>
                {/* <NavBar/> */}
                <div className={s.main}>
                    {this.props.cart.length > 0 ? this.props.cart.map(e =>{
                        return(
                            <div key={e.id} className={s.product}>
                                <img src={e.image} alt={e.name}></img>
                                <h4>{`${e.console} ${e.name}`}</h4>
                                <h4>Precio ${e.price}</h4>
                                <h4>Cantidad: <GrSubtractCircle size={20} title={"Quitar"}/> 1 <GrAddCircle size={20} title={"Agregar"}/></h4>
                                <h4>Total: ${e.price}</h4>
                                <button className={s.delete} onClick={()=> this.props.deleteFromCart(e.id)}><RiDeleteBinLine size={30} title={"Eliminar"}/></button>
                            </div>
                        )
                    }) : <h4>No hay productos</h4>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        cart: state.cart
    }
}

export default connect(mapStateToProps, {deleteFromCart})(Cart)