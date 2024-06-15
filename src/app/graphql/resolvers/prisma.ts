import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: [{ level: "query", emit: "event" }],
});

prisma.$on("query", (event) => {
  console.log(`${event.query}\n`, `${event.params}\n`, `${event.duration} ms\n`);
});

export default prisma;
