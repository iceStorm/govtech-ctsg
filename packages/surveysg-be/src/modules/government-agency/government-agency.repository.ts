import { Injectable } from '@nestjs/common';

import GovernmentAgencyEntity from '@/common/entities/GovernmentAgencyEntity';

import BaseRepository from '~/common/base.repository';

@Injectable()
export default class GovernmentAgencyRepository extends BaseRepository(GovernmentAgencyEntity) {}
