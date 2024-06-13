import SurveyUserEntity from '@/common/entities/SurveyUserEntity';

import BaseRepository from '~/common/base.repository';

export default class UserRepository extends BaseRepository(SurveyUserEntity) {
  findByEmail(email: string) {
    return this.findOneBy({ govaaEmail: email });
  }
}
