export const apiurl = 'https://restaurant-api.dicoding.dev';

export const apiEndpoint = {
  getAll: '/list',
  getDetail: '/detail',
  search: '/search?q=',
  review: '/review',
  imgLg: `${apiurl}/images/large`,
};

export const CONFIG = {
  DB_NAME: 'restaurant-db',
  DB_VERSION: 1,
  ONJECT_STORE_NAME: 'restaurant',
  CACHE_NAME: new Date().toISOString(),
};
