import { IModule } from "../../objects/IModule";

type CreateModuleParams = {
  titulo: string;
  cursoId: string;
};

interface CreateModuleUsecase {
  create(params: CreateModuleParams): Promise<IModule>;
}

export type { CreateModuleUsecase, CreateModuleParams };
