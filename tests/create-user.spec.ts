import { test, expect } from '@playwright/test';
import { success } from '../test-data/status-codes.json';
import { user1 } from '../test-data/createUser.json';
import { createUser } from '../test-data/endpoints.json';

test.describe('CREATE user', {
    tag: ['@api', '@post', '@createuser']
}, () => {
    test('verify response code', async ({ request }) => {
        const response = await request.post(createUser.url, {
            data: {
                "name": user1.name,
                "job": user1.job
            }
        });
        expect(response.status()).toBe(success.created);
        console.log(await response.json());
    });
    test('verify response body', async ({ request }) => {
        const response = await request.post(createUser.url, {
            data: {
                "name": user1.name,
                "job": user1.job
            }
        });
        const responseBody = await response.json();
        expect(responseBody.name).toEqual(user1.name);
        expect(responseBody.job).toEqual(user1.job);
    });
});