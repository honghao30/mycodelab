import { apiInstance } from '../index.js';
const api = apiInstance();

function getData(url, param, success, fail) {
  api.get(`${url}`,`${param}`).then(success).catch(fail);
}
function postData(url, param, success, fail) {
  api.post(`${url},${param}`).then(success).catch(fail);
}
export { getData, postData };