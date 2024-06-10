import { Module } from '@nestjs/common';
import GovaaController from './govaa.controller';
import GovaaService from './govaa.servide';

@Module({
  imports: [GovaaController],
  providers: [GovaaService],
})
export default class GovaaModule {}
