'use client';

import React, { useEffect } from "react";
import Dashboard from "./Dashboard"; // Your existing dashboard component

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex mt-[8rem] w-[90%] mx-auto mb-[4rem] max-lg:flex-col">
      {/* Dashboard Sidebar */}
      <div className="p-4 bg-white lg:block">
        <Dashboard />
      </div>

      {/* Content Area */}
      <div className="w-[100%] p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
