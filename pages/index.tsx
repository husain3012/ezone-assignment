import React from "react";
import HotelTable from "../components/HotelTable";
const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-4">Hotels Database</h1>
      <div className="border-2 w-fit m-auto border-blue-100 p-4 bg-white shadow-md rounded">
        <HotelTable />
      </div>
 
    </div>
  );
};

export default Home;

