import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { Prisma, PrismaClient } from '@prisma/client';
import { applySoftDeleteMiddleware } from './middlewares/soft-delete.middleware';
import {
  PrismaClientConfig,
  PRISMA_CLIENT_CONFIG,
} from './prisma-client.config';

@Injectable()
export class PrismaClientService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  public static instance: PrismaClientService;

  private logger = new Logger(PrismaClientService.name);

  constructor(@Inject(PRISMA_CLIENT_CONFIG) config: PrismaClientConfig) {
    super({
      datasources: {
        db: {
          url: config.databaseUrl,
        },
      },
    });
    PrismaClientService.instance = this;
    applySoftDeleteMiddleware(this, Prisma);
  }

  async onModuleInit() {
    try {
      this.logger.log('onModuleInit');
      await this.$connect();
    } catch (err) {
      this.logger.error(err, err.stack);
    }
  }

  async onModuleDestroy() {
    this.logger.log('onModuleDestroy');
    await this.$disconnect();
  }
}
