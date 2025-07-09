/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API server URL */
  VITE_API_URL: string;

  /** Default production hostname */
  VITE_PRODUCTION_HOSTNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
