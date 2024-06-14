import { Injectable } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource, EntitySchema, Repository } from 'typeorm';

// encapsulating the steps for injecting a repository and entity
// https://stackoverflow.com/a/74546046
const BaseRepository = <T extends EntityClassOrSchema>(entity: T) => {
  @Injectable()
  // @ts-expect-error T is invalid for InstanceType
  class BaseRepositoryImpl extends Repository<T extends EntitySchema ? T : InstanceType<T>> {
    constructor(readonly dataSource: DataSource) {
      const repo = dataSource.getRepository(entity);
      super(repo.target, repo.manager, repo.queryRunner);
    }
  }

  return BaseRepositoryImpl;
};

export default BaseRepository;
