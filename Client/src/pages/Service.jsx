import { useAuth } from "../store/Auth"

export const Service = () => {

  const {services}=useAuth()
  
if (!services) {
  return <p>Loading...</p>; // or handle the loading state appropriately
}

  return (
    <>
    <div className="section-services">
    <div className="container">
      <h1 className="main-heading">Services</h1>
    </div>
    <div className="container grid grid-three-cols">
    {
      services.map((curElem,index)=>{
      const {price,description,service,provider}=curElem
      return(
      <div className="card" key={index}>
      <div className="card-img">
        <img src="/public/images/design.png" alt="service image is no provide" width="100" />
      </div>
      <div className="card-detail">
        <div className="grid grid-two-cols">
          <p>{provider}</p>
          <p>{price}</p>
        </div>
        <p>{service}</p>
        <p>{description}</p>
      </div>
      </div>
    )})
    }
      
    </div>
    </div>
    
    </>
  )
}

// export default Service;
