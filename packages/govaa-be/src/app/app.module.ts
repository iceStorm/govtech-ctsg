import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import DatabaseModule from '@/be-common/modules/database/database.module';

import { GovaaUserEntity } from '~/dtos/govaa.dto';
import UserRepository from '~/repositories/user.repository';
import userSeeds from '~/seed/users.seed';
import { hashPassword } from '~/utils/hash.util';

import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../../../.env' }),
    DatabaseModule({ entities: [GovaaUserEntity] }),
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export default class AppModule implements OnApplicationBootstrap {
  logger = new Logger('AppModuleSeed');

  constructor(private readonly userRepo: UserRepository) {}

  async onApplicationBootstrap() {
    try {
      const isSeeded = (await this.userRepo.count()) > 0;
      if (isSeeded) {
        this.logger.log('Users already seeded.');
        return;
      }

      const userEntities = await Promise.all(
        userSeeds.map(async (seed) => {
          const user = this.userRepo.create({
            ...seed,
            password: await hashPassword(seed.password),
          });

          return user;
        }),
      );

      await this.userRepo.save(userEntities);

      this.logger.log('Seeded users successfully!');
    } catch (error) {
      this.logger.error('Failed to seed users', error);
    }
  }
}
