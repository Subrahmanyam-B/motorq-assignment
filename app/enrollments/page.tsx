"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useEnrollmentModal } from "@/hooks/use-enrollment-modal";
import { EnrollmentList } from "@/components/main/enrollment-list";

const EnrollmentsPage = () => {

  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === 'admin';
  const [enrollmentData , setEnrollmentData] = useState([]);

  const getEnrollments = async () => {
    await axios.get("/api/enrollments").then((res) => {
      console.log(res)
      setEnrollmentData(res.data);
    }
    ).catch((err) => {
      console.log(err);
    })
  };


  const onOpen = useEnrollmentModal((state) => state.onOpen);
  const isOpen = useEnrollmentModal((state) => state.isOpen);

  useEffect(() => {
    getEnrollments();
  }, []);

  function loadMoreCustomers(){
    
  }

  const disableLoadMore = true;

  function handleRowClick(){

  }
  function handleCustomerUpdate(){

  }

  useEffect(() => {
  }, [onOpen, isOpen]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold py-5">Enrollments</h1>
        {session?.user?.role ==='customer' ? <button onClick={onOpen} className="bg-primary px-3 my-3 rounded-lg text-white font-semibold text-sm flex items-center justify-center">
          + Add Enrollment
        </button> : null }
      </div>
      <div>
        <form action=""></form>
      </div>
      <div>
        <EnrollmentList data={enrollmentData}
          loadMore={loadMoreCustomers}
          loadMoreDisable={disableLoadMore}
          handleRowClick={handleRowClick}
          updateData={handleCustomerUpdate}/>
          isAdmin={isAdmin}

      </div>
    </div>
  );
};

export default EnrollmentsPage;
