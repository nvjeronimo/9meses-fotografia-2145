// O typecheck do mobile segue os tipos importados de @template/web e acaba a
// ler packages/web/src/api/*, que usa variáveis de ambiente de servidor.
// Estas declarações só existem para o tsc do mobile não falhar nesses ficheiros.
declare namespace NodeJS {
  interface ProcessEnv {
    BETTER_AUTH_SECRET?: string;
    DATABASE_URL?: string;
    DATABASE_AUTH_TOKEN?: string;
    S3_ENDPOINT?: string;
    S3_ACCESS_KEY_ID?: string;
    S3_SECRET_ACCESS_KEY?: string;
    S3_BUCKET?: string;
  }
}
