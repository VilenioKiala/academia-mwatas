import { prisma } from "@/prisma/prisma";
import { IMaterialComplementarRepository } from "../../interfaces/repositories/IMaterialComplementarRepository";
import { IMaterialComplementar } from "../../interfaces/objects/IMaterialComplementar";
import { MaterialComplementar } from "../../entities/MaterialComplementar";

class MaterialComplementarRepository
  implements IMaterialComplementarRepository
{
  async create(
    materialComplementar: IMaterialComplementar,
    videoaulaId: string
  ) {
    await prisma.materialComplementar.create({
      data: {
        ficheiro: materialComplementar.ficheiro,
        titulo: materialComplementar.titulo,
        videoAulaId: videoaulaId,
      },
    });

    return materialComplementar;
  }

  async getAll() {
    const materiaisComplementares = await prisma.materialComplementar.findMany({
      include: {
        videoaula: {
          include: {
            modulo: {
              include: {
                curso: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return materiaisComplementares.map((materialComplementar) => {
      return Object.assign(new MaterialComplementar(), {
        ...materialComplementar,
      });
    });
  }

  async getOne(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (!id) null;
    const materialComplementar = await prisma.materialComplementar.findUnique({
      where: { id },
      include: {
        videoaula: true,
      },
    });

    if (!materialComplementar) return null;

    return Object.assign(new MaterialComplementar(), {
      ...materialComplementar,
    });
  }

  async getFive() {
    const materiaisComplementares = await prisma.materialComplementar.findMany({
      take: 5,
      include: {
        videoaula: {
          include: {
            modulo: {
              include: {
                curso: {
                  include: {
                    matriculas: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return materiaisComplementares.map((materialComplementar) => {
      return Object.assign(new MaterialComplementar(), {
        ...materialComplementar,
      });
    });
  }

  async update(
    materialComplementar: IMaterialComplementar,
    materialComplementarId: string,
    videoaulaId: string
  ) {
    await prisma.materialComplementar.update({
      where: { id: materialComplementarId },
      data: {
        videoAulaId: videoaulaId,
        titulo: materialComplementar.titulo,
        ficheiro: materialComplementar.ficheiro,
      },
    });

    return materialComplementar;
  }

  async delete(id: string) {
    const materialComplementar = await prisma.materialComplementar.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new MaterialComplementar(), {
      ...materialComplementar,
    });
  }
}

const materialComplementarRepository = new MaterialComplementarRepository();

export { materialComplementarRepository };
