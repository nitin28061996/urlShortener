import axios from "axios";
export const createShortUrl = obj => {
  const requestUrl = "http://localhost:3200/api/url/shorten";
//  return axios.post(requestUrl, {longUrl: "https://github.com/muhzi4u/URL-Shortner/blob/master/client/src/components/landing/Landing.js"});
  return axios.post(requestUrl, obj);
};

export const getAllUrls = obj => {
  const requestUrl = "http://localhost:3200/";
//  return axios.post(requestUrl, {longUrl: "https://github.com/muhzi4u/URL-Shortner/blob/master/client/src/components/landing/Landing.js"});
  return axios.get(requestUrl);
};