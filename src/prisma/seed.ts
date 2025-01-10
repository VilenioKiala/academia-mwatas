import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

const salt = 8;

async function main() {
  const senha1 = bcrypt.hashSync("123456789super", salt);
  const senha2 = bcrypt.hashSync("elianaamor123", salt);

  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "helioousman@gmail.com",
      nome: "Hélio",
      sobrenome: "Ousman",
      nomeUsuario: "helio_ousman",
      senha: senha1,
      privilegio: "superadmin",
      emailConfirmado: true,
      moreInfoGave: true,
    },
  });
  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "vileniocoimbra@gmail.com",
      nome: "Vilénio",
      sobrenome: "Kiala",
      nomeUsuario: "vileniokiala",
      senha: senha2,
      privilegio: "admin",
      emailConfirmado: true,
      moreInfoGave: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "vileniocoimbra@hotmail.com",
      nome: "Vilas",
      sobrenome: "Anderson",
      nomeUsuario: "vileniocoimbra",
      senha: senha2,
      privilegio: "aluno",
      emailConfirmado: true,
      moreInfoGave: true,
    },
  });
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
