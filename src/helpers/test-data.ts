import { faker } from '@faker-js/faker';

export const userFactory = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email()
});