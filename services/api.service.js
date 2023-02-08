import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';


const getWeather = async () => {

  const token = await getKeyValue(TOKEN_DICTIONARY.token);

  if (!token) {
    throw new Error('Token not found. Set API token with commant -t [API_KEY]');
  }

  /* https://yandex.ru/dev/weather/doc/dg/concepts/forecast-info.html */
  const { data } = await axios({
    method: 'get',
    baseURL: 'https://api.weather.yandex.ru/v2/forecast',
    params: {
      lang: 'ru_RU',
      lat: 55.75396,
      long: 37.620393
    },
    headers: {
      "X-Yandex-API-Key": token
    }
  });

  return data;

};

export { getWeather };