import { ENodeEnvTypes } from '../enum/enum';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      HOST: string;
      NODE_ENV: ENodeEnvTypes;
      PORT: number;
    }
  }
}

export {};
