import { IConvite } from "../objects/IConvite";

interface IConviteRepository {
  getAll(
    page?: number
  ): Promise<{ results: IConvite[]; totalPages: number } | IConvite[]>;
  getOne(id: string): Promise<IConvite | null>;
  // getCertificadosOfUsuario(usuarioId: string): Promise<IConvite[]>;
  // getCertificadosOfCurso(cursoId: string): Promise<IConvite[]>;
  create(convite: IConvite): Promise<IConvite>;
  delete(id: string): Promise<IConvite>;
}

export type { IConviteRepository };
