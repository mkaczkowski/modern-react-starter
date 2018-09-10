// @flow
import queryString from 'qs';

export const getUrlWithParams = (url: any, params: Object) => {
  if (!url) throw new Error('url is not specified!');
  return `${url}${queryString.stringify(params, { sort: false })}`;
};
