import fetch from 'isomorphic-fetch';
import { apiUrl, checkResponse } from '../services/apiUrl';

/**
 * Function to fetch cases based on region
 * @param country
 * @returns {*}
 */
export function getCases(country) {
  let url = `${apiUrl()}/cases`;

  if (country)
    url += `?country=${country}`;

  return fetch(url, {
    method     : 'POST',
    headers    : {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }).then(checkResponse);
}
