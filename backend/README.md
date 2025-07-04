# Research Data Collector Platform 

## Pre-requisites
- **Node.js**: Ensure you have the Node v20 LTS version installed.
- **Yarn**: Used for dependency management.
- **Docker**: Required for containerizing the application.
- **Docker Compose**: Orchestrates multi-container Docker applications.

## Setup
- Clone the repository
- Create a `.env` file in the root directory of the project. You can use the `.env.template` file as a template.
- Run `yarn install` to install the dependencies
- Run `docker-compose up` to start the database and redis server
- Run `yarn start:dev` to start the application in development watch mode

### To run the application in production mode locally
- Run `docker compose -f compose.yml -f compose.app.yml up -d` to start the application in production mode

## Useful Commands

### Installation

```bash
$ yarn install
```

**Note**: It is recommended to use Yarn as the package manager for this project. If you do not have Yarn installed, you can install it by running
`npm install --global yarn`. If you accidentally use npm to install the dependencies, you may encounter issues when running the application. To fix this, delete the `node_modules` directory, 
`package-lock.json` and run `yarn` to install the dependencies using Yarn.

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Test


#### Unit tests
The unit tests files are named `*.spec.ts` and are located in the same directory as the service being tested. The tests are run using the `jest` testing framework.

```bash
# unit tests
$ yarn run test
```

#### End-to-end tests
The end to end tests the API endpoints. It uses the `supertest` library to make requests to the API endpoints and check the responses. The tests are written in the `test/e2e` directory. An In-Memory MongoDB database is created and seeded with test users before the tests are run. The test database is destroyed after the tests are run.

```bash
# e2e tests
$ yarn run test:e2e
```

#### Test coverage
```bash
# test coverage
$ yarn run test:cov
```
