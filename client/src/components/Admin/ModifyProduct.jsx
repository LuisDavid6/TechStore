import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { updateProduct } from '../../redux/actions';

export default function ModifyProduct({data}){

  const dispatch = useDispatch()
  const [image, setImage] = useState(data.image)
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
    toast.success('Producto actualizado exitosamente', {
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
      {data &&
      <Formik 
        initialValues = {{
          name: data.name,
          price: data.price,
          discount: data.discount,
          stock: data.stock,
          type: data.type,
          image: data.image,
          description: data.description,
        }}

        validate = {values=>{
          let errors = {};
          if (!values.name) {
            errors.name = "Debes ingresar un nombre";
          }
          
          if (!values.price) {
            errors.price = "Debes ingresar un precio";
            
          } else if(!/^\d+$/.test(values.price)) errors.price = "Solo se permiten números"

          if(!/^\d+$/.test(values.discount)) {
            errors.discount = "Solo se permiten números"

          } else if (Number(values.discount)>100 || (values.discount.toString().length>1 && values.discount.toString()[0]==="0")) errors.discount = "El valor debe estar entre 0-100"
          
          if(!/^\d+$/.test(values.stock)) {
            errors.stock = "Solo se permiten números"

          } else if (values.stock.toString().length>1 && values.stock.toString()[0]==="0") errors.stock = "El valor debe ser mayor a 0"

					if (!values.description) errors.description = "Debes ingresar la descripción";

          return errors
        }}
          
        onSubmit ={ (values, {resetForm}) => {
          values.price = Number(values.price)
          values.discount = Number(values.discount)
          values.stock = Number(values.stock)
          dispatch(updateProduct(values,data.id))
          resetForm()
          successNotify()
          
        }}
      >
        {({values, errors}) => (

          <Form className="container-sm my-0 bg-black p-4 text-start" style={{maxWidth:"450px",borderRadius:"25px", border:" solid 6px grey"}}>
            <div className="w-100 d-flex mx-auto">
              <div className='form-floating my-2 w-75 me-1'>
                <Field type="text" name="name" className="form-control" id="nameValue" placeholder="nombre"/>
                <label for="nameValue" className='text-secondary'>Nombre del producto</label>
                <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='name' component="div"/>
              </div>
              <div className='form-floating my-2 w-25 ms-1'>
                <Field type="text" name="stock" className="form-control" id="stockValue" placeholder="stock"/>
                <label for="stockValue" className='text-secondary'>Stock</label>
                <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='stock' component="div"/>
              </div>
            </div>
						<div className="w-100 d-flex mx-auto">
							<div className='form-floating mt-3 w-50 me-1'>
								<Field type="text" name="price" className="form-control" id="priceValue" placeholder="price"/>
								<label for="priceValue" className='text-secondary'>Precio</label>
								<ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='price' component="div"/>
							</div>
							<div className='form-floating mt-3 w-50 ms-1'>
								<Field type="text" name="discount"className="form-control" id="discountValue" placeholder="descuento"/>
								<label for="discountValue" className='text-secondary'>Descuento</label>
								<ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='discount' component="div"/>
							</div>
						</div>
            <div className='form-floating w-100 my-3 mx-auto'>
              <Field as="textarea" name="description"className="form-control" id="descriptionValue" placeholder="descripción" style={{minHeight:"120px"}}/>
              <label for="descriptionValue" className='text-secondary'>Descripción</label>
              <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='description' component="div"/>
						</div>
            <div className='form-floating w-100 my-4 mx-auto'>
						<div>
                <h6 className='text-white fs-6 mb-3 fst-italic text-wrap'>Selecciona imagen ó</h6>
                <Field
                  className="form-control form-control-sm"
                  id="Poster"
                  type="file"
                  name="file"
                  onChange={(e) => uploadImage(e)}
                />
                <div>
                  <h6 className='text-white fs-6 mt-4 mb-3 fst-italic text-wrap'>Ingresa link de la imagen</h6>
                  <input className="form-control" value={image} type="text" onChange={e=>setImage(e.target.value)}></input>
                </div>
                    <div className="container-fix mx-auto my-3"><img src={image} className="" width="120px"/></div>
            </div>
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className='btn btn-secondary my-3 p-2 mx-auto align-self-center w-50' style={{maxWidth:"230px"}} data-bs-dismiss="modal">Guardar</button>
            </div>
            
          </Form>         
        )}
      </Formik>
      }
    </div>
  )
}