# CATODO

A simple TODO API using NodeJS + MongoDB.

# Quick Start with Docker/Podman

If you have Docker with docker-compose a quick demo environment of the
application can be spun up using the command:

```
docker-compose up -d --build
```

Please ensure that TCP ports 5000 and 27017 are available on your machine.
The API should be available on http://localhost:5000. This file has also been
tested with podman/podman-compose.

# Dev Environment Setup

To setup the application locally, ensure that you have NojeJS v.14.xx.xx and a
MongoDB instance. You may then use the template.env file to create your own
.env file with the necessary information for connecting to the database and
allocating a TCP port. Leave as-is any values you want to use the default of.

Then, simply run `npm install` to install dependencies and `npm run watch` to
start in dev mode.

# NPM Scripts

The following NPM scripts are available for this application:

  - `npm test` Run all jest tests.
  - `npm run build` Transpile the application to vanilla JS. Build is deposited in the dist folder.
  - `npm run watch` Run the application in dev mode with ts-node and nodemon.
  - `npm start` Run the application in production mode (must build first).
  - `npm run lint` Run eslint on the project.
  - `npm run commit` Run commitizen for standard commit messages.
  - `npm run spec` Render the spec.yaml file into a json suitable for rendering by the server. Plese run this before commiting any changes to spec.yaml.

# Documentation

This API is documented using the OpenAPI 3.0.0 spec (formely known as Swagger).
The documentation is found on the spec.yaml file at the root of the project.
Alternatively, you can view an interactive rendering of the documentation by
navigating to http://localhost:5000/documentation from a web browser.
