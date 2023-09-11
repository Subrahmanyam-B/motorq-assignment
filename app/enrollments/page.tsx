"use client"

import { useEffect } from "react";
import axios from 'axios';
import { useEnrollmentModal } from "@/hooks/use-enrollment-modal";
import { EnrollmentList } from "@/components/main/enrollment-list";

const page = () => {
  const getVehicles = async () => {
    await axios.get("/api/vehicles").then((res) => {
      console.log(res.data);
    }
    ).catch((err) => {
      console.log(err);
    })
  };
  const onOpen = useEnrollmentModal((state) => state.onOpen);
  const isOpen = useEnrollmentModal((state) => state.isOpen);

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
      id : "1",
      vehicleId : "5e4d37c2-0ea8-4d99-a628-eb0274f2e5aa",
      make : "Toyota",
      model : "Camry",
      year : "2018",
      VIN : "12345678901234567",
      status : "pending",
    },
    {
      id : "2",
      vehicleId : "5e4d37c2-0ea8-4d99-a628-eb0274f2e5aa",
      make : "Toyota",
      model : "Camry",
      year : "2018",
      VIN : "12345678901234567",
      status : "pending",
    }
  ]


  useEffect(() => {
  }, [onOpen, isOpen]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold py-5">Enrollments</h1>
        <button onClick={onOpen} className="bg-primary px-3 my-3 rounded-lg text-white font-semibold text-sm flex items-center justify-center">
          + Add Enrollment
        </button>
      </div>
      <div>
        <form action=""></form>
      </div>
      <div>
        <EnrollmentList data={data}
          loadMore={loadMoreCustomers}
          loadMoreDisable={disableLoadMore}
          handleRowClick={handleRowClick}
          updateData={handleCustomerUpdate}/>
      </div>
    </div>
  );
};

export default page;
