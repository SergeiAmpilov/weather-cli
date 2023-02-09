import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
  if (!icon) {
    return '';
  }

  switch (icon.slice(0, -1)) {
    case '01':
      return '☀';
    case '02':
      return '☀';
    case '03':
      return '☀ ☁';
    case '04':
      return '☁';
    case '09':
      return '☔ ☁';
    case '10':
      return '☔';
    case '11':
      return '☁ ❆';
    case '13':
      return '❆';        
    case '50':
      return '❆';  
  }
};

const getWeather = async () => {

  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);

  if (!token) {
    throw new Error('Token not found. Set API token with commant -t [API_KEY]');
  }

  if (!city) {
    throw new Error('Long not found. Set long API with commant -s [long]');
  }

  const { data } = await axios({
    method: 'get',
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
      lang: 'ru',
      q: city,
      appid: token,
      units: 'metric',
    }
  });

  return data;

};

export { getWeather, getIcon };