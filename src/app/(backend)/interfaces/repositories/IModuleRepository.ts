import { IModule } from "../objects/IModule";

interface IModuleRepository {
  getAll(): Promise<IModule[]>;
  getOne(id: string): Promise<IModule | null>;
  create(module: IModule, cursoId: string): Promise<IModule>;
  delete(id: string): Promise<IModule>;
}

export type { IModuleRepository };
