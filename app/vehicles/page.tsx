import axios from "axios"

const page = () => {


   const createVehicle = async () => {
      await axios.post('http://localhost:3000/api/vehicles', {
         VIN:"VIN123",
         Make:"Volkwagen",
         Model:"Polo",
         Year : "2023"
      }).catch((err) => {
         console.log(err);
      })
   }

   createVehicle();

  return (
    <div>
      <button>Add Vehicle</button>
      <div>
         <form action=""></form>
      </div>
      <div>
         Table
      </div>
    </div>
  )
}

export default page