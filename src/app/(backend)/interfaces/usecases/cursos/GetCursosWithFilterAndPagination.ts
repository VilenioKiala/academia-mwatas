import { ICurso } from "../../objects/ICurso";
import { CursoFilterParams } from "../../repositories/ICursoRepository";

type GetCursosWithFilterAndPaginationUsecaseParams = {
  page?: number;
  cursosPerPage?: number;
  take?: number;
  filter?: CursoFilterParams;
};

interface GetCursosWithFilterAndPaginationUsecase {
  get(
    param: GetCursosWithFilterAndPaginationUsecaseParams
  ): Promise<{ results: ICurso[]; totalPages: number }>;
}

export type {
  GetCursosWithFilterAndPaginationUsecase,
  GetCursosWithFilterAndPaginationUsecaseParams,
};
