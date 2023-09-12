import { DefaultQuery } from './defaultQuery.dto';

type DefaultMetaResponseParams = {
  defaultQuery: DefaultQuery;
  itemCount: number;
};

export class DefaultMetaResponse {
  readonly count: number;

  readonly page_size: number;

  readonly page: number;

  readonly page_count: number;

  readonly hasNext: boolean;

  readonly hasPrevious: boolean;

  constructor({ defaultQuery, itemCount }: DefaultMetaResponseParams) {
    this.count = itemCount;
    this.page_size = defaultQuery.page_size;
    this.page = defaultQuery.page;
    this.page_count = Math.ceil(this.count / this.page_size);
    this.hasPrevious = this.page > 1;
    this.hasNext = this.page < this.page_count;
  }
}
