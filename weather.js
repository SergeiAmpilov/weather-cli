#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import { printError, printSuccess, printHelp, printWeather } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";


const saveToken = async (token) => {
  if (!token.length) {
    printError('Empty token');
    return ;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token is saved')
  } catch (e) {
    printError(e.message)
  }

}

// const saveLat = async (lat) => {
//   try {
//     await saveKeyValue(TOKEN_DICTIONARY.lat, lat);
//     printSuccess('Latitude is saved')
//   } catch (e) {
//     printError(e.message)
//   }
// }

// const saveLon = async (lon) => {
//   try {
//     await saveKeyValue(TOKEN_DICTIONARY.long, lon);
//     printSuccess('Long is saved')
//   } catch (e) {
//     printError(e.message)
//   }
// }


const saveCity = async (city) => {
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City is saved')
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const weatherData = await getWeather();
    printWeather(weatherData, getIcon(weatherData?.weather[0].icon));
    // console.log(weatherData);
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('Incorrect data in request');
    } else if (e?.response?.status == 401) {
      printError('Incorrect token');
    } else {
      printError(e.message);
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
    return ;
  }

  if (args.s) {
    return saveCity(args.s);
  }

  /*
  if (args.lat) {
    return saveLat(args.lat);
  }

  if (args.lon) {
    return saveLon(args.lon);
  }
  */

  if (args.t) {
    return saveToken(args.t);
  }  

  getForecast();
}


initCLI();