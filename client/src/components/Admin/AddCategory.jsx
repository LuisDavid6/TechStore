import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCategory, addSubCategory } from "../../redux/actions"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCategory(){


	const dispatch = useDispatch()
	const categories = useSelector(state => state.categories)
	const [category, setCategory] = useState("")
	const [subcategory, setSubcategory] = useState({
		name: "",
		categoryId : ""
	})

	const submitCategory = (e) =>{
		e.preventDefault()
		if(category){
			dispatch(addCategory({name:category}))
			setCategory("")
			successNotify()
		}
		else errorNotify()
	}

	const submitSubCategory = (e) =>{
		e.preventDefault()
		if(subcategory.name && subcategory.categoryId){
			dispatch(addSubCategory(subcategory))
			setSubcategory({...subcategory, name:""})
			successNotify()
		}
		else errorNotify()
	}

	const successNotify = () =>{
    toast.success('Se agregó Exitosamente', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      theme:"dark",
    });
  } 

  const errorNotify = () =>{
    toast.error('Un error ha ocurrido', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      theme:"dark",
    });
  }

  return(
		<div>
			<button className="btn btn-sm btn-outline-secondary text-white p-2 m-1" data-bs-toggle="modal" data-bs-target="#CategoryModal">Agregar Categoria</button>
			<button className="btn btn-sm btn-outline-secondary text-white p-2 m-1" data-bs-toggle="modal" data-bs-target="#SubcategoryModal">Agregar Subcategoria</button>
	
			<div className="modal fade" id="CategoryModal" tabindex="-1" aria-labelledby="CategoryModalLabel" aria-hidden="true">
  			<div className="modal-dialog modal-dialog-centered">
    			<div className="modal-content bg-global">
							<form onSubmit={ e=> submitCategory(e)}>
								<div className="modal-header">
									<h5 className="modal-title" id="CategoryModalLabel">Nueva Categoria</h5>
									<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div className="modal-body text-start">
										<label htmlFor="nameCategory">Nombre</label>
										<input type="text" id="nameCategory" value={category} className="form-control mb-2 w-75" onChange={e=> setCategory(e.target.value)}/>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
									<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
								</div>
							</form>
					</div>
				</div>
			</div>

			<div className="modal fade" id="SubcategoryModal" tabindex="-1" aria-labelledby="SubcategoryModalLabel" aria-hidden="true">
  			<div className="modal-dialog modal-dialog-centered">
    			<div className="modal-content bg-global">
						<form onSubmit={ e=> submitSubCategory(e)}>
							<div className="modal-header">
								<h5 className="modal-title" id="SubcategoryModalLabel">Nueva SubCategoria</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body text-start">
									<label htmlFor="nameSubCategory">Nombre</label>
									<input type="text" id="nameSubCategory" value={subcategory.name} className="form-control mb-2 w-75" onChange={e => setSubcategory({...subcategory, name: e.target.value})}/>
									<label htmlFor="category">Seleccione la Categoria</label><br/>
									<select id="category" className="form-select w-50 p-2" onChange={e => setSubcategory({...subcategory, categoryId: e.target.value})}>
										<option selected disabled>---------</option>
										{categories && categories.map(e =>{
											return(
												<option value={e.id} className="outline-secondary">{e.name}</option>
											)
										})}
									</select>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Volver</button>
								<button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
  )
}