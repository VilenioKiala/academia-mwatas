import { ICourse } from "../../objects/ICurso";

interface GetOneCourseUsecase {
  get(id: string): Promise<ICourse>;
}

export type { GetOneCourseUsecase };
