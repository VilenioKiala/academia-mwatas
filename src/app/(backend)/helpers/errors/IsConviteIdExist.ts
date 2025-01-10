import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { conviteRepository } from "../../repositories/MysqlSequelizeRepository/ConviteRepository";

@ValidatorConstraint({ async: true })
export class IsConviteIdExistConstraint
  implements ValidatorConstraintInterface
{
  validate(conviteId: string) {
    return conviteRepository.getOne(conviteId).then((convite) => {
      if (!convite) return false;
      return true;
    });
  }
}

export function IsConviteIdExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsConviteIdExistConstraint,
    });
  };
}
