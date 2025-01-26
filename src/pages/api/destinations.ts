import {
  getAllDestinations,
  createDestination,
  updateDestination,
  deleteDestination, // Make sure this function is imported from the service
} from "../../services/destination.service";
import { NextApiRequest, NextApiResponse } from "next";

// TypeScript interfaces for the request body and response
interface DestinationRequestBody {
  name: string;
  description: string;
  location?: string;
  imageUrl: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query; // Get the ID from the URL

  try {
    if (method === "GET") {
      // Fetch all destinations
      const destinations = await getAllDestinations();
      return res.status(200).json(destinations);
    }

    if (method === "POST") {
      const { name, description, location, imageUrl }: DestinationRequestBody =
        req.body;

      // Validate incoming data
      if (!name || !description || !imageUrl) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Create a new destination
      const newDestination = await createDestination({
        name,
        description,
        location,
        imageUrl,
      });
      return res.status(201).json(newDestination);
    }

    if (method === "PUT") {
      // Check if an ID is provided in the URL for the PUT request
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: "Invalid destination ID" });
      }

      const { name, description, location, imageUrl }: DestinationRequestBody =
        req.body;

      // Validate incoming data
      if (!name || !description || !imageUrl) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Update the destination
      const updatedDestination = await updateDestination(Number(id), {
        name,
        description,
        location,
        imageUrl,
      });

      return res.status(200).json(updatedDestination);
    }

    if (method === "DELETE") {
      // Check if an ID is provided in the URL for the DELETE request
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: "Invalid destination ID" });
      }

      // Delete the destination
      await deleteDestination(Number(id));

      return res.status(204).end(); // No content, successful deletion
    }

    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
