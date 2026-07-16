import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const technologies = [
    "React",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Prisma",
    "Tailwind CSS",
    "Gemini API",
    "Python"
  ];

  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { name: tech },
      update: {},
      create: { name: tech }
    });
  }

  console.log("Technologies seeded.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });