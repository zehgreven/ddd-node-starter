import { Pagination } from './Pagination';

export interface IBaseCrudRepository<TEntity> {
  /**
   * @param {Pagination} pagination
   * @returns {Promise<[TEntity[] , number]>}
   */
  all(pagination: Pagination): Promise<[TEntity[], number]>;

  /**
   * @param {TEntity} entity
   */
  save(entity: TEntity): Promise<TEntity>;

  /**
   * @param {string} id
   * @returns {Promise<TEntity>}
   */
  byId(id: string): Promise<TEntity>;
}
