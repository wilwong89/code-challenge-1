# Overview

The provided codebase is a simple MERN application called “Our Places”. A user can sign up to create a profile in the app. Once the profile is created, the user can log in and create a “Place” record under their own profile. A Place record includes a place title, a description, a picture and an address. Note that the address verification takes places via the call to the Google Maps API. The record owner can also edit their records (some fields) and delete their own records. Users can only see their own records and not the records created by other users.

## Env

In both backend/ and frontend/ folders, copy `.sample.env` into `.env`. In the `.env` file there will be environmental variables with placeholders. Fill them out as required, ask for assistance if required.

You will need to get a Google api token(GOOGLE_API_TOKEN) from https://developers.google.com/maps/documentation/embed/get-api-key, and put it in 2 places in this project. This API token allows verifying the address that user enters on the "Create a Place" form via the Google Maps verification service, and also allows the front-end to find and display the location on the map based on the geominfo that is stored in the db.

**You will need to include the mongodb address and the credential in the call to the API.**

This application utilizes a cloud mongodb database for its services. See https://www.mongodb.com/cloud for more details.

### Local Setup

#### DB

- This application support mongoDB, you can find schema in `/backend/models`.
- Before invoking the API, you will need to have a mongodb setup and provide its credential to `/backend/app.js` => mongoose connection
- You can find information about setting up MongoDB in [this documentation](https://hub.docker.com/_/mongo) in DockerHub and on the [MondoDB website](https://docs.cloudmanager.mongodb.com/tutorial/nav/manage-hosts/).
- Provide the mongodb links and credentals in the backend/ `.env` file.

#### api

- In terminal go to the backend folder `cd backend`
- install the dependency `npm install`

#### React front-end

- go to the backend folder `cd frontend`
- install the dependency `npm install`

### Local Startup

#### api

- In terminal go to the backend folder `cd backend`
- run `npm start`

#### React front-end

- In terminal go to the backend folder `cd frontend`
- run `npm start`

### Deployment setup

Setup the auto deployment pipeline with the following steps.

- Install [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
- Create account with heroku, set crendentials with heroku-cli.
- Make sure to be in repo root directory.

#### Deploy api

- Use the heroku client to config application, use the following commands (assuming github is used):
- `heroku create <your api name>`
- `heroku buildpacks:add -a <your api name> heroku/nodejs`
- `heroku buildpacks:add -a <your api name> https://github.com/lstoll/heroku-buildpack-monorepo -i 1`
- `heroku config:set -a <your api name> APP_BASE=/backend`
- `git remote add heroku-<your api name> https://git.heroku.com/<your api name>.git`
- To manually deploy, use the following command:
- `git push heroku-<your api name> main`

#### Deploy front-end

- Use the heroku client to config application, use the following commands (assuming github is used):
- `heroku create <your frontend name>`
- `heroku buildpacks:add -a <your frontend name> mars/create-react-app`
- `heroku buildpacks:add -a <your frontend name> https://github.com/lstoll/heroku-buildpack-monorepo -i 1`
- `heroku config:set -a <your frontend name> APP_BASE=/frontend`
- `git remote add heroku-<your frontend name> https://git.heroku.com/<your frontend name>.git`
- To manually deploy, use the following command:
- `git push heroku-<your frontend name> main`

#### Setup environment variables

- In heroku's dashboard, go to the respective frontend and backend apps.
- For each app, go to the settings tab.
- Find the `Config var` section and click `Reveal Config Vars`
- For each of backend and frontend, add one config var for each environmental variable for that app.
- Example: backend has "DB_NAME" and a value in `.env`, add into config vars.
- Redeployment is necessary for variables to take effect.

### Automated deployment

Follow heroku's instructions [here](https://devcenter.heroku.com/articles/pipelines) to set up pipelines.
Create a pipeline, then attach the previously created heroku projects from the first heroku commands of the deploy sections above.
