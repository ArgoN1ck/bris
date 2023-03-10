export interface IBaseRepository<T = any> {
  create(...params): Promise<T>;
  update(...params): Promise<T>;
  delete(...params): Promise<T>;
  findMany(...params): Promise<T[]>;
  findOne(...params): Promise<T>;
}
