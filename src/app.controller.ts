import { Controller, Get, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { InputData, QueueItem, RawData } from './types';
import * as core from 'express-serve-static-core';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put('')
  async update(
    @Req() request: Request<core.ParamsDictionary, unknown, InputData>,
  ): Promise<Array<string>> {
    const queueItem: QueueItem = {
      timestamp: new Date().getTime(),
      input: request.body,
    };

    this.appService.addQueueItem(queueItem);

    return ['1'];
  }
}
