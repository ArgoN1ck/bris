export interface IBaseRepository<T = any> {
  create(...params: any[]): Promise<T>;
  update(...params: any[]): Promise<T>;
  delete(...params: any[]): Promise<T>;
  findMany(...params: any[]): Promise<T[]>;
  findOne(...params: any[]): Promise<T>;
}
