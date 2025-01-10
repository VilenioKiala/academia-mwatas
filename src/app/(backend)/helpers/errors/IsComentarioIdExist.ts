import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { comentarioRepository } from "../../repositories/MysqlSequelizeRepository/ComentarioRepository";

@ValidatorConstraint({ async: true })
export class IsComentarioIdExistConstraint
  implements ValidatorConstraintInterface
{
  validate(comentarioId: string) {
    return comentarioRepository.getOne(comentarioId).then((comentario) => {
      if (!comentario) return false;
      return true;
    });
  }
}

export function IsComentarioIdExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsComentarioIdExistConstraint,
    });
  };
}
