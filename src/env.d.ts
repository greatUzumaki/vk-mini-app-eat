/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_TOKEN: string;
  readonly VITE_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
