/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CARCURO_COMPANY_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
