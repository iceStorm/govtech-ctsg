import BaseRepository from '@/be-common/base/base.repository';
import SurveyUserEntity from '@/common/entities/SurveyUserEntity';

export default class UserRepository extends BaseRepository(SurveyUserEntity) {
  findByEmail(email: string) {
    return this.findOneBy({ govaaEmail: email });
  }
}
