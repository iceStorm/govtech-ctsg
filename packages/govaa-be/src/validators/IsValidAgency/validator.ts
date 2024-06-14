import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Repository } from 'typeorm';

import GovernmentAgencyEntity from '@/common/entities/GovernmentAgencyEntity';

@ValidatorConstraint({ name: 'IsValidAgency', async: true })
@Injectable()
export default class IsValidAgencyValidator implements ValidatorConstraintInterface {
  logger = new Logger('IsValidAgencyValidator');

  constructor(
    @InjectRepository(GovernmentAgencyEntity)
    private readonly gaRepo: Repository<GovernmentAgencyEntity>,
  ) {}

  async validate(value: string): Promise<boolean> {
    try {
      const agency = await this.gaRepo.findOne({ where: { id: parseInt(value) } });
      return !!agency;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }

  defaultMessage(): string {
    return 'Agency is not valid';
  }
}
