import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateUser } from '../../redux/actions';
// import NavBar from "./NavBar"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function UpdateUser({data}){

  const dispatch = useDispatch()
  const users = useSelector(state=> state.users)
  const refresh = useSelector(state=> state.refresh)

  const registerNotify = () =>{
    toast.success('El usuario ha sido actualizado', {
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
    toast.error('El email ya se encuentra registrado', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      theme:"dark",
    });
  } 

  useEffect(()=>{
    dispatch(getUsers())
  },[refresh])
  
  return(
    <div>
      {data && 
        <Formik 
          initialValues = {{
          userName: data.userName,
          email: data.email,
          password: "",
          role: data.role
          }}
          key={data.id}

          validate = {values=>{
          let errors = {};
          if (!values.userName) {
            errors.userName = "Debes ingresar un nombre de usuario";
          }
            
          if (!values.email) {
            errors.email = "Debes ingresar un email";
              
          } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = "Formato de email no válido"

          if (values.password && values.password.length<3) errors.password = "La contraseña debe tener al menos 3 caracteres"
          
          return errors
          }}
          
          onSubmit ={ (values, {resetForm}) => {
          const emailCurrent = data.email
          const user = users.find(e=> e.email === values.email)
          if(!user || user.email === emailCurrent){
            if(values.password === ""){
              const {password, ...rest} = values
              values = rest
            }
            dispatch(updateUser(values, data.id))
            registerNotify()
            values.password=""
          }
          else errorNotify()
          }}
        >
          {({values, errors}) => (
            <Form className="container-sm my-0 bg-black p-4 text-start" style={{maxWidth:"450px",borderRadius:"25px", border:" solid 6px grey"}}>
              <div className='form-floating my-3 w-75 mx-auto'>
                <Field type="text" name="userName" className="form-control" placeholder="usuario" style={{maxWidth:"360px"}}/>
                <label className='text-secondary'>Nombre de usuario</label>
                <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='userName' component="div"/>
              </div>
              <div className='form-floating my-3 w-75 mx-auto'>
                <Field type="text" name="email" className="form-control" placeholder="email" style={{maxWidth:"380px"}}/>
                <label className='text-secondary'>Email</label>
                <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='email' component="div"/>
              </div>
              <div className='my-3 mx-auto'>
                <label htmlFor="password" className="text-white my-3 mx-5">Nueva contraseña (opcional)</label><br/>
                <div className='form-floating w-75 mx-auto'>
                  <Field type="password" name="password"className="form-control" placeholder="contraseña" style={{maxWidth:"360px"}}/>
                  <label className='text-secondary'>Contraseña</label>
                  <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='password' component="div"/>
                </div>
              </div>
              <div className='my-3 w-75 mx-auto'>
                <label htmlFor="role" className="text-white">Seleccione un rol:</label><br/>
                <select className="form-select w-50 p-2" name='role' onChange={e=> values.role = e.target.value}>
                  <option value={data.role === "user" ? "user": "admin"} className="outline-secondary">{data.role=== "user" ? "Usuario": "Admin"}</option>
                  <option value={data.role === "user" ? "admin": "user"} className="outline-secondary">{data.role=== "user" ? "Admin": "Usuario"}</option>
                </select> 
              </div>
              <div className="d-flex align-items-center">
                <button type="submit" className='btn btn-secondary my-3 p-2 mx-auto align-self-center w-50' style={{maxWidth:"230px"}}>Registrar</button>
              </div>    
            </Form>         
          )}
        </Formik>
      }
    </div>
  )
}