export default function Footer(){
  return(
    <div className="p-4 bg-global text-white">
      <div className="row">
        <div className="col text-start">
          <h6>Quienes somos</h6>
          <h6>Preguntas frecuentes</h6>
          <h6>Terminos y condiciones</h6>
        </div>
        <div className="col text-start">
          <h6>Medios de pago</h6>
          <h6>Sigue tu pedido</h6>
        </div>
        <div className="col">
          <h6>Siguenos en nuestras redes sociales</h6>
          <div className="container">
            <section className="mb-4">
              <a className="btn btn-outline-light btn-floating m-1" target="_blank" href="#" role="button">
                <i className="bi bi-facebook"></i>
              </a>
              <a className="btn btn-outline-light btn-floating m-1" target="_blank" href="#" role="button">
                <i className="bi bi-twitter"></i>
              </a>
              <a className="btn btn-outline-light btn-floating m-1" target="_blank" href="#" role="button">
                <i className="bi bi-instagram"></i>
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}