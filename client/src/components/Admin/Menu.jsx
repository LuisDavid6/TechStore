import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { verifyRole } from '../../redux/actions'
import Login from "../Login"
import Register from "../Register"
import Products from './Products'
import Users from './Users'
export default function Menu() {

	const [component, setComponent] = useState("Products")
	const role = useSelector(state => state.role)
	const dispatch = useDispatch()

	const handleComponent = () =>{
		if(component === "Login") return <Login/>
		if(component === "Register") return <Register/>
		if(component === "Products") return <Products/>
		if(component === "Users") return <Users/>
	}

	useEffect(()=>{
		dispatch(verifyRole())
	})

  return (
	<div>
		{role === "admin" ?
    	<div className="pt-0">
				<nav className="bg-global navbar navbar-dark sticky-top navbar-expand-sm">
					<Link to="/home" className="navbar-brand px-4 py-3 mx-0 text-white">TECHSTORE</Link>
					<button className="navbar-toggler mx-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="offcanvas offcanvas-end bg-global w-50" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
						<div className="offcanvas-header text-white">
							<h5 className="offcanvas-title" id="offcanvasNavbarLabel">TechStore</h5>
							<button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
						</div>
						<div className="nav nav-tabs border-0 bg-global navbar-collapse d-flex flex-column align-items-start">
							<div className="offcanvas-body">
								<button className="nav-link active rounded-0 text-white btn-outline-secondary" data-bs-toggle="tab" onClick={() => setComponent("Products")}>Productos</button>
								<button className="nav-link rounded-0 text-white btn-outline-secondary" data-bs-toggle="tab" onClick={() => setComponent("Register")}>Ofertas</button>
								<button className="nav-link rounded-0 text-white btn-outline-secondary" data-bs-toggle="tab" onClick={() => setComponent("Login")}>Balance De Ventas</button>
								<button className="nav-link rounded-0 text-white btn-outline-secondary" data-bs-toggle="tab" onClick={() => setComponent("Users")}>Usuarios</button>
							</div>
						</div>
					</div>
				</nav>
				<div className=''>
					{handleComponent()}
				</div>
    	</div>
		:null
		}
	</div>

  )
}

