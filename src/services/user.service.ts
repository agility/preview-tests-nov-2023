import prisma from "../../prisma/client";

// Create a user
export async function createUser(data: {
  username: string;
  email: string;
  password: string;
  role: string;
}) {
  return prisma.user.create({
    data,
  });
}

// Find a user by email
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

// Update a user role
export async function updateUserRole(id: number, role: string) {
  return prisma.user.update({
    where: { id },
    data: { role },
  });
}

// Delete a user
export async function deleteUser(id: number) {
  return prisma.user.delete({
    where: { id },
  });
}
