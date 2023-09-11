"use-client"
import { useState } from "react";

const Tabs = ({activeTab , handleTabClick} : any) => {

  return (
    <div>
      <div className="flex justify-center">
        <button
          className={`${
            activeTab === "pending" ? "bg-gray-200" : ""
          } px-4 py-2 rounded-l-lg`}
          onClick={() => handleTabClick("pending")}
        >
          Pending
        </button>
        <button
          className={`${
            activeTab === "accepted" ? "bg-gray-200" : ""
          } px-4 py-2`}
          onClick={() => handleTabClick("accepted")}
        >
          Accepted
        </button>
        <button
          className={`${
            activeTab === "rejected" ? "bg-gray-200" : ""
          } px-4 py-2 rounded-r-lg`}
          onClick={() => handleTabClick("rejected")}
        >
          Rejected
        </button>
      </div>
    </div>
  );
};

export default Tabs;
