import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUsers } from '../redux/actions';
// import NavBar from "./NavBar"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Register(){

  const dispatch = useDispatch()
  const history = useNavigate()
  const users = useSelector(state=> state.users)
  const refresh = useSelector(state=> state.refresh)

  const registerNotify = () =>{
    toast.success('Registro Exitoso', {
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
    toast.error('Email ya existe', {
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
      {/* <NavBar/> */}
      <Formik 
        initialValues = {{
          userName: '',
          email: '',
          password: '',
          passwordConfirm: '',
        }}

        validate = {values=>{
          let errors = {};
          if (!values.userName) {
            errors.userName = "Debes ingresar un nombre de usuario";
          }
          
          if (!values.email) {
            errors.email = "Debes ingresar un email";
            
          } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = "Formato de email no válido"

          if (!values.password) {
            errors.password = "La contraseña no puede estar vacia";

          } else if (values.password.length<8) errors.password = "La contraseña debe tener al menos 8 caracteres"
          
          if (!values.passwordConfirm) {
            errors.passwordConfirm = "Debes confirmar la contraseña";

          } else if(values.passwordConfirm !== values.password) errors.passwordConfirm = "Las contraseñas no coinciden"

          return errors
        }}
          
        onSubmit ={ (values, {resetForm}) => {
          const email = users.find(e=> e.email === values.email)
          if(!email){
            resetForm()
            dispatch(createUser(values))
            registerNotify()
            setTimeout(()=>{
              history("/login", { replace: true })
            },1000)
          }
          else errorNotify()
        }}
      >
        {({values, errors}) => (

          <Form className="container-sm my-5 d-flex flex-column align-items-center bg-black p-4" style={{maxWidth:"450px",borderRadius:"25px", border:" solid 6px grey"}}>
          <h3 className='text-white my-2'>Regístrate</h3>
            <div className='form-floating my-3 d-flex flex-column align-items-center'>
              <Field type="text" name="userName" className="form-control" id="userValue" placeholder="usuario" style={{maxWidth:"360px"}}/>
              <label for="userValue" className='text-secondary'>Nombre de usuario</label>
              <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='userName' component="div"/>
            </div>
            <div className='form-floating my-3'>
              <Field type="text" name="email" className="form-control" id="emailValue" placeholder="email" style={{maxWidth:"360px"}}/>
              <label for="emailValue" className='text-secondary'>Email</label>
              <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='email' component="div"/>
            </div>
            <div className='form-floating my-3'>
              <Field type="password" name="password"className="form-control" id="passwordValue" placeholder="contraseña" style={{maxWidth:"360px"}}/>
              <label for="passwordValue" className='text-secondary'>Contraseña</label>
              <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='password' component="div"/>
            </div>
            <div className='form-floating my-3'>
              <Field type="password" name="passwordConfirm" className="form-control" id="confirmValue" placeholder="Confirma tu contraseña" style={{maxWidth:"360px"}}/>
              <label for="confirmValue" className='text-secondary'>Confirma tu contraseña</label>
              <ErrorMessage className='text-danger fs-6 fst-italic text-wrap' name='passwordConfirm' component="div"/>
            </div>
            <button type="submit" className='btn btn-secondary my-3 p-2' style={{maxWidth:"230px"}}>Registrarme</button>
          </Form>         
        )}
      </Formik>
    </div>
  )
}