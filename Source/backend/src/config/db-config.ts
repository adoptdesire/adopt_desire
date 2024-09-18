export type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle';

interface IDbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  logging: boolean;
  port: number;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
  dialectOptions: {
    multipleStatements: boolean;
    keepAlive: boolean;
  };
  define: {
    timestamps: boolean;
  };
}

type DbConfigMap = {
  LOCAL: IDbConfig;
  DEVELOPMENT: IDbConfig;
  STAGING: IDbConfig;
  PRODUCTION: IDbConfig;
};

const DB_CONFIG: DbConfigMap = {
  LOCAL: {
    username: 'root',
    password: '12@server-root-password@12', //MyNewPass
    database: 'test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: true,
    dialectOptions: {
      multipleStatements: true,
      keepAlive: true,
    },
    define: {
      timestamps: true,
    },
  },
  DEVELOPMENT: {
    username: 'root',
    password: 'MyNewPass', //12@server-root-password@12
    database: 'test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: true,
    dialectOptions: {
      multipleStatements: true,
      keepAlive: true,
    },
    define: {
      timestamps: true,
    },
  },
  STAGING: {
    username: 'root',
    password: 'MyNewPass', //12@server-root-password@12
    database: 'test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: true,
    dialectOptions: {
      multipleStatements: true,
      keepAlive: true,
    },
    define: {
      timestamps: true,
    },
  },
  PRODUCTION: {
    username: 'root',
    password: 'MyNewPass', //12@server-root-password@12
    database: 'test',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: true,
    dialectOptions: {
      multipleStatements: true,
      keepAlive: true,
    },
    define: {
      timestamps: true,
    },
  },
};

export default DB_CONFIG;
