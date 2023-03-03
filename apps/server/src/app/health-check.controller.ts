import { Controller, Get } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckController {
  @Get()
  async healthCheck() {
    return { status: 'OK' };
  }
}
