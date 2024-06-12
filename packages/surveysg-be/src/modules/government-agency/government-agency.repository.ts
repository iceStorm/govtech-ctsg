import { Injectable } from '@nestjs/common';

import BaseRepository from '~/common/base.repository';
import GovernmentAgencyEntity from '~/entities/GovernmentAgency';

@Injectable()
export default class GovernmentAgencyRepository extends BaseRepository(GovernmentAgencyEntity) {}
