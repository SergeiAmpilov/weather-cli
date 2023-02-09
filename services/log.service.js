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

const printWeather = (weatherData, icon) => {
  const resMessage = dedent(`
    ${chalk.bgYellow.bold('Погода')} в ${weatherData?.name}
    ${icon} ${weatherData.weather[0].description}
    ${chalk.green('Температура воздуха: ')} ${weatherData?.main?.temp}C (${chalk.green('ощущается как: ')} ${weatherData?.main?.feels_like}C)
    ${chalk.blue('Влажность: ')} ${weatherData?.main?.humidity}%
    ${chalk.yellow('Скорость ветра: ')} ${weatherData?.wind?.speed} м/с
    `);

  console.log(resMessage);
}

export {
  printError,
  printSuccess,
  printHelp,
  printWeather,
};