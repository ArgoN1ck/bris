import { PrismaClientConfig } from '@bris/prisma/server';

import * as env from 'env-var';

export const prismaClientConfig: PrismaClientConfig = {
  databaseUrl: env.get('PSQL_URL').required().asString(),
  logging: 'long_queries',
  maxQueryExecutionTime: 5000,
};
