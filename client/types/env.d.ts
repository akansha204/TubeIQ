// env.d.ts
namespace NodeJS {
    interface ProcessEnv {
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        DATABASE_URL: string;
        NEXTAUTH_URL: string;
        NEXTAUTH_SECRET: string;
        JWT_USER_SECRET: string;
        GMAIL_APP_PASSWORD: string;
        GMAIL_USER: string;
    }
}
