import * as winston from 'winston';

const LOGGER = winston.createLogger({
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

export default LOGGER;
