import { ICursoRepository } from "../../interfaces/repositories/ICursoRepository";
import {
  GetCursosWithFilterAndPaginationUsecase,
  GetCursosWithFilterAndPaginationUsecaseParams,
} from "../../interfaces/usecases/cursos/GetCursosWithFilterAndPagination";
import { cursoRepository } from "../../repositories/MysqlSequelizeRepository/CursoRepository";

class GetCursosWithPaginationAndFilterService
  implements GetCursosWithFilterAndPaginationUsecase
{
  constructor(private cursoRepository: ICursoRepository) {}

  async get(param: GetCursosWithFilterAndPaginationUsecaseParams) {
    const cursos = await this.cursoRepository.getCursosWithPaginationAndFilter(
      param.page,
      param.cursosPerPage,
      {
        categoriaId: param.filter.categoriaId,
        query: param.filter.query,
        disponibilidade: param.filter.disponibilidade,
      }
    );

    return cursos;
  }
}

const getCursosWithPaginationAndFilterService =
  new GetCursosWithPaginationAndFilterService(cursoRepository);

export { getCursosWithPaginationAndFilterService };
