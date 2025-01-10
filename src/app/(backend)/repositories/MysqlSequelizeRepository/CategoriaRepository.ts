import { prisma } from "@/prisma/prisma";
import { ICategoria } from "../../interfaces/objects/ICategoria";
import { Categoria } from "../../entities/Categoria";
import { ICategoriaRepository } from "../../interfaces/repositories/ICategoriaRepository";

class CategoriaRepository implements ICategoriaRepository {
  async create(categoria: ICategoria) {
    await prisma.categoria.create({
      data: {
        titulo: categoria.titulo,
      },
    });

    return categoria;
  }

  async getAll() {
    const categorias = await prisma.categoria.findMany({
      include: {
        cursos: {
          take: 6,
          include: {
            modulos: {
              include: {
                videoAulas: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return categorias.map((categoria) => {
      return Object.assign(new Categoria(), {
        ...categoria,
        titulo: categoria.titulo,
      });
    });
  }

  async getOne(id: string) {
    const categoria = await prisma.categoria.findUnique({
      where: { id },
      include: {
        cursos: { include: { modulos: { include: { videoAulas: true } } } },
      },
    });

    if (!categoria) return null;

    return Object.assign(new Categoria(), {
      ...categoria,
      nome: categoria.titulo,
    });
  }

  async update(categoria: ICategoria, categoriaId: string) {
    await prisma.categoria.update({
      where: { id: categoriaId },
      data: {
        titulo: categoria.titulo,
      },
    });

    return categoria;
  }

  async delete(id: string) {
    const categoria = await prisma.categoria.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new Categoria(), {
      ...categoria,
    });
  }
}

const categoriaRepository = new CategoriaRepository();

export { categoriaRepository };
