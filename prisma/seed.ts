import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../server/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });
const prisma = new PrismaClient({ adapter });

const characters = [
  "Son Goku", "Vegeta", "Son Gohan", "Son Goten", "Trunks", "Piccolo",
  "Krillin", "Yamcha", "Tenshinhan", "Chaozu", "Bulma", "Chi-Chi",
  "Videl", "Pan", "Bardock", "Raditz", "Nappa", "Turles",
  "Frieza", "Cooler", "King Cold", "Ginyu", "Recoome", "Burter",
  "Jeice", "Guldo", "Cell", "Android 16", "Android 17", "Android 18",
  "Dr. Gero", "Majin Buu", "Super Buu", "Kid Buu", "Dabura", "Babidi",
  "Broly", "Gogeta", "Vegito", "Gotenks", "Pikkon",
  "Beerus", "Whis", "Champa", "Vados", "Hit", "Jiren", "Toppo",
  "Caulifla", "Kale", "Kefla", "Cabba", "Dyspo",
  "Goku Black", "Zamasu", "Fused Zamasu", "Future Trunks",
  "Moro", "Granolah", "Gas", "Ultra Ego Vegeta",
  "Janemba", "Hirudegarn", "Bojack", "Tapion", "Cooler (métal)",
  "Super Saiyan God Goku", "Ultra Instinct Goku", "Mastered Ultra Instinct Goku"
];

const series = [
  "Dragon Ball",
  "Dragon Ball Z",
  "Dragon Ball GT",
  "Dragon Ball Super",
  "Dragon Ball Super: Broly",
  "Dragon Ball Z: Battle of Gods",
  "Dragon Ball Z: Resurrection 'F'",
  "Dragon Ball Z: Fusion Reborn",
  "Dragon Ball Z: Wrath of the Dragon",
  "Dragon Ball Z: Bojack Unbound",
  "Dragon Ball Heroes",
  "Super Dragon Ball Heroes",
];

async function main() {
  console.log("Seeding characters...");
  for (const name of characters) {
    await prisma.character.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Seeding series...");
  for (const name of series) {
    await prisma.series.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log(`Done: ${characters.length} characters, ${series.length} series.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
