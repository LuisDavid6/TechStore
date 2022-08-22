
export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel" >
        <div className="carousel-indicators m-0">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1" className="active rounded-circle" style={{width:"12px", height:"12px"}} ></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" className="rounded-circle" style={{width:"12px", height:"12px"}} ></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" className="rounded-circle" style={{width:"12px", height:"12px"}} ></button>
        </div>
        <div className="carousel-inner" >
          <div className="carousel-item active" data-bs-interval="">
            <img src="https://i.ytimg.com/vi/48s-C1oSj9k/maxresdefault.jpg" className="img-fluid mx-auto d-block w-100" alt="..." style={{maxHeight:"400px"}}/>
          </div>
          <div className="carousel-item" >
            <img src="https://www.elpais.com.co/files/article_main/uploads/2021/10/07/615f6a4a6b182.jpeg" className="img-fluid mx-auto d-block w-100" alt="..." style={{maxHeight:"400px"}}/>
          </div>
          <div className="carousel-item" >
            <img src="https://pbs.twimg.com/media/C56xfZhWcAANTlo.jpg" className="img-fluid mx-auto d-block w-100" alt="..." style={{maxHeight:"400px"}}/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}
