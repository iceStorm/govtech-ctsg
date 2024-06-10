declare namespace NodeJS {
  interface ProcessEnv {
    DB_PORT: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_EMAIL: string;
  }
}
