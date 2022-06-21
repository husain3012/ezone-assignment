import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      getHandler(req, res);
      break;
    case "POST":
      postHandler(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const postHandler = (req: NextApiRequest, res: NextApiResponse) => {};

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pageSize, pageIndex } = req.query || {
    pageIndex: 0,
    pageSize: 20,
  };
  const skipNum = parseInt(pageIndex as string) * parseInt(pageSize as string);
  const takeNum = parseInt(pageSize as string);
  const hotels = (
    await prisma.hotel.findMany({
      skip: skipNum,
      take: takeNum,
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

  return res.json(hotels);
};
