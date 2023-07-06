import { BaseCache } from '@service/redis/base.cache';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('redisConnection');
export class RedisConnection extends BaseCache {
  constructor() {
    super('redisConnection');
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      const res = await this.client.ping();
      console.log(res, 'redis');
    } catch (error) {
      log.error(error);
    }
  }
}

export const redisConnection: RedisConnection = new RedisConnection();
