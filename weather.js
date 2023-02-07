#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printError, printSuccess, printHelp } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";


const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    // view help
    printHelp()
  }

  if (args.s) {
    //save city
    saveKeyValue('city', args.s);
  }

  if (args.t) {
    // save token
    saveKeyValue('token', args.t);

  }

  // show weather
}


initCLI();