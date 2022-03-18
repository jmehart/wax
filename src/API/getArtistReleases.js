
//import { stringify } from "qs";

import { config } from "./config";

/**
 * get the releases for the associated artist to the id
 * @param {String} releaseId
 
 */

///releases/{release_id}{?curr_abbr}

 //const token = "eneTroyZTJqkInHoaoQsaDRyOHMQXqQHzeeylAgr";

export const getArtistReleases = async (releaseId) => {
  const { consumerKey, secretKey, baseUri } = config;



  const uri = `${baseUri}/releases/${releaseId}`;
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