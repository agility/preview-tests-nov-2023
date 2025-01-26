import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: { body?: any; query?: any; method?: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (
          arg0:
            | {
                email: string;
                username: string;
                name: string;
                password: string;
                role: string;
                id: number;
              }
            | {
                email: string;
                username: string;
                name: string;
                password: string;
                role: string;
                id: number;
              }[]
        ): void;
        new (): any;
      };
      end: { (arg0: string | undefined): void; new (): any };
    };
    setHeader: (arg0: string, arg1: string[]) => void;
  }
) {
  const { method } = req;

  try {
    if (method === "POST") {
      const { email, username, name, password, role } = req.body;

      // Check if the email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email already exists." });
      }

      // Create the new user
      const user = await prisma.user.create({
        data: {
          email,
          name,
          username,
          password,
          role,
        },
      });

      return res.status(201).json(user);
    }

    if (method === "GET") {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    }

    if (method === "PUT") {
      const { id, email, name, username, password, role } = req.body;

      // Update the user
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          email,
          name,
          username,
          password,
          role,
        },
      });

      return res.status(200).json(updatedUser);
    }

    if (method === "DELETE") {
      const { id } = req.query;

      await prisma.user.delete({
        where: { id: Number(id) },
      });

      return res.status(204).end();
    }

    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(400).json({
        error: `A user with this email already exists.`,
      });
    }
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
