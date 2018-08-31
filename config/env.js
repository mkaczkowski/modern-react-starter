/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import dotenvExpand from 'dotenv-expand';
import { config } from 'dotenv';

const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

function getClientEnvironment(env, publicUrl) {
  const dotenvFiles = [
    path.resolve(`.env.${env}.local`),
    path.resolve(`.env.${env}`),
    env !== 'test' && path.resolve('.env.local'),
    path.resolve('.env'),
  ].filter(Boolean);

  // Load environment variables from .env* files. Suppress warnings using silent
  dotenvFiles.forEach((dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
      dotenvExpand(
        config({
          path: dotenvFile,
        })
      );
    }
  });

  const raw = Object.keys(process.env).reduce(
    (envObject, key) => {
      // eslint-disable-next-line no-param-reassign
      envObject[key] = process.env[key];
      return envObject;
    },
    {
      ...{
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: env,
        PUBLIC_URL: publicUrl,
      },
    }
  );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((envObject, key) => {
      // eslint-disable-next-line no-param-reassign
      envObject[key] = JSON.stringify(raw[key]);
      return envObject;
    }, {}),
  };

  return { raw, stringified };
}

export default getClientEnvironment;
