import { ApiClient } from '../clients/apiClient';
//Service layer to handle user-related API interactions. It uses the ApiClient to make requests to the user endpoints, providing methods for common user operations such as fetching user details and creating new users. This layer abstracts the API calls and allows tests to interact with user-related functionality in a more organized way.
import { ENV } from '../../config/env';


export class UserService {
    constructor(private apiClient: ApiClient) { }

    async createToken(payload: object) {
        return this.apiClient.post(`${ENV.BASE_URL}/auth`, payload);
    }

    async getBookingDetails(bookingId: number) {
        return this.apiClient.get(`${ENV.BASE_URL}/booking/${bookingId}`);
    }
}
