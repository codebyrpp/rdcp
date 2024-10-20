# Research Data Collector Platform

## Description

This project is a web application that allows users to collect data from research participants. The application is designed to be used by researchers who are conducting studies that require data collection from participants. The application provides a platform for researchers to create surveys, distribute them to participants, and collect and analyze the data.

## Installation

To install and start the application, follow these steps:

1. Clone the repository to your local machine.
2. Create a `.env.development` file in the root directory of the project. You can use the `.env.sample` file as a template.
3. Install the required dependencies by running `yarn` in the root directory of the project.
4. Start the application by running `yarn dev` in the root directory of the project.

**Note**: It is recommended to use Yarn as the package manager for this project. If you do not have Yarn installed, you can install it by running
`npm install --global yarn`. If you accidentally use npm to install the dependencies, you may encounter issues when running the application. To fix this, delete the `node_modules` directory, 
`package-lock.json` and run `yarn` to install the dependencies using Yarn.


## E2E Testing
E2E tests are written using Cypress.
To run the end-to-end tests, follow these steps:
1. Start the application by running `yarn dev` in the root directory of the project.
2. Run `yarn cypress open` in the root directory of the project.
3. Click on the test file you want to run in the Cypress window that opens.
4. The test will run in a new browser window.