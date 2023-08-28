enum Ordering {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type ApiParams = {
  page?: number;
  page_size?: number;
  search?: string;
};

export type ResponseMeta = {
  count: number;
  hasNext: boolean;
  hasPrevious: boolean;
  page: number;
  page_count: number;
  page_size: number;
};

export type DefaultResponse<T> = {
  meta: ResponseMeta;
  results: T[];
};

export type ItemTitleValue<T = string | number> = {
  title: string;
  value: T;
};
