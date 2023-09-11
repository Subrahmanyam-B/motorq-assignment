"use client"

import { useEffect } from "react";
import axios from 'axios';
import { EnrollmentList } from "@/components/main/enrollment-list";

const CustomersPage = () => {
  const getVehicles = async () => {
    await axios.get("/api/vehicles").then((res) => {
      console.log(res.data);
    }
    ).catch((err) => {
      console.log(err);
    })
  };

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


  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold py-5">Customers</h1>
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

export default CustomersPage;
