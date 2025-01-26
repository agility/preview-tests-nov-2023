import { NextApiRequest, NextApiResponse } from "next";
import {
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from "../../../services/destination.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  if (method === "PUT") {
    try {
      const updatedDestination = await updateDestination(id as any, req.body);
      res.status(200).json(updatedDestination);
    } catch (error) {
      res.status(500).json({ message: "Error updating destination" });
    }
  }

  if (method === "DELETE") {
    try {
      await deleteDestination(id as any);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting destination" });
    }
  }
}
