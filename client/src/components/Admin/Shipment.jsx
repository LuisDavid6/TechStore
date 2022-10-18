const Shipment = () =>{
    return(
        <div style={{maxWidth:"220px"}}>
            <input type={"date"} className="form-control" onChange={e=>console.log(e.target.value)}></input>
        </div>
    )
}

export default Shipment