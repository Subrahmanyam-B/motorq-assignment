"use client"
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";
import prismadb from "@/lib/prismadb";
import DialogForm from "@/components/dialog/DialogForm";
import Link from "next/link";
import axios from 'axios';
import { VehicleList } from "@/components/main/vehicle-list";

const VehiclesPage = () => {
  const getVehicles = async () => {
    await axios.get("/api/vehicles").then((res) => {
      console.log(res.data);
    }
    ).catch((err) => {
      console.log(err);
    })
  };

  

  // async function onClose() {
  //  "use server"
  //  console.log("modal close")
  // }
  // async function onSubmit() {
  //  "use server"
  //  console.log("modal close")
  // }

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    getVehicles();
    console
  }, []);

  function loadMoreCustomers(){
    
  }

  const disableLoadMore = false;

  function handleRowClick(){

  }
  function handleCustomerUpdate(){

  }

  const data = [
    {
      id : "5e4d37c2-0ea8-4d99-a628-eb0274f2e5aa",
      vehicleId : "5e4d37c2-0ea8-4d99-a628-eb0274f2e5aa",
      make : "Toyota",
      model : "Camry",
      year : "2018",
      VIN : "12345678901234567",
      status : "pending",
    },
    {
      id : "5e4d37c2-0ea8-4d99-a628-eb0274f2e5aa",
      vehicleId : "5e4d37c2-0ea8-4d99-a628-eb0274f2e5aa",
      make : "Toyota",
      model : "Camry",
      year : "2018",
      VIN : "12345678901234567",
      status : "pending",
    }
  ]

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
      <VehicleList data={data}
          loadMore={loadMoreCustomers}
          loadMoreDisable={disableLoadMore}
          handleRowClick={handleRowClick}
          updateData={handleCustomerUpdate}/>      </div>
    </div>
  );
};

export default VehiclesPage;
