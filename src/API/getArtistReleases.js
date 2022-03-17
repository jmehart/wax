
import { stringify } from "qs";

import { config } from "./config";

/**
 * get the releases for the associated artist to the id
 * @param {String} artistId
 * @param {String} sort year | title | format
 * @param {String} sort_order asc | desc
 */
export const getArtistReleases = async (artistId, sort, sort_order) => {
  const { consumerKey, secretKey, baseUri } = config;

  const query = {
    sort,
    sort_order,
    pages: 1,
    per_page: 100
  };

  const uri = `${baseUri}/artists/${artistId}/releases?${stringify(query)}`;
  const headers = new Headers({
    Authorization: `Discogs key=${consumerKey}, secret=${secretKey}`
  });

  const response = await fetch(uri, {
    headers: headers
  })
    .then(async res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error(await res.json());
      }
    })
    .then(res => res)
    .catch(err => {
      debugger;
      console.error(err);
      return {};
    });

  return response;
};