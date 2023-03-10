import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '@bris/prisma/server';

@Injectable()
export class AppService {
  constructor(private prismaClient: PrismaClientService) {}
  getData() {
    return { status: 'OK' };
  }
}
