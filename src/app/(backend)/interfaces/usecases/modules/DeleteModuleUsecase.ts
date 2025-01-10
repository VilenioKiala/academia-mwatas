import { IModule } from "../../objects/IModule";

interface DeleteModuleUsecase {
  delete(id: string): Promise<{ modulo: IModule; deleted: boolean }>;
}

export type { DeleteModuleUsecase };
