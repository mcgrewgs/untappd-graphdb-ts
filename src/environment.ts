declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEO_DATABASE_TYPE: string;
            NEO_DATABASE_USER: string;
            NEO_DATABASE_PASSWORD: string;
            NEO_DATABASE_HOST: string;
            NEO_DATABASE_PORT: string;
            UNTAPPD_API_BASE_URL: string;
            UNTAPPD_API_CLIENT_ID: string;
            UNTAPPD_API_CLIENT_SECRET: string;
            UNTAPPD_API_CALL_CACHE_FILE: string;
            UNTAPPD_API_CALL_CACHE_TTL: string;
            UNTAPPD_DEFAULT_USERNAME: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
