import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
// слова
const profaneWords = ['badword1', 'badword2', 'badword3'];

// позначаємо валідатор і ім'я profanity
@ValidatorConstraint({ name: 'profanity' })
export class ProfanityValidator implements ValidatorConstraintInterface {
// приємо dto
  validate(dto: any) {
    for (const key in dto) {
      if (typeof dto[key] === 'string') {
        const words = dto[key].split(' ');
        if (words.some(word => profaneWords.includes(word.toLowerCase()))) {
          return false;
        }
      }
    }
    return true;
  }
}