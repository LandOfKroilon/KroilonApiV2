export interface BaseRepository<T> {
    findAll(): Promise<Array<T>>;
    findOne(conditions?: Object): Promise<T>;
    deleteMany(conditions?: Object): Promise<number>;
    create(doc: T): Promise<T>;
}