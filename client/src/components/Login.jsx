import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from 'react';
import { login, verifyRole } from '../redux/actions';

export default function Login() {

  const history =  useNavigate()
  const dispatch = useDispatch()

  const errorNotify = () =>{
    toast.error('Usuario o Contraseña incorrectos', {
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


  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          let errors = "";

          if (!values.email) errors = "Debes ingresar un email";

          if (!values.password) errors = "La contraseña no puede estar vacia";

          return errors;
        }}
        onSubmit={ async(values, { resetForm }) => {
          if(values.email && values.password){
            try {
              const resp = await dispatch(login(values));
              const role = await dispatch(verifyRole());
              if(resp.token){  
                setTimeout(() => {
                  history("/home", { replace: true });
                }, 500);
              }
              else errorNotify()
            } catch (error) {
              throw Error
            }


          } else {errorNotify(); console.log("BAD")}

        }}
      >
        {({ values, errors }) => (
          <Form
            className="container-sm my-5 d-flex flex-column align-items-center bg-black p-5"
            style={{
              maxWidth: "450px",
              borderRadius: "25px",
              border: " solid 6px grey",
            }}
          >
            <h3 className="text-white my-2">Iniciar Sesión</h3>
            <div className="form-floating my-3 w-75">
              <Field
                type="text"
                name="email"
                className="form-control fs-6"
                id="emailValue"
                placeholder="email"
                style={{ maxWidth: "360px"}}
              />
              <label for="emailValue" className="text-secondary text-start">
                Usuario
              </label>
            </div>
            <div className="form-floating my-3 w-75">
              <Field
                type="password"
                name="password"
                className="form-control fs-6"
                id="passwordValue"
                placeholder="contraseña"
                style={{ maxWidth: "360px"}}
              />
              <label for="passwordValue" className="text-secondary text-start">
                Contraseña
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-secondary my-3 w-100 p-3 fs-5"
              style={{ maxWidth: "230px"}}
            >
              Iniciar Sesión
            </button>
            <ErrorMessage
                className="text-danger fs-6 fst-italic text-wrap"
                name="value"
                component="div"
              />

            <a className=" nav-link mt-2 mb-3 text-light" href='/register'>¿Aún no tienes una cuenta? <span className="text-warning"> Registrate</span></a>
          </Form>
        )}
      </Formik>
    </div>
  );
}
