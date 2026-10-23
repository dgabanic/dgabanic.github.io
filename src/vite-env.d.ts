/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GIST_ID?: string;
  readonly VITE_GIST_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
