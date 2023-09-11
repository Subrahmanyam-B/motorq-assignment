"use client"
import { useVehicleModal } from "@/hooks/use-vehicle-modal";
import { useEffect, useState } from "react";
import axios from 'axios';
import { VehicleList } from "@/components/main/vehicle-list";

const VehiclesPage = () => {

  const [vehicleData , setVehicleData] = useState([]);


  const getVehicles = async () => {
    await axios.get("/api/vehicles").then((res) => {
      console.log(res)
      setVehicleData(res.data);
    }
    ).catch((err) => {
      console.log(err);
    })
  };

  const onOpen = useVehicleModal((state) => state.onOpen);
  const isOpen = useVehicleModal((state) => state.isOpen);

  useEffect(() => {
    getVehicles()
  }, []);

  function loadMoreCustomers(){
    
  }

  const disableLoadMore = true;

  function handleRowClick(){

  }
  function handleCustomerUpdate(){

  }

  useEffect(() => {
    // if (!isOpen) {
    //   onOpen();
    //   console.log("open");
    // }
    // getVehicles();
  }, [onOpen, isOpen]);

  return (
    <div>
      {/* <DialogForm title={"Add New Vehicle"} onClose={onClose} onSubmit={onSubmit}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          dolore vel animi quia praesentium commodi debitis eveniet itaque
          reprehenderit temporibus esse necessitatibus, eligendi dicta quisquam
          nesciunt ad fugiat officiis in.
        </p>
      </DialogForm> */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold py-5">Vehicles</h1>
        <button onClick={onOpen} className="bg-primary px-3 my-3 rounded-lg text-white font-semibold text-sm flex items-center justify-center">
          + Add Vehicle
        </button>
      </div>
      <div>
        <form action=""></form>
      </div>
      <div>
      <VehicleList data={vehicleData}
          loadMore={loadMoreCustomers}
          loadMoreDisable={disableLoadMore}
          handleRowClick={handleRowClick}
          updateData={handleCustomerUpdate}/>      </div>
    </div>
  );
};

export default VehiclesPage;
