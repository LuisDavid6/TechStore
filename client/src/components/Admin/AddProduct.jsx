import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { createProduct, filterByCategory } from '../../redux/actions'

const defaultState = {
  name: '',
  value: '',
}

const Specs = ({ onChange, onRemove, name, value }) => {
  return (
    <div className='d-flex flex-direction-col gap-2 my-2'>
      <input className='form-control' type='text' placeholder='Nombre' value={name} onChange={(e) => onChange('name', e.target.value)}></input>
      <input className='form-control' type='text' placeholder='Valor' value={value} onChange={(e) => onChange('value', e.target.value)}></input>
      <button className='btn btn-danger rounded-circle ' onClick={onRemove}>
        X
      </button>
    </div>
  )
}

export default function AddProduct() {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.categories)
  const categorySelect = useSelector((state) => state.categorySelect)
  const [image, setImage] = useState('')

  const [specs, setSpecs] = useState([defaultState])

  const successNotify = () => {
    toast.success('Producto agregado exitosamente', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      theme: 'dark',
    })
  }

  const uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()

    data.append('file', files[0])
    data.append('upload_preset', 'ophfn9bj')
    // setLoading(true);
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dnc21abpp/image/upload', { method: 'POST', body: data })
      const file = await res.json()
      setImage(file.secure_url)
    } catch (error) {
      // console.log(error)
    }
  }
  // useEffect(()=>{
  //   console.log("HE")
  // },[refresh])

  const handleOnChange = (index, name, value) => {
    const copySpecs = [...specs]
    copySpecs[index] = {
      ...copySpecs[index],
      [name]: value,
    }
    setSpecs(copySpecs)
  }

  const handleOnAdd = () => {
    setSpecs(specs.concat(defaultState))
  }

  const handleOnRemove = (index) => {
    const copySpecs = [...specs]
    copySpecs.splice(index, 1)
    setSpecs(copySpecs)
  }

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          price: '',
          discount: 0,
          stock: 0,
          category: '',
          type: '',
          image: '',
          description: '',
        }}
        validate={(values) => {
          let errors = {}
          if (!values.name) {
            errors.name = 'Debes ingresar un nombre'
          }

          if (!values.price) {
            errors.price = 'Debes ingresar un precio'
          } else if (!/^\d+$/.test(values.price)) errors.price = 'Solo se permiten números'

          if (!/^\d+$/.test(values.discount)) {
            errors.discount = 'Solo se permiten números'
          } else if (Number(values.discount) > 100 || (values.discount.toString().length > 1 && values.discount.toString()[0] === '0'))
            errors.discount = 'El valor debe estar entre 0-100'

          if (!/^\d+$/.test(values.stock)) {
            errors.stock = 'Solo se permiten números'
          } else if (values.stock.toString().length > 1 && values.stock.toString()[0] === '0') errors.stock = 'El valor debe ser mayor a 0'

          if (!values.category) errors.category = 'Debes seleccionar categoria'

          if (!values.type) errors.type = 'Debes seleccionar subcategoria'

          if (!values.description) errors.description = 'Debes ingresar la descripción'

          return errors
        }}
        onSubmit={(values, { resetForm }) => {
          values.price = Number(values.price)
          values.discount = Number(values.discount)
          values.stock = Number(values.stock)
          values.image = image
          values.specs = specs
          dispatch(createProduct(values))
          resetForm()
          setSpecs([defaultState])
          setImage('')
          successNotify()
        }}
      >
        {({ values, errors }) => (
          <Form className='container-sm my-0 bg-black p-4 text-start' style={{ maxWidth: '450px', borderRadius: '25px', border: ' solid 6px grey' }}>
            <div className='w-100 d-flex mx-auto'>
              <div className='form-floating my-2 w-75 me-1'>
                <Field type='text' name='name' className='form-control' id='nameValue' placeholder='nombre' />
                <label for='nameValue' className='text-secondary'>
                  Nombre del producto
                </label>
                <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='name' component='div' />
              </div>
              <div className='form-floating my-2 w-25 ms-1'>
                <Field type='text' name='stock' className='form-control' id='stockValue' placeholder='stock' />
                <label for='stockValue' className='text-secondary'>
                  Stock
                </label>
                <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='stock' component='div' />
              </div>
            </div>
            <div className='w-100 d-flex mx-auto'>
              <div className='form-floating mt-3 w-50 me-1'>
                <Field type='text' name='price' className='form-control' id='priceValue' placeholder='price' />
                <label for='priceValue' className='text-secondary'>
                  Precio
                </label>
                <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='price' component='div' />
              </div>
              <div className='form-floating mt-3 w-50 ms-1'>
                <Field type='text' name='discount' className='form-control' id='discountValue' placeholder='descuento' />
                <label for='discountValue' className='text-secondary'>
                  Descuento
                </label>
                <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='discount' component='div' />
              </div>
            </div>
            <div className='w-100 d-flex mx-auto'>
              <div className='form-floating mb-2 w-50 me-1'>
                <label htmlFor='category' className='text-secondary my-2'>
                  Categoria
                </label>
                <br />
                <select
                  id='category'
                  className='form-select pb-2'
                  name='category'
                  onChange={(e) => {
                    values.category = e.target.value
                    dispatch(filterByCategory(e.target.value))
                  }}
                >
                  <option value='' className='outline-secondary'>
                    --------
                  </option>
                  {categories &&
                    categories.map((e) => {
                      return (
                        <option value={e.name} className='outline-secondary' key={e.name}>
                          {e.name}
                        </option>
                      )
                    })}
                </select>
                <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='category' component='div' />
              </div>
              <div className='form-floating mb-2 w-50 ms-1'>
                <label htmlFor='type' className='text-secondary my-2'>
                  SubCategoria
                </label>
                <br />
                <select id='type' className='form-select pb-2' name='type' onChange={(e) => (values.type = e.target.value)}>
                  <option value='' className='outline-secondary'>
                    --------
                  </option>
                  {categorySelect.subCategories &&
                    categorySelect.subCategories.map((e) => {
                      return (
                        <option value={e.name} className='outline-secondary' key={e.name}>
                          {e.name}
                        </option>
                      )
                    })}
                </select>
                <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='type' component='div' />
              </div>
            </div>
            <div className='form-floating w-100 my-3 mx-auto'>
              <Field
                as='textarea'
                name='description'
                className='form-control'
                id='descriptionValue'
                placeholder='descripción'
                style={{ minHeight: '120px' }}
              />
              <label for='descriptionValue' className='text-secondary'>
                Descripción
              </label>
              <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='description' component='div' />
            </div>
            <label className='mt-3 text-white h5'>Caracteristicas:</label>
            <div className='mb-5 text-center'>
              {specs.map((specs, index) => (
                <Specs {...specs} onChange={(name, value) => handleOnChange(index, name, value)} onRemove={() => handleOnRemove(index)} key={index} />
              ))}
              <button className='btn btn-secondary' type='button' onClick={handleOnAdd}>
                +
              </button>
            </div>
            <div>
              <h6 className='text-white fs-6 mb-3 fst-italic text-wrap'>Selecciona imagen ó</h6>
              <Field className='form-control form-control-sm' id='Poster' type='file' name='file' onChange={(e) => uploadImage(e)} />
              {/* {!image && 
                  <span className='text-danger fs-6 fst-italic text-wrap'>Selecciona imagen</span>
                } */}
              <div>
                <h6 className='text-white fs-6 mt-4 mb-3 fst-italic text-wrap'>Ingresa link de la imagen</h6>
                <input className='form-control' value={image} type='text' onChange={(e) => setImage(e.target.value)}></input>
              </div>
              {/* {(values.Poster = image)} */}
              <div className='container-fix mx-auto my-3'>
                <img src={image} className='' width='120px' alt='' />
              </div>
            </div>

            <div className='d-flex a1lign-items-center'>
              <button type='submit' className='btn btn-secondary my-3 p-2 mx-auto align-self-center w-50' style={{ maxWidth: '230px' }}>
                Guardar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
