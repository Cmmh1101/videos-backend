import dotenv from 'dotenv'
dotenv.config();

export default {
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'videos-database',
    MONGO_USER: process.env.MONGO_USER ||  'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD ||  'admin',
    MONGO_HOST: process.env.MONGO_HOST ||  'localhost',
    PORT: 5000,

    SERVER_HOSTNAME: process.env.SERVER_HOSTNAME || 'localhost',
    SERVER_TOKEN_EXPIRETIME: process.env.SERVER_TOKEN_EXPIRETIME || '3600',
    SERVER_TOKEN_ISSUER: process.env.SERVER_HOSTNAME || 'coolIssuer',
    SERVER_TOKEN_SECRET: process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret',

}