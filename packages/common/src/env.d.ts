declare namespace NodeJS {
  interface ProcessEnv {
    DEV_PLATFORM: 'DOCKER' | '';
    DB_PORT: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_EMAIL: string;

    JWT_SECRET: string;

    GOVAA_URL: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
