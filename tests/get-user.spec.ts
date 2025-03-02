import { test, expect } from '@playwright/test';

test.describe('GET user', {
    tag: ['@api', '@get', '@getuser']
}, () => {
    test('verify response code',async({request})=>{
        const response = await request.get('/api/users/2');
        expect(response.status()).toBe(200);
    });
    test('verify user id',async({request})=>{
        const response = await request.get('/api/users/2');
        const resBody = await response.json();
        expect(resBody.data.id).toBe(2);
    });
    test('verify user data',async({request})=>{
        const response = await request.get('/api/users/2');
        const resBody = await response.json();
        expect(resBody.data.email).toEqual('janet.weaver@reqres.in');
        expect(resBody.data.first_name).toEqual('Janet');
        expect(resBody.data.last_name).toEqual('Weaver');
        expect(resBody.data.avatar).toEqual('https://reqres.in/img/faces/2-image.jpg');
        console.log(resBody);
    });
    test('verify support details',async({request})=>{
        const response = await request.get('/api/users/2');
        const resBody = await response.json();
        expect(resBody.support.url).toEqual('https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral');
        expect(resBody.support.text).toEqual('Tired of writing endless social media content? Let Content Caddy generate it for you.');
        console.log(resBody);
    });          
});