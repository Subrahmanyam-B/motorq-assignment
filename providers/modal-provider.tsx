"use client";

import { useEffect, useState } from "react";

import { VehicleModal } from "@/components/modals/vehicle-modal";
import { EnrollmentModal } from "@/components/modals/enrollment-modal";
import axios from "axios";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

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


  useEffect(() => {
    setIsMounted(true);
    getVehicles()
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <VehicleModal />
      <EnrollmentModal data={vehicleData}/>
    </>
  );
};
