import { test, expect } from '../fixtures/baseFixture';
import { logger } from '../src/utils/logger';
import { ENV } from '../config/env';

// Notice we destructure `userService` (fixture key) rather than trying to use Playwright core fixture key.

test('sample test', async ({ userService }) => {
    logger.info('Test started: Authenticate User');
    const response = await userService.createToken({ username: ENV.TOKEN_USERNAME, password: ENV.TOKEN_PASSWORD });
    logger.debug(`Status received: ${response.status()}`);

    if (response.status() !== 200) {
        logger.error('Test failed: Unexpected status');
    }
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
    console.log(responseBody)
    logger.info('Test completed successfully');
});