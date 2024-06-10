import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '~/entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'govetch-ctsg-db',
      entities: [User],
      synchronize: true,
    }),
  ],
})
export default class DatabaseModule {}
