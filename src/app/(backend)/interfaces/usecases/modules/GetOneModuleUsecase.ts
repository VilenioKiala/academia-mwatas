import { IModule } from "../../objects/IModule";

interface GetOneModuleUsecase {
  get(id: string): Promise<IModule>;
}

export type { GetOneModuleUsecase };
