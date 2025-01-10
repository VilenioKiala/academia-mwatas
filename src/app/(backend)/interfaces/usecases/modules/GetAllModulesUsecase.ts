import { IModule } from "../../objects/IModule";

interface GetAllModulesUsecase {
  get(): Promise<IModule[]>;
}

export type { GetAllModulesUsecase };
