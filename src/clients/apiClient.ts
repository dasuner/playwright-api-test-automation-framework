import { request, APIRequestContext } from '@playwright/test';
import { AuthManager } from '../auth/authManager';
import { logger } from '../utils/logger';
//API client layer to abstract API calls and provide reusable methods for making requests to the API. It encapsulates the request context and provides methods for making GET and POST requests, allowing tests to interact with the API in a more structured and maintainable way.
//encapsulate request context and provide methods for making API calls

export class ApiClient {
    private apiRequestContext: APIRequestContext;

    async init(baseURL: string, {
        Authorization,
        headers = {}
    }: {
        Authorization?: string;
        headers?: Record<string, string>;
    } = {}) {
        const authToken = Authorization ?? await AuthManager.getToken();

        this.apiRequestContext = await request.newContext({
            baseURL,
            extraHTTPHeaders: {
                Authorization: authToken,
                ...headers
            }
        });
    }

    async get(uri: string) {
        logger.http(`GET → ${uri}`);

        try {
            const response = await this.apiRequestContext.get(uri);
            const responseBody = await response.text();
            logger.http(`GET ← ${uri}: ${response.status()}`);
            logger.verbose(`Response Body → ${responseBody}`);
            if (!response.ok()) {
                logger.error(`GET request to ${uri} failed with status ${response.status()}`);
            }
            return response;
        } catch (error) {
            logger.error(`API Failure → ${uri}`, error);
            throw error;
        }

    }

    async post(uri: string, data: object) {
        logger.http(`POST → ${uri}`);
        logger.debug(`Payload → ${JSON.stringify(data)}`);

        try {
            const response = await this.apiRequestContext.post(uri, {
                data
            });
            const responseBody = await response.text();
            logger.http(`POST ← ${uri}: ${response.status()}`);
            logger.verbose(`Response Body → ${responseBody}`);
            if (!response.ok()) {
                logger.error(`POST request to ${uri} failed with status ${response.status()}`);
            }

            return response;
        } catch (error) {
            logger.error(`API Failure → ${uri}`, error);
            throw error;
        }


    }
}

