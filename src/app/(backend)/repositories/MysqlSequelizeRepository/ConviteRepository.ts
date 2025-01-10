import { prisma } from "@/prisma/prisma";
import { IConvite } from "../../interfaces/objects/IConvite";
import { IConviteRepository } from "../../interfaces/repositories/IConviteRepository";
import { Convite } from "../../entities/Convite";

class ConviteRepository implements IConviteRepository {
  async create(convite: IConvite) {
    await prisma.convite.create({
      data: {
        imagem: convite.imagem,
        textoChamada: convite.textoChamada,
        textoDestaque: convite.textoDestaque,
      },
    });

    return convite;
  }

  async getAll(page?: number) {
    if (page) {
      const itemsPerPage = 2;
      const NumberOfItems = await prisma.convite.count();
      console.log("Numero de convites na db:", NumberOfItems);
      const totalPages = Math.ceil(NumberOfItems / itemsPerPage);

      const convites = await prisma.convite.findMany({
        take: itemsPerPage,
        skip: (page - 1) * 2,
        include: {
          // usuarios: true,
          pedidos: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const toObjectConvite = convites.map((convite) =>
        Object.assign(new Convite(), { ...convite })
      );

      return {
        results: toObjectConvite,
        totalPages,
      };
    } else {
      const convites = await prisma.convite.findMany({
        include: {
          // usuarios: true,
          pedidos: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return convites.map((convite) =>
        Object.assign(new Convite(), { ...convite })
      );
    }
  }

  async getOne(id: string) {
    const convite = await prisma.convite.findUnique({
      where: { id },
      include: {
        // usuarios: true,
        pedidos: true,
      },
    });

    if (!convite) return null;

    return Object.assign(new Convite(), {
      ...convite,
    });
  }

  async delete(id: string) {
    const convite = await prisma.convite.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new Convite(), {
      ...convite,
    });
  }
}

const conviteRepository = new ConviteRepository();

export { conviteRepository };
