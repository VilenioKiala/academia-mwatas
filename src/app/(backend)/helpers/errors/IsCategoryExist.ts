import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { categoriaRepository } from "../../repositories/MysqlSequelizeRepository/CategoriaRepository";

@ValidatorConstraint({ async: true })
export class IsCategoryExistConstraint implements ValidatorConstraintInterface {
  validate(categoryId: string) {
    return categoriaRepository.getOne(categoryId).then((category) => {
      if (!category) return false;
      return true;
    });
  }
}

export function IsCategoryExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCategoryExistConstraint,
    });
  };
}
