import { test, expect } from '@playwright/test';
import { success } from '../test-data/status-codes.json';
import { data, support } from '../test-data/user.json';
import { getUser } from '../test-data/endpoints.json';

test.describe('GET user', {
    tag: ['@api', '@get', '@getuser']
}, () => {
    test('verify response code', async ({ request }) => {
        const response = await request.get(getUser.url);
        expect(response.status()).toBe(success.ok);
    });
    test('verify user id', async ({ request }) => {
        const response = await request.get(getUser.url);
        const resBody = await response.json();
        expect(resBody.data.id).toBe(data.id);
    });
    test('verify user data', async ({ request }) => {
        const response = await request.get(getUser.url);
        const resBody = await response.json();
        expect(resBody.data.email).toEqual(data.email);
        expect(resBody.data.first_name).toEqual(data.first_name);
        expect(resBody.data.last_name).toEqual(data.last_name);
        expect(resBody.data.avatar).toEqual(data.avatar);
        console.log(resBody);
    });
    test('verify support details', async ({ request }) => {
        const response = await request.get(getUser.url);
        const resBody = await response.json();
        expect(resBody.support.url).toEqual(support.url);
        expect(resBody.support.text).toEqual(support.text);
        console.log(resBody);
    });
});