import { registerDecorator, ValidationOptions } from 'class-validator';

export default function IsTrue(validationOptions?: ValidationOptions) {
  return function (target: object, propertyName: string) {
    registerDecorator({
      name: 'IsTrue',
      propertyName,
      target: target.constructor,
      options: { message: '$property must be true', ...validationOptions },
      validator: {
        validate(value: unknown) {
          return typeof value === 'boolean' && value === true;
        },
      },
    });
  };
}
