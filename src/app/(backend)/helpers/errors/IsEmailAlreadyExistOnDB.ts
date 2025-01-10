import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { userRepository } from "../../repositories/MysqlSequelizeRepository/UserRepository";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistOnDBConstraint
  implements ValidatorConstraintInterface
{
  validate(email: string) {
    return userRepository.getOneByEmail(email).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function IsEmailAlreadyExistOnDB(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistOnDBConstraint,
    });
  };
}
