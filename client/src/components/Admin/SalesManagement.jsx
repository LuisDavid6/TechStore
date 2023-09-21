import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSalesAdmin, getSalesByWeek } from '../../redux/actions'
import SalesBar from './SalesBar'
import SalesByCategory from './SalesByCategory'

const SalesManagement = () => {
  const dispatch = useDispatch()
  const sales = useSelector((state) => state.salesAdmin)
  const salesByWeek = useSelector((state) => state.salesByWeek)
  const [date, setDate] = useState('')
  const [month, setMonth] = useState('')
  const [search, setSearch] = useState('')

  const formatMonth = (n) => {
    const months = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec',
    }
    return months[n]
  }

  const handleOnDate = (e) => {
    const day = e.slice(8, 10)
    const month = formatMonth(e.slice(5, 7))
    const year = e.slice(0, 4)
    setSearch(day + ' ' + month + ' ' + year)
    setDate(e)
    setMonth('')
  }

  const handleOnMonth = (e) => {
    const year = e.slice(0, 4)
    const month = formatMonth(e.slice(5, 7))
    setSearch(month + ' ' + year)
    setMonth(e)
    setDate('')
  }

  useEffect(() => {
    dispatch(getSalesAdmin(search || '21 Nov'))
    dispatch(getSalesByWeek())
  }, [search])

  return (
    <div className='row mx-2 mt-2 gap-2'>
      <div className='col-sm-4 card text-center bg-global mx-auto my-2'>
        <div className='card-header text-white'>
          <h4>Ventas por categoria</h4>
        </div>
        <div className='card-body d-flex justify-content-center'>
          <input
            type={'date'}
            value={date}
            className='form-control me-2'
            onChange={(e) => handleOnDate(e.target.value)}
            style={{ maxWidth: '130px' }}
          ></input>
          <input
            type={'month'}
            value={month}
            className='form-control'
            onChange={(e) => handleOnMonth(e.target.value)}
            style={{ maxWidth: '185px' }}
          ></input>
        </div>
        {sales.length && sales[0].length > 0 ? (
          <div className='card-body'>
            <SalesByCategory sales={sales} />
          </div>
        ) : (
          <div className='card-body h-100'>
            <h4 className='text-white mt-5'>No se encontraron datos</h4>
          </div>
        )}
        <div className='card-footer text-muted'>Top más vendidas</div>
      </div>

      <div className='col card text-center bg-global mx-auto my-2'>
        <div className='card-header text-white'>
          <h4>Ventas de la Semana</h4>
        </div>
        <div className='card-body'>
          <SalesBar sales={salesByWeek} />
        </div>
        <div className='card-footer text-muted'>Total de ventas de los ultimos dias</div>
      </div>
    </div>
  )
}

export default SalesManagement
