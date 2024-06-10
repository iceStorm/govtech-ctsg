import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import GovernmentAgency from '~/entities/GovernmentAgency';
import User from '~/entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, GovernmentAgency],
      synchronize: true,
    }),
  ],
})
export default class DatabaseModule {}
