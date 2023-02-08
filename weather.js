#!/usr/bin/env node

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

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.s) {
    saveKeyValue('city', args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  getWeather('moscow');
  
}


initCLI();