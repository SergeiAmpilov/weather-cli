import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (err) => {
  console.log( chalk.bgRed('Error') + ' ' + err);
}

const printSuccess = (msg) => {
  console.log( chalk.bgGreen('SUCCESS') + ' ' + msg);
}

const printHelp = () => {
  console.log(dedent(
      `${chalk.bgYellow.bold('HELP')}
      Without parameters - just show weather
      ${chalk.bold('-s')} [CITTY] to set city parametr
      ${chalk.bold('-h')} help
      ${chalk.bold('-t')} [API_KEY] to save api key`
  ));
}

export {
  printError,
  printSuccess,
  printHelp,
};