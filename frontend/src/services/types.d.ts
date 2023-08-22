enum Ordering {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type ApiParams = {
  page: number;
  page_size: number;
  search: string;
  ordering: Ordering;
};
