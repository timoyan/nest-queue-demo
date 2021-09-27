import { Injectable, Scope } from '@nestjs/common';
import { InputData, QueueItem, RawData } from './types';
import { mergeMap, Subject } from 'rxjs';

@Injectable({ scope: Scope.DEFAULT })
export class AppService {
  private rawData: RawData = {};
  private simpleQueue = new Subject<QueueItem>();

  constructor() {
    this.simpleQueue
      .pipe(
        mergeMap(async (_value) => {
          if (_value) {
            const sleepTime = Math.round(Math.random() * 8) * 1000;
            await sleep(sleepTime);
            console.log(`Output order: ${_value.timestamp}`);
          }
        }, 1),
      )
      .subscribe();
  }

  async addQueueItem(item: QueueItem): Promise<void> {
    const sleepTime = Math.round(Math.random() * 8) * 1000;
    await sleep(sleepTime);
    console.log(`Input order: ${item.timestamp}`);
    this.simpleQueue.next(item);
  }

  async updateData(input: InputData, rawData: RawData): Promise<RawData> {
    return {};
  }
}

function sleep(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}
