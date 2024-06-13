import { registerDecorator, ValidationOptions } from 'class-validator';

export default function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: unknown) {
          return typeof value === 'boolean' && value === true;
        },
      },
    });
  };
}
