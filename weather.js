#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";

const initCLI = () => {
  console.log('started weather cli');
  const args = getArgs(process.argv);
  console.log(args);
  if (args.h) {
    // view help
  }

  if (args.s) {
    //save city
  }

  if (args.t) {
    // save token
  }

  // show weather
}


initCLI();