'use strict';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import * as SequelizeJS from 'sequelize';
import { ENodeEnvTypes } from '../enum/enum';
import path from 'path';
import fs from 'fs';
import PROCESS from '../config/env-constant';
import DB_CONFIG from '../config/db-config';
import LOGGER from '../logger/logger';

const CURRENT_DIRECTORY: string = __dirname;
const ENV: ENodeEnvTypes = (PROCESS.env['NODE_ENV'] as ENodeEnvTypes) || ENodeEnvTypes.LOCAL;
const DB_ENV_CONFIG = DB_CONFIG[ENV];

const SEQUELIZE = new Sequelize(<SequelizeOptions>{
  dialect: DB_ENV_CONFIG.dialect,
  username: DB_ENV_CONFIG.username,
  password: DB_ENV_CONFIG.password,
  host: DB_ENV_CONFIG.host,
  port: DB_ENV_CONFIG.port,
});

SEQUELIZE.authenticate()
  .then(async () => {
    await CHECK_CREATE_DATABASE();
    LOGGER.info('Authentication successful');
    await UPDATE_MODELS();
    SEQUELIZE.sync();
  })
  .catch((error: Error) => {
    LOGGER.error('Unable to connect to the database: ', error);
  });

const UPDATE_MODELS = async (): Promise<void> => {
  try {
    const MODEL_DIRECTORY = path.join(CURRENT_DIRECTORY, 'models');

    // Read all files in the models directory
    const MODEL_FILES = fs.readdirSync(MODEL_DIRECTORY);

    // Import all models dynamically
    MODEL_FILES.forEach(async (file) => {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
        const MODEL = await require(path.join(MODEL_DIRECTORY, file)).default;
        if (MODEL) {
          await MODEL.init(MODEL.attributes, { sequelize: SEQUELIZE, modelName: MODEL.name });
          LOGGER.info(`Model ${MODEL.name} imported successfully`);
        }
      }
    });
  } catch (error: unknown) {
    LOGGER.error('Update models error: ', error);
  }
};

const CHECK_CREATE_DATABASE = async (): Promise<void> => {
  try {
    const DB_EXISTS = `SHOW DATABASES LIKE '${DB_ENV_CONFIG.database}';`;
    const QUERY_RESULT = await SEQUELIZE.query(DB_EXISTS, { type: SequelizeJS.QueryTypes.SELECT, raw: true });
    if (QUERY_RESULT.length === 0) {
      LOGGER.info('DATABASE NOT EXIST!');
      const DB_CREATION_QUERY = `CREATE DATABASE IF NOT EXISTS ${DB_ENV_CONFIG.database}`;
      const DB_CREATED = await SEQUELIZE.query(DB_CREATION_QUERY, { type: SequelizeJS.QueryTypes.INSERT, raw: true });

      if (DB_CREATED.length > 0) {
        LOGGER.info('NEW DATABASE CREATED!');
        await USE_DATABASE();
      } else {
        LOGGER.error('DATABASE CREATION ERROR!');
      }
    } else {
      LOGGER.info('DATABASE EXIST!');
      await USE_DATABASE();
    }
  } catch (error: unknown) {
    LOGGER.error('Check and Create Database error: ', error);
  }
};

const USE_DATABASE = async (): Promise<void> => {
  try {
    const USE_DATABASE_QUERY = `USE ${DB_ENV_CONFIG.database};`;
    await SEQUELIZE.query(USE_DATABASE_QUERY);
    LOGGER.info(`DATABASE USED ${DB_ENV_CONFIG.database}!`);
  } catch (error: unknown) {
    LOGGER.error('Use Database error: ', error);
  }
};

export default SEQUELIZE;
