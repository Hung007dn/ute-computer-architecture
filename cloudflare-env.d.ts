declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    DOCUMENTS?: KVNamespace;
    ADMIN_UPLOAD_KEY?: string;
  }
}
