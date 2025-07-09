/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** API server URL */
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
