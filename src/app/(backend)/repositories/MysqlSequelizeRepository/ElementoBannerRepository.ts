import { prisma } from "@/prisma/prisma";
import { IElementoBannerRepository } from "../../interfaces/repositories/IElementoBannerRepository";
import { IElementoBanner } from "../../interfaces/objects/IElementoBanner";
import { ElementoBanner } from "../../entities/ElementoBanner";

class ElementoBannerRepository implements IElementoBannerRepository {
  async create(elementoBanner: IElementoBanner, cursoId: string) {
    await prisma.elementoBanner.create({
      data: {
        photo: elementoBanner.photo,
        link: elementoBanner.link || undefined,
        cursoId: cursoId || undefined,
      },
    });

    return elementoBanner;
  }

  async getAll() {
    const elementosBanner = await prisma.elementoBanner.findMany({
      include: {
        curso: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return elementosBanner.map((elementoBanner) => {
      return Object.assign(new ElementoBanner(), {
        ...elementoBanner,
      });
    });
  }

  async getOne(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (!id) null;
    const elementoBanner = await prisma.elementoBanner.findUnique({
      where: { id },
      include: {
        curso: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!elementoBanner) return null;

    return Object.assign(new ElementoBanner(), {
      ...elementoBanner,
    });
  }

  async delete(id: string) {
    const elementoBanner = await prisma.elementoBanner.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new ElementoBanner(), {
      ...elementoBanner,
    });
  }
}

const elementoBannerRepository = new ElementoBannerRepository();

export { elementoBannerRepository };
