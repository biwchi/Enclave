import { Ordering } from '../constant/Ordering';
import { DefaultQuery } from './defaultQuery.dto';

type DefaultMetaResponseParams = {
  defaultQuery: DefaultQuery
  itemCount: number
}

export class DefaultMetaResponse {
  readonly count: number;

  readonly page_size: number;

  readonly page: number;

  readonly hasNext: boolean;

  readonly hasPrevious: boolean;

  constructor({ defaultQuery, itemCount }: DefaultMetaResponseParams ) {
    this.count = itemCount,
    this.page_size = defaultQuery.page_size
    this.page = defaultQuery.page,
    this.hasNext = this.page > 1
    this.hasPrevious = this.page < Math.ceil(itemCount / this.page_size)
  };
}
