import { test as base } from '@playwright/test';
import { ApiClient } from '../src/clients/apiClient';
import { UserService } from '../src/services/userService';

// Define a custom test fixture that initializes the ApiClient and UserService before each test. This allows us to reuse the ApiClient and UserService across multiple tests without having to initialize them in each test file.

const test = base.extend({
    apiClient: async ({}, use) => {
        const apiClient = new ApiClient();
        await apiClient.init('', {
            'Content-Type': 'application/json'
        });
        await use(apiClient);
    },
    userService: async ({ apiClient }, use) => {
        const userService = new UserService(apiClient);
        await use(userService);
    }
});

export { test };
export const expect = base.expect;