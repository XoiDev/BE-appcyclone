import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsEndDateAfterStartDateConstraint
  implements ValidatorConstraintInterface
{
  validate(endDate: any, args: ValidationArguments) {
    const [startDatePropertyName] = args.constraints;
    const startDate = (args.object as any)[startDatePropertyName];

    if (!startDate || !endDate) {
      return false; // Both dates must be provided
    }

    return new Date(endDate) > new Date(startDate); // Ensure endDate is after startDate
  }

  defaultMessage(args: ValidationArguments) {
    const [startDatePropertyName] = args.constraints;
    return `The endDate (${args.value}) must be greater than startDate (${startDatePropertyName}).`;
  }
}

export function IsEndDateAfterStartDate(
  startDatePropertyName: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [startDatePropertyName],
      validator: IsEndDateAfterStartDateConstraint,
    });
  };
}
