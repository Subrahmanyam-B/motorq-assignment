"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useEnrollmentModal } from "@/hooks/use-enrollment-modal";
import { EnrollmentList } from "@/components/main/enrollment-list";
import Tabs from "@/components/main/tabs";

const EnrollmentsPage = () => {

  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === 'admin';
  const [enrollmentData , setEnrollmentData] = useState([]);
  const [filteredEnrollmentData, setFilteredEnrollmentData] = useState([]);

  const getEnrollments = async (activeTab : string) => {
    await axios.get("/api/enrollments").then((res) => {
      console.log(res)
      const filteredData = res.data.filter((enrollment : any) => enrollment.status === activeTab);
      setEnrollmentData(filteredData);
      setFilteredEnrollmentData(filteredData);
    }
    ).catch((err) => {
      console.log(err);
    })
  };

  const onOpen = useEnrollmentModal((state) => state.onOpen);
  const isOpen = useEnrollmentModal((state) => state.isOpen);

  const [activeTab, setActiveTab] = useState("pending");
  const [searchValue, setSearchValue] = useState("");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    const filteredData = enrollmentData.filter((enrollment: any) => enrollment?.vehicle?.VIN?.includes(value));
    setFilteredEnrollmentData(filteredData);
  };

  useEffect(() => {
    getEnrollments(activeTab);
  }, [activeTab]);

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
        <Tabs activeTab={activeTab} handleTabClick={handleTabClick}/>
      </div>
      <div>
        <input type="text" placeholder="Search by VIN" value={searchValue} onChange={handleSearchChange} className="border border-gray-300 rounded-lg px-3 py-2 my-3" />
        {filteredEnrollmentData.length > 0 ? <EnrollmentList data={filteredEnrollmentData}
          loadMore={loadMoreCustomers}
          loadMoreDisable={disableLoadMore}
          handleRowClick={handleRowClick}
          updateData={handleCustomerUpdate}
          isAdmin={isAdmin}/> : <div> No Enrollments </div>}
      </div>
    </div>
  );
};

export default EnrollmentsPage;
