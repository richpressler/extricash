import { Model, Document } from 'mongoose';
import '../database';

export interface FindOptions {
  orderBy: string;
}

export class DAL {
  protected static model: Model<Document, {}>;

  protected static mapId(result: Document | Document[]) {
    result = JSON.parse(JSON.stringify(result));
    if (!result) {
      return result;
    }

    if (result instanceof Array) {
      return (result as Document[]).map(doc => {
        doc.id = doc._id;
        return doc;
      });
    }

    const mappedResult = result as Document;
    mappedResult.id = mappedResult._id;
    return mappedResult;
  }

  public static async findById(id: string) {
    return await this.model
      .findById(id)
      .lean()
      .exec()
      .then(result => this.mapId(result));
  }

  public static async find(query: any, options: any = {}) {
    const mongoOptions = {
      sort: options.orderBy,
      limit: options.limit
    };
    return await this.model
      .find(query, null, mongoOptions)
      .lean()
      .exec()
      .then(result => this.mapId(result));
  }

  public static async findOne(query: any) {
    return await this.model
      .findOne(query)
      .lean()
      .exec()
      .then(result => {
        return this.mapId(result);
      });
  }

  public static async create(data) {
    data.createdDate = new Date().toISOString();
    return await this.model.create(data).then(createdUser => this.mapId(createdUser));
  }
}
