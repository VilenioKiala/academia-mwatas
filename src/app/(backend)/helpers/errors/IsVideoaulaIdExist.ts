import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { videoAulaRepository } from "../../repositories/MysqlSequelizeRepository/VideoAulaRepository";

@ValidatorConstraint({ async: true })
export class IsVideoaulaIdExistConstraint
  implements ValidatorConstraintInterface
{
  validate(videoaulaId: string) {
    return videoAulaRepository.getOne(videoaulaId).then((videoaula) => {
      if (!videoaula) return false;
      return true;
    });
  }
}

export function IsVideoaulaIdExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsVideoaulaIdExistConstraint,
    });
  };
}
