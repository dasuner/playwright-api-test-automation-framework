import {test,expect} from '@playwright/test';
import { ENV } from '../config/env';

test('create token', async ({request}) => {
    const response = await request.post('/auth',{
        headers:{
            'Content-Type':'application/json'
        },
        data:{
            "username": ENV.TOKEN_USERNAME,
            "password": ENV.TOKEN_PASSWORD
        }
    });
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('token');
});

test('get booking details', async ({request}) => {
    const response = await request.get('/booking/2');
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('firstname');
    expect(responseBody).toHaveProperty('lastname');
});