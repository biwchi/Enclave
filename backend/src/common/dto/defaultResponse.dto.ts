import { DefaultMetaResponse } from './defaultMetaResponse.dto';

export class DefaultResponse<T> {
  readonly meta: DefaultMetaResponse;

  readonly results: T[];

  constructor(results: T[], meta: DefaultMetaResponse) {
    this.meta = meta;
    this.results = results;
  }
}
