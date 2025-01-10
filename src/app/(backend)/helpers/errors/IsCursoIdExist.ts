import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { cursoRepository } from "../../repositories/MysqlSequelizeRepository/CursoRepository";

@ValidatorConstraint({ async: true })
export class IsCursoIdExistConstraint implements ValidatorConstraintInterface {
  validate(cursoId: string) {
    return cursoRepository.getOne(cursoId).then((curso) => {
      if (!curso) return false;
      return true;
    });
  }
}

export function IsCursoIdExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCursoIdExistConstraint,
    });
  };
}
