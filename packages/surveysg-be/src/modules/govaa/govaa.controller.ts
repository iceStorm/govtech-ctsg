import { Controller, Post } from '@nestjs/common';

@Controller()
export default class GovaaController {
  @Post('/auth')
  authenticate() {
    //
  }
}
