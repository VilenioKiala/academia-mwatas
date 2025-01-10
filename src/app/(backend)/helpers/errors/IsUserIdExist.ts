import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { userRepository } from "../../repositories/MysqlSequelizeRepository/UserRepository";

@ValidatorConstraint({ async: true })
export class IsUserIdExistConstraint implements ValidatorConstraintInterface {
  validate(userId: string) {
    console.log(`O id do usuário aqui é ${userId}`);
    return userRepository.getOne(userId).then((user) => {
      if (!user) return false;
      return true;
    });
  }
}

export function IsUserIdExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserIdExistConstraint,
    });
  };
}
