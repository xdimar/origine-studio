const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Mulai memasukkan data layanan...");

  await prisma.service.createMany({
    data: [
      {
        name: "Basic",
        category: "Self Photo Studio",
        price: 35000,
        durationMinutes: 6,
        description: "1 Background & fun property",
        maxPax: 4,
      },
      {
        name: "Classic",
        category: "Self Photo Studio",
        price: 50000,
        durationMinutes: 10,
        description: "1 Background & fun property",
        maxPax: 4,
      },
      {
        name: "Standart",
        category: "Self Photo Studio",
        price: 80000,
        durationMinutes: 15,
        description: "1 Background & fun property",
        maxPax: 4,
      },
      {
        name: "Premium",
        category: "Self Photo Studio",
        price: 100000,
        durationMinutes: 20,
        description: "1 Background & fun property",
        maxPax: 4,
      },
      {
        name: "Platinum",
        category: "Self Photo Studio",
        price: 120000,
        durationMinutes: 30,
        description: "1 Background & fun property",
        maxPax: 4,
      },
    ],
  });

  console.log("Data layanan berhasil dimasukkan ke database!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
