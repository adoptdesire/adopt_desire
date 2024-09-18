import dotenv from 'dotenv';
import { resolve } from 'path';
import PROCESS from './env-constant';
import { ENodeEnvTypes } from '../enum/enum';

const CURRENT_DIRECTORY: string = __dirname;

if (!PROCESS.env['NODE_ENV']) PROCESS.env['NODE_ENV'] = ENodeEnvTypes.LOCAL;

dotenv.config({
  path: resolve(
    CURRENT_DIRECTORY,
    `../../environment/${PROCESS.env['NODE_ENV'].toLowerCase() || ENodeEnvTypes.LOCAL.toLowerCase()}.env`,
  ),
});

export {};
