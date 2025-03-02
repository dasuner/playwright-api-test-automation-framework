import { test, expect } from '@playwright/test';
import { users, page } from '../test-data/users.json';
import { success } from '../test-data/status-codes.json';
import { getUsers } from '../test-data/endpoints.json';

test.describe('GET users', {
    tag: ['@api', '@get', '@getusers']
}, () => {
    test('verify response code', async ({ request }) => {
        const response = await request.get(getUsers.url);
        expect(response.status()).toBe(success.ok);
    });
    test('verify page id', async ({ request }) => {
        const response = await request.get(getUsers.url);
        const resBody = await response.json();
        expect(resBody.page).toBe(page.id);
    });
    test('verify data', async ({ request }) => {
        const response = await request.get(getUsers.url);
        const resBody = await response.json();
        expect(resBody.data[0].id).toBe(users.id);
        expect(resBody.data[0].email).toEqual(users.email);
        expect(resBody.data[0].first_name).toEqual(users.first_name);
        expect(resBody.data[0].last_name).toEqual(users.last_name);
        console.log(resBody);
    });
});