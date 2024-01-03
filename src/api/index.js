import axios from 'axios';
const url = '';
function apiInstance() {
  const instance = axios.create({
    url: url,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  return instance;
}

export { apiInstance };
