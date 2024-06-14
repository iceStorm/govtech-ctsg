import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const DatabaseModule = (options: TypeOrmModuleOptions) => {
  @Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DEV_PLATFORM === 'DOCKER' ? 'database' : 'localhost',
        port: parseInt(process.env.DB_PORT!),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        ...(options as object),
      }),
    ],
  })
  class DatabaseModule {}

  return DatabaseModule;
};

export default DatabaseModule;
