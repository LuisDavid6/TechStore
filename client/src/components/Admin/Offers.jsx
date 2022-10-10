import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../redux/actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Offers = () =>{

	const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const [idProduct, setIdProduct] = useState('')
	const products = useSelector(state => state.products)

	const save = () =>{

		if(image && idProduct){
			dispatch(updateProduct({imageOffer:image},idProduct))
			setImage("")
			setIdProduct("")
			successNotify()
		}
	}

	const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    data.append('file', files[0]);
    data.append('upload_preset', 'ophfn9bj');
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dnc21abpp/image/upload", { method: "POST", body: data })
      const file = await res.json();
      setImage(file.secure_url);
      
    } catch (error) {
      // console.log(error)
    }
  }

	const successNotify = () =>{
    toast.success('Agregado exitosamente', {
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
			<div className="mt-5 d-flex flex-column gap-4 align-items-center">
				<div className="d-flex mx-auto">
					<div className='form-floating mb-2 w-50 mx-auto'>
						<label htmlFor="category" className="text-secondary my-2">Producto</label><br/>
							<select id="category" className="form-select pb-2" name='category' onChange={e => setIdProduct(e.target.value)}>
								<option value="" className="outline-secondary">--------</option>
								{products && products.map(e=>{
									return <option value={e.id} className="outline-secondary" key={e.id}>{e.name}</option>
								})}
							</select>
					</div>
				</div>

				<div>
          <h6 className='text-white fs-6 mb-3 fst-italic text-wrap'>Selecciona imagen</h6>
					<input className="form-control" type="file" onChange={(e) => uploadImage(e)}></input>
				</div>

				<div className=" w-25">
				<h6 className='text-white fs-6 mb-3 fst-italic text-wrap'>Ingresa link de la imagen</h6>
					<input className="form-control" value={image} type="text" onChange={e=>setImage(e.target.value)}></input>
				</div>

				<div className="container-fix mx-auto my-3">
					<img src={image} className="" width="120px"/>
				</div>

				<button type="submit" className='btn btn-secondary p-2 mx-auto align-self-center w-50' style={{maxWidth:"130px"}} onClick={save}>Guardar</button>

          
			</div>
	)
}


export default Offers