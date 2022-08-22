import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from "../Login"
import Register from "../Register"
import Products from './Products'
import Users from './Users'
export default function Menu() {

	const [component, setComponent] = useState("Products")

	const handleComponent = () =>{
		if(component === "Login") return <Login/>
		if(component === "Register") return <Register/>
		if(component === "Products") return <Products/>
		if(component === "Users") return <Users/>
	}

  return (
    <div className="pt-0">
			<nav className="bg-global">
				<div className="nav nav-tabs border-0 bg-global">
					<Link to="/home" className="navbar-brand px-4 py-3 mx-0 text-white">TECHSTORE</Link>
					<button className="nav-link active rounded-0 text-white btn-outline-secondary" data-bs-toggle="tab" onClick={() => setComponent("Products")}>Productos</button>
					<button className="nav-link rounded-0 text-white btn-outline-secondary" data-bs-toggle="tab" onClick={() => setComponent("Users")}>Usuarios</button>
					<button className="nav-link rounded-0 text-white btn-outline-secondary" data-bs-toggle="tab" onClick={() => setComponent("Login")}>Balance De Ventas</button>
					<button className="nav-link rounded-0 text-white btn-outline-secondary" data-bs-toggle="tab" onClick={() => setComponent("Register")}>Otra opción</button>
					<button className="nav-link rounded-0 text-white btn-outline-secondary" data-bs-toggle="tab" >Y otra más</button>
				</div>
			</nav>
			<div className=''>
				{handleComponent()}
			</div>
    </div>
  )
}

