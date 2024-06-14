import { Injectable } from '@nestjs/common';

import BaseRepository from '@/be-common/base/base.repository';
import GovernmentAgencyEntity from '@/common/entities/GovernmentAgencyEntity';

@Injectable()
export default class GovernmentAgencyRepository extends BaseRepository(GovernmentAgencyEntity) {}
