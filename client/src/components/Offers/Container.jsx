import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByPage } from '../../redux/actions'
import Footer from '../Footer'
import NavBar from '../NavBar'
import { Link } from 'react-router-dom'

export default function Container() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.productsByPage)

  const [page, setPage] = useState('1')
  let pages = []

  if (products.cant) {
    let cant = Math.ceil(products.cant / 8)
    for (let i = 1; i <= cant; i++) {
      pages.push(i + '')
    }
  }

  useEffect(() => {
    dispatch(getProductsByPage('1', true))
  }, [])

  return (
    <div>
      <NavBar />
      <div style={{ minHeight: '56vh' }}>
        {products.products && products.products.length > 0 ? (
          <div className='product-list-offers'>
            {products.products.map((e) => {
              return (
                e.imageOffer && (
                  <div key={e.id} className='card rounded bg-global border border-primary'>
                    <div className='card-body p-0 h-100'>
                      <Link to={`/product/${e.id}`}>
                        <img src={e.imageOffer} className='rounded' alt={e.name} width='100%' height='100%' />
                      </Link>
                    </div>
                  </div>
                )
              )
            })}
          </div>
        ) : (
          <div className='text-center' style={{ minHeight: '65vh' }}>
            <div className='spinner-border text-primary mt-5' role='status' style={{ width: '6rem', height: '6rem' }}>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        )}
      </div>
      <div className='d-flex justify-content-center gap-3 mt-3 mb-4'>
        {pages.length > 1 &&
          pages.map((e) => {
            return (
              <button
                className={page === e ? 'btn btn-secondary' : 'btn btn-dark'}
                onClick={() => {
                  dispatch(getProductsByPage(e, true))
                  setPage(e)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                {e}
              </button>
            )
          })}
      </div>
      <Footer />
    </div>
  )
}
