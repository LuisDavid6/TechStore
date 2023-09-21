import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../../redux/actions'
import AddUser from './AddUser'
import UpdateUser from './UpdateUser'

export default function Users() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const handleCategory = (name) => {
    // dispatch(filterByCategory(name))
    // setFilterCategory(true)
  }

  let numUser = 0

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <div className='text-center'>
      <div className='row mx-0'>
        <div className='col-md-3 mt-2 py-4 text-white bg-global'>
          <h6> Filtrar por tipo</h6>
          <div className='btn-group-vertical pt-4' role='group' aria-label='Vertical radio toggle button group'>
            <input type='radio' className='btn-check' name='btnradio' id='all' autoComplete='off' />
            <label className='btn btn-outline-secondary text-white rounded-2' for='all' onClick={() => handleCategory()}>
              Todos
            </label>
            <input type='radio' className='btn-check' name='btnradio' id='user' autoComplete='off' />
            <label className='btn btn-outline-secondary text-white rounded-2' for='user' onClick={() => handleCategory()}>
              Usuarios
            </label>
            <input type='radio' className='btn-check' name='btnradio' id='admin' autoComplete='off' />
            <label className='btn btn-outline-secondary text-white rounded-2' for='admin' onClick={() => handleCategory()}>
              Administradores
            </label>
          </div>
        </div>
        <div className='col-md'>
          <div className='mx-auto pt-3 pb-5 text-end d-flex justify-content-end pe-1'>
            {/* <form className="d-flex mx-2">
              <div className="input-group flex-nowrap mx-auto" style={{maxWidth:"250px"}}>
                <input type="text" className="form-control" placeholder="Buscar..." aria-label="buscar" aria-describedby="addon-wrapping" onChange={e=> setSearch(e.target.value)}/>
                <button className="input-group-text btn-outline-light bg-dark" type="submit" id="addon-wrapping" onClick={handleSearch}>
                  <i className="bi bi-search text-white"></i>
                </button>
              </div>
          </form>  */}
            <button className='btn btn-outline-secondary text-white py-2' data-bs-toggle='modal' data-bs-target='#registerModal'>
              Agregar Usuario
            </button>
            <div
              className='modal fade'
              id='registerModal'
              data-bs-backdrop='static'
              data-bs-keyboard='false'
              tabIndex='-1'
              aria-labelledby='staticBackdropLabel'
              aria-hidden='true'
            >
              <div className='modal-dialog'>
                <div className='modal-content bg-global'>
                  <div className='modal-header text-white'>
                    <h5 className='modal-title' id='staticBackdropLabel'>
                      Nuevo Usuario
                    </h5>
                    <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                  </div>
                  <div className='modal-body'>
                    <AddUser />
                  </div>
                  <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-3 table-responsive'>
            <table className='table table-dark table-hover'>
              <thead>
                <tr className='text-white h5'>
                  <th scope='col'>#</th>
                  <th scope='col'>Usuario</th>
                  <th scope='col'>Email</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((e) => {
                    return (
                      <tr className={numUser % 2 !== 0 ? 'text-white' : 'text-white table-active'} key={e.id}>
                        <th scope='row'>{++numUser}</th>
                        <td>{e.userName}</td>
                        <td>{e.email}</td>
                        <td>
                          <i
                            className='bi bi-pencil-fill h5 text-white cursor'
                            title='Modificar'
                            data-bs-toggle='modal'
                            data-bs-target={'#e' + e.id.slice(0, 3)}
                          ></i>

                          <div
                            className='modal fade'
                            id={'e' + e.id.slice(0, 3)}
                            data-bs-backdrop='static'
                            data-bs-keyboard='false'
                            tabIndex='-1'
                            aria-labelledby='staticBackdropLabel'
                            aria-hidden='true'
                          >
                            <div className='modal-dialog'>
                              <div className='modal-content bg-global'>
                                <div className='modal-header text-white'>
                                  <h5 className='modal-title' id='staticBackdropLabel'>
                                    Actualizar Usuario
                                  </h5>
                                  <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                                </div>
                                <div className='modal-body'>
                                  <UpdateUser data={e} />
                                </div>
                                <div className='modal-footer'>
                                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                                    Volver
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <i
                            className='bi bi-trash3-fill h5 text-white cursor'
                            title='Eliminar'
                            data-bs-toggle='modal'
                            data-bs-target={'#u' + e.id.slice(0, 3)}
                          ></i>

                          <div className='modal fade' id={'u' + e.id.slice(0, 3)} tabIndex='-1' aria-labelledby='deleteModalLabel' aria-hidden='true'>
                            <div className='modal-dialog'>
                              <div className='modal-content bg-global'>
                                <div className='modal-header'>
                                  <h5 className='modal-title text-white' id='deleteModalLabel'>
                                    ¿Esta seguro de eliminar el usuario?
                                  </h5>
                                  <button type='button' className='btn-close text-white' data-bs-dismiss='modal' aria-label='Close'></button>
                                </div>
                                <div className='modal-footer'>
                                  <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                                    Cancelar
                                  </button>
                                  <button
                                    type='button'
                                    className='btn btn-primary'
                                    data-bs-dismiss='modal'
                                    onClick={() => dispatch(deleteUser(e.id))}
                                  >
                                    Confirmar
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
