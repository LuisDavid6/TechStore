import './Styles/Styles.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCart, getProductDetail } from '../redux/actions'
import NavBar from './NavBar'
import Footer from './Footer'
import { convertPrice } from './Categories/Products'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Details() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector((state) => state.productDetail)
  const currentUser = useSelector((state) => state.currentUser)
  const role = useSelector((state) => state.role)

  const add = (data) => {
    if (role === 'user' || role === 'admin') {
      dispatch(addToCart(data))
      notifyAddToCart()
    } else errorNotify()
  }

  const notifyAddToCart = () => {
    toast.success('Articulo agregado al carrito', {
      position: 'bottom-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      theme: 'dark',
    })
  }

  const errorNotify = () => {
    toast.error('Debes iniciar sesión primero', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      theme: 'dark',
    })
  }

  useEffect(() => {
    dispatch(getProductDetail(id))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div>
      <NavBar />
      <div className='row mx-0 mt-2 gap-2'>
        <div className='col bg-global rounded-0 p-4'>
          {product && <img src={product.image} alt={product.name} className='img-fluid' style={{ minWidth: '200px', maxWidth: '300px' }}></img>}
        </div>

        <div className='col bg-global ms-0 rounded-0 d-flex flex-column justify-content-around'>
          {product.discount > 1 && (
            <div className='d-flex justify-content-end'>
              <span className='text-white h2 fw-bold bg-warning p-3 py-2'>-{product.discount}%</span>
            </div>
          )}
          <h2 className='text-white my-4'>{product.name}</h2>
          {product.discount > 1 ? (
            <div className='my-4'>
              <p className='m-0'>
                <span className='text-white h5 text-decoration-line-through opacity-75'>{convertPrice(product.price)}</span>
                <span className='text-warning h6 text-decoration-line-through ms-1'>Antes</span>
              </p>
              <p className='text-white h3 fw-bold'>
                {convertPrice(product.totalPrice)} <span className='text-warning h5'>Hoy</span>
              </p>
            </div>
          ) : (
            <div className='my-4'>
              <p className='m-0'>
                <span className='text-white h5 text-decoration-line-through opacity-0'>{convertPrice(product.price)}</span>
              </p>
              <p className='text-white h3 fw-bold'>{convertPrice(product.totalPrice)}</p>
            </div>
          )}
          <button className='btn btn-success mx-auto py-2 px-5 my-3' onClick={() => add({ userId: currentUser.id, productId: product.id })}>
            Agregar al carrito
          </button>
        </div>
      </div>

      <div className='bg-global mt-1 mx-0 rounded-0 p-5 mb-2'>
        <h3
          className='dropdown-toggle mb-0 w-25 text-white text-start'
          data-bs-toggle='collapse'
          data-bs-target='#collapseEspec'
          aria-expanded='false'
          aria-controls='collapseExample'
          style={{ cursor: 'pointer' }}
        >
          Especificaciones
        </h3>
        <div className='collapse' id='collapseEspec'>
          <div className='card card-body p-0 mt-3 mb-5 bg-global text-white border-0'>
            <div className='pt-3 table-responsive'>
              <table className='table table-bordered' style={{ maxWidth: '500px' }}>
                <thead style={{ display: 'none' }}></thead>
                <tbody>
                  {product.specs &&
                    product.specs.length > 0 &&
                    product.specs.map((e) => {
                      return (
                        <tr className='text-white text-start h6 '>
                          <td>
                            <span>{e.name}</span>
                          </td>
                          <td>
                            <span>{e.value}</span>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h3
          className='dropdown-toggle my-5 w-25 text-white text-start'
          data-bs-toggle='collapse'
          data-bs-target='#collapseDesc'
          aria-expanded='false'
          aria-controls='collapseExample'
          style={{ cursor: 'pointer' }}
        >
          Descripción
        </h3>
        <div className='collapse' id='collapseDesc'>
          <div className='card card-body bg-global text-white border-0 p-0'>
            <h6>{product.description}</h6>
          </div>
        </div>
        <h3
          className='dropdown-toggle my-5 w-25 text-white text-start'
          data-bs-toggle='collapse'
          data-bs-target='#collapseCom'
          aria-expanded='false'
          aria-controls='collapseExample'
          style={{ cursor: 'pointer' }}
        >
          Opiniones
        </h3>
        <div className='collapse' id='collapseCom'>
          <div className='card card-body bg-global text-white text-start border-0 p-0'>
            <h6 className='px-3'>@Vane - muy buen producto</h6>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
