import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  PrismaClientConfig,
  PRISMA_CLIENT_CONFIG,
} from './prisma-client.config';
import { PrismaClientService } from './prisma-client.service';

@Global()
@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
export class PrismaClientModule {
  static forRoot(config: PrismaClientConfig): DynamicModule {
    return {
      module: PrismaClientModule,
      providers: [
        {
          provide: PRISMA_CLIENT_CONFIG,
          useValue: {
            ...config,
            databaseUrl: config.databaseUrl,
          },
        },
      ],
    };
  }
}
