import {
  IUserRepository,
  UserFilterParams,
} from "../../interfaces/repositories/IUserRepository";
import { IUser } from "../../interfaces/objects/IUser";
import { User } from "../../entities/User";
import { prisma } from "@/prisma/prisma";

class UserRepository implements IUserRepository {
  async create(user: IUser) {
    user.repetirSenha = undefined;
    await prisma.user.create({
      data: {
        nome: user.nome,
        sobrenome: user.sobrenome,
        nomeUsuario: user.nomeUsuario,
        email: user.email,
        bloqueado: user.bloqueado,
        dataNascimento: user.dataNascimento,
        genero: user.genero,
        numeroTelefone: Number(user.numeroTelefone),
        sobre: user.sobre,
        privilegio: user.privilegio,
        profilePic: user.profilePic,
        senha: user.senha,
        conviteId: user.conviteId,
      },
    });

    return user;
  }

  async getAll() {
    const users = await prisma.user.findMany();

    return users.map((user) => Object.assign(new User(), { ...user }));
  }

  async getUsersWithPaginationAndFilter(
    page?: number,
    usersPerPage?: number,
    filter?: UserFilterParams
  ) {
    let users;
    const NumberOfUsers = await prisma.user.count({
      where: {
        OR: filter.query && [
          { nome: filter.query && { contains: `${filter.query.toString()}` } },
          {
            sobrenome: filter.query && {
              contains: `${filter.query.toString()}`,
            },
          },
          {
            nomeUsuario: filter.query && {
              contains: `${filter.query.toString()}`,
            },
          },
        ],
        matriculas: filter.cursoIdMatriculado
          ? {
              some: {
                cursoId: filter.cursoIdMatriculado,
              },
            }
          : filter.assinantes !== undefined
            ? {
                some: filter.assinantes == true ? {} : undefined,
                none: filter.assinantes == false ? {} : undefined,
              }
            : undefined,
      },
    });

    const totalPages = Math.ceil(NumberOfUsers / usersPerPage);

    // eslint-disable-next-line prefer-const
    users = await prisma.user.findMany({
      take: usersPerPage || 2,
      skip: (page - 1) * (usersPerPage || 2),
      where: {
        OR: filter.query && [
          { nome: filter.query && { contains: `${filter.query.toString()}` } },
          {
            sobrenome: filter.query && {
              contains: `${filter.query.toString()}`,
            },
          },
          {
            nomeUsuario: filter.query && {
              contains: `${filter.query.toString()}`,
            },
          },
        ],
        matriculas: filter.cursoIdMatriculado
          ? {
              some: {
                cursoId: filter.cursoIdMatriculado,
              },
            }
          : filter.assinantes !== undefined
            ? {
                some: filter.assinantes == true ? {} : undefined,
                none: filter.assinantes == false ? {} : undefined,
              }
            : undefined,
      },
      include: {
        matriculas: true,
      },
    });

    const toObjectUser = users.map((user) =>
      Object.assign(new User(), { ...user })
    );

    return {
      results: toObjectUser,
      totalPages,
    };
  }

  async getOne(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        certificados: {
          include: {
            usuario: true,
            curso: true,
          },
        },
        visualizacoes: true,
        matriculas: {
          include: {
            curso: {
              include: {
                matriculas: true,
                modulos: {
                  include: {
                    videoAulas: {
                      include: {
                        visualizacoes: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) return null;

    return Object.assign(new User(), { ...user });
  }

  async getOneByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return Object.assign(new User(), { ...user });
  }

  async getOneByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { nomeUsuario: username },
    });

    if (!user) return null;

    return Object.assign(new User(), { ...user });
  }

  async update(user: IUser) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        nome: user.nome,
        sobrenome: user.sobrenome,
        nomeUsuario: user.nomeUsuario,
        email: user.email,
        bloqueado: user.bloqueado,
        dataNascimento: user.dataNascimento,
        genero: user.genero,
        numeroTelefone: Number(user.numeroTelefone),
        sobre: user.sobre,
        privilegio: user.privilegio,
        profilePic: user.profilePic,
        senha: user.senha,
      },
    });

    return user;
  }

  async delete(id: string) {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return Object.assign(new User(), {
      ...user,
    });
  }

  async removerFotoPerfil(id: string) {
    await prisma.user.update({
      where: { id },
      data: {
        profilePic: undefined,
      },
    });
  }
}

const userRepository = new UserRepository();

export { userRepository };
