import { test, expect } from '@playwright/test';

test.describe('GET users', {
    tag: ['@api', '@get', '@getusers']
}, () => {
    test('verify response code',async({request})=>{
        const response = await request.get('https://reqres.in/api/users?page=2');
        expect(response.status()).toBe(200);
    });
    test('verify page id',async({request})=>{
        const response = await request.get('https://reqres.in/api/users?page=2');
        const resBody = await response.json();
        expect(resBody.page).toBe(2);
    });
    test('verify data',async({request})=>{
        const response = await request.get('https://reqres.in/api/users?page=2');
        const resBody = await response.json();
        expect(resBody.data[0].id).toBe(7);
        expect(resBody.data[0].email).toEqual('michael.lawson@reqres.in');
        expect(resBody.data[0].first_name).toEqual('Michael');
        expect(resBody.data[0].last_name).toEqual('Lawson');
        console.log(resBody);
    });      
});