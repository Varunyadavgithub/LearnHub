import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <div className="flex">
        <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
          <div className="space-y-4">
            <Link
              to="dashboard"
              className={`flex items-center gap-2 ${
                location.pathname === "/admin/dashboard" &&
                "bg-blue-100 dark:bg-blue-800"
              } p-2 rounded-lg text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-700`}
            >
              <ChartNoAxesColumn
                size={22}
                className="text-blue-700 dark:text-blue-400"
              />
              <h1>Dashboard</h1>
            </Link>
            <Link
              to="course"
              className={`flex items-center gap-2 ${
                location.pathname === "/admin/course" &&
                "bg-blue-100 dark:bg-blue-800"
              } p-2 rounded-lg text-gray-800 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-700`}
            >
              <SquareLibrary
                size={22}
                className="text-blue-700 dark:text-blue-400"
              />
              <h1>Course</h1>
            </Link>
          </div>
        </div>
        <div className="p-4 flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
