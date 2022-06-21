import React from "react";
import HotelTable from "../components/HotelTable";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Home = ({ initialData, size }) => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center text-white mb-4">Hotels Database</h1>
      <div className="border-2 w-fit m-auto border-blue-100 p-4 bg-white shadow-md rounded">
        <HotelTable count={size} initialData={initialData} />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const initialData = (
    await prisma.hotel.findMany({
      take: 10,
    })
  ).map((hotel) => {
    return {
      id: hotel.id,
      name: hotel.property_name,
      area: hotel.area,
      city: hotel.city,
      country: hotel.country,
      tripadvisorRating: hotel.mmt_tripadvisor_count,
      url: hotel.pageurl,
    };
  });
  const dataSize = await prisma.hotel.count();
  return {
    props: {
      initialData,
      size: dataSize,
    },
  };
};
