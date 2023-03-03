export function applySoftDeleteMiddleware<
  T extends { $use: (...args) => void },
  P = any
>(service: T, client: P) {
  service.$use(async (params, next) => {
    const modelName = params.model;
    if (
      modelName !== undefined &&
      modelName !== 'migrations' &&
      client[`${modelName}ScalarFieldEnum`]?.deletedAt
    ) {
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        params.action = 'findFirst';
        params.args.where['deletedAt'] = null;
      }
      if (
        params.action === 'findFirstOrThrow' ||
        params.action === 'findUniqueOrThrow'
      ) {
        params.action = 'findFirstOrThrow';
        params.args.where['deletedAt'] = null;
      }
      if (params.action === 'findMany') {
        if (params.args.where) {
          if (params.args.where['deletedAt'] === undefined) {
            params.args.where['deletedAt'] = null;
          }
        } else {
          params.args.where = { deletedAt: null };
        }
      }
      // todo: нужно написать условие если в include прописат true, отловить, и заменить на {where: {deletedAt: null}}
      if (params.args.include) {
        for (const key of Object.keys(params.args.include)) {
          if (key !== '_count') {
            if (typeof params.args.include[key] !== 'boolean') {
              if (
                params.args.include[key].where &&
                params.args.include[key].where['deletedAt'] === undefined
              ) {
                params.args.include[key].where['deletedAt'] = null;
              }
            }
          }
        }
      }
    }
    return await next(params);
  });

  service.$use(async (params, next) => {
    const modelName = params.model;
    if (
      modelName !== undefined &&
      modelName !== 'migrations' &&
      client[`${modelName}ScalarFieldEnum`]?.deletedAt
    ) {
      if (params.action === 'update') {
        params.action = 'updateMany';
      }
      if (params.action === 'updateMany') {
        if (
          !params.args.data.length &&
          client[`${modelName}ScalarFieldEnum`].updatedAt
        ) {
          params.args.data.updatedAt = new Date();

          params.args.where.deletedAt = null;
        } else if (client[`${modelName}ScalarFieldEnum`].updatedAt) {
          params.args.data = params.args.data.map((row: any) => {
            row.updatedAt = new Date();

            return row;
          });
        }

        if (params.args.where !== undefined) {
          params.args.where['deletedAt'] = null;
        } else {
          params.args.where = { deletedAt: null };
        }
      }
      if (params.args.include) {
        for (const key of Object.keys(params.args.include)) {
          if (key !== '_count') {
            if (
              params.args.include[key].where &&
              typeof params.args.include[key] !== 'boolean'
            ) {
              if (params.args.include[key].where['deletedAt'] === undefined) {
                params.args.include[key].where['deletedAt'] = null;
              }
            }
          }
        }
      }
    }
    return await next(params);
  });

  service.$use(async (params, next) => {
    const modelName = params.model;
    if (
      modelName !== undefined &&
      modelName !== 'migrations' &&
      client[`${modelName}ScalarFieldEnum`]?.deletedAt
    ) {
      if (params.action === 'delete') {
        params.action = 'update';
        params.args.data = { deletedAt: new Date() };
      }
      if (params.action === 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data !== undefined) {
          params.args.data['deletedAt'] = new Date();
          params.args.where['deletedAt'] = null;
        } else {
          params.args.data = { deletedAt: new Date() };
          params.args.where['deletedAt'] = null;
        }
      }
      if (params.args.include) {
        for (const key of Object.keys(params.args.include)) {
          if (key !== '_count') {
            if (typeof params.args.include[key] !== 'boolean') {
              if (
                params.args.include[key].where &&
                params.args.include[key].where['deletedAt'] === undefined
              ) {
                params.args.include[key].where['deletedAt'] = null;
              }
            }
          }
        }
      }
    }
    return await next(params);
  });
}
