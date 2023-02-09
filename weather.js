#!/usr/bin/env node
import chalk from 'chalk';
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import { printError, printSuccess, printHelp } from "./services/log.service.js";
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

const saveLat = async (lat) => {
  try {
    await saveKeyValue(TOKEN_DICTIONARY.lat, lat);
    printSuccess('Latitude is saved')
  } catch (e) {
    printError(e.message)
  }
}

const saveLon = async (lon) => {
  try {
    await saveKeyValue(TOKEN_DICTIONARY.long, lon);
    printSuccess('Long is saved')
  } catch (e) {
    printError(e.message)
  }
}

const beautifyText = (weatherData) => {
  
  let messageBeauty = '' ;

  messageBeauty += chalk.green('Температура воздуха: ') + weatherData?.temp + '\t' ;
  messageBeauty += chalk.green('Ощущается как: ') + weatherData?.feels_like + '\n';
  messageBeauty += chalk.yellow('Скорость ветра: ') + weatherData?.wind_speed + ' м/с \n';
  messageBeauty += chalk.blue('Влажность: ') + weatherData?.humidity + ' % \n';

  return messageBeauty;
}


const getForecast = async () => {
  try {
    const weatherData = await getWeather();
    console.log(beautifyText(weatherData.fact));
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

  /* deprecated */
  // if (args.s) {
  //   saveKeyValue('city', args.s);
  // }

  if (args.lat) {
    return saveLat(args.lat);
  }

  if (args.lon) {
    return saveLon(args.lon);
  }

  if (args.t) {
    return saveToken(args.t);
  }  

  getForecast();
}


initCLI();