import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    BASE_URL: process.env.BASE_URL || 'https://restful-booker.herokuapp.com',
    TOKEN_USERNAME: process.env.TOKEN_USERNAME || 'admin',
    TOKEN_PASSWORD: process.env.TOKEN_PASSWORD || 'password123'
}