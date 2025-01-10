import { prisma } from "@/prisma/prisma";
import { IModuleRepository } from "../../interfaces/repositories/IModuleRepository";
import { Modulo } from "../../entities/Modulo";
import { IModulo } from "../../interfaces/objects/IModule";

class ModuleRepository implements IModuleRepository {
  async create(module: IModulo, cursoId: string) {
    await prisma.modulo.create({
      data: {
        titulo: module.titulo,
        cursoId: cursoId,
      },
    });

    return module;
  }

  async getAll() {
    const modulos = await prisma.modulo.findMany({
      include: {
        curso: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return modulos.map((modulo) => {
      return Object.assign(new Modulo(), {
        ...modulo,
      });
    });
  }

  async getOne(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (!id) null;

    const modulo = await prisma.modulo.findUnique({
      where: { id },
      include: {
        curso: true,
      },
    });

    if (!modulo) return null;

    return Object.assign(new Modulo(), {
      ...modulo,
    });
  }

  async delete(id: string) {
    const modulo = await prisma.modulo.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new Modulo(), {
      ...modulo,
    });
  }
}

const moduleRepository = new ModuleRepository();

export { moduleRepository };
