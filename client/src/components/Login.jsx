import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
// import NavBar from "./NavBar";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const errorNotify = () =>{
    toast.error('Datos incorrectos', {
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
      {/* <NavBar /> */}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          let errors = {};

          if (!values.email) errors.email = "Debes ingresar un email";

          if (!values.password) errors.password = "La contraseña no puede estar vacia";

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          // const email = users.find((e) => e.email === values.email);
          // if (!email) {
          //   resetForm();
          //   dispatch(createUser(values));
          //   registerNotify();
          //   setTimeout(() => {
          //     history("/login", { replace: true });
          //   }, 1000);
          // } else errorNotify();
          // try {
          //   const { data } = await axios.post('/auth/login',
          //   {
          //       email: values.email,
          //       password: values.password
          //   }
          // )}

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
                className="form-control fs-5"
                id="emailValue"
                placeholder="email"
                style={{ maxWidth: "360px"}}
              />
              <label for="emailValue" className="text-secondary text-start">
                Usuario
              </label>
              {/* <ErrorMessage
                className="text-danger fs-6 fst-italic text-wrap"
                name="email"
                component="div"
              /> */}
            </div>
            <div className="form-floating my-3 w-75">
              <Field
                type="password"
                name="password"
                className="form-control fs-5"
                id="passwordValue"
                placeholder="contraseña"
                style={{ maxWidth: "360px"}}
              />
              <label for="passwordValue" className="text-secondary">
                Contraseña
              </label>
              {/* <ErrorMessage
                className="text-danger fs-6 fst-italic text-wrap"
                name="password"
                component="div"
              /> */}
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
                name="email"
                component="div"
              />

            <a className=" nav-link mt-2 mb-3 text-light" href='/register'>¿Aún no tienes una cuenta? <span className="text-warning"> Registrate</span></a>
          </Form>
        )}
      </Formik>
    </div>
  );
}
