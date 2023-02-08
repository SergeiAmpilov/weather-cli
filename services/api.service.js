import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';


const getWeather = async () => {

  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  const lat = await getKeyValue(TOKEN_DICTIONARY.lat);
  const lon = await getKeyValue(TOKEN_DICTIONARY.long);

  console.log(`lat - lobg - ${lat} - ${lon}`);

  if (!token) {
    throw new Error('Token not found. Set API token with commant -t [API_KEY]');
  }

  if (!lat) {
    throw new Error('Latitude not found. Set latitude API with commant -lat [Latitude]');
  }

  if (!lon) {
    throw new Error('Long not found. Set long API with commant -lon [long]');
  }

  /* https://yandex.ru/dev/weather/doc/dg/concepts/forecast-info.html */
  const { data } = await axios({
    method: 'get',
    baseURL: 'https://api.weather.yandex.ru/v2/forecast',
    params: {
      lang: 'ru_RU',
      // lat: 55.75396,
      // long: 37.620393
      lat: lat,
      long: lon,
    },
    headers: {
      "X-Yandex-API-Key": token
    }
  });

  return data;

};

export { getWeather };