import { NextApiRequest, NextApiResponse } from "next";
import {
  createUser,
  findUserByEmail,
  updateUserRole,
  deleteUser,
} from "../../../services/user.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  if (method === "POST") {
    try {
      const { username, email, password, role } = req.body;

      // Validate incoming data
      if (!username || !email || !password || !role) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const newUser = await createUser({ username, email, password, role });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  }

  if (method === "GET") {
    try {
      if (id) {
        const user = await findUserByEmail(id as string);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } else {
        res.status(400).json({ message: "User ID is required" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }

  if (method === "PUT") {
    try {
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const { role } = req.body;

      // Validate incoming data
      if (!role) {
        return res.status(400).json({ message: "Role is required" });
      }

      const updatedUser = await updateUserRole(Number(id), role);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  }

  if (method === "DELETE") {
    try {
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      await deleteUser(Number(id));
      res.status(204).end(); // No content, successful deletion
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  }

  // Handle unsupported HTTP methods
  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
