import BaseRepository from '@/be-common/base/base.repository';

import { GovaaUserEntity } from '~/dtos/govaa.dto';

export default class UserRepository extends BaseRepository(GovaaUserEntity) {}
