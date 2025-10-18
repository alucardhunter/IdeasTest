/// <reference types="vite/client" />

// Project-specific type additions for import.meta.env
interface ImportMetaEnv {
  readonly VITE_API_BASE: string | undefined;
  // add other env vars you rely on here, for example:
  // readonly VITE_SENTRY_DSN: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
