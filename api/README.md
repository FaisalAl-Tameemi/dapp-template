## TypeScript JSON API

A JSON API built with Typescript using ExpressJS, Sequelize, Postgres and Socket.IO


#### Requirements

* NodeJS (>= 12)
* Postgres (>= 9)
* Postman (_optional_)
* Docker Compose (_optional_)

#### Getting Started

This project can either be run directly on host machine (requires Node + Postgres) or can also be run via Docker Compose, 
which makes the development process much easier.

To use the first approach, simply make sure that a Postgres instance is running on your machine (whichever way you prefer), then
run the repo code by doing `yarn dev` after having installed the `npm` packages.

> Note: make sure to edit the `env.yaml` file with the correct configs for connecting to Postgres

See `/docker-compose.yml` for details on the second approach.


#### Folder Structure

Below is the tree structure of the repository, notes about certain files can be found below as well:

```
.
├── docker-compose.yml
├── env.yaml
├── jest.config.js
├── package.json
├── postman
│   ├── typescript-api.postman_environment.json
│   └── typescript_api.postman_collection.json
├── scripts
│   └── install_dependencies.sh
├── src
│   ├── api
│   │   ├── Thing
│   │   │   ├── Thing.api.events.ts
│   │   │   ├── Thing.api.test.ts
│   │   │   ├── Thing.api.ts
│   │   │   └── index.ts
│   │   ├── User
│   │   │   ├── User.api.events.ts
│   │   │   ├── User.api.test.ts
│   │   │   ├── User.api.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── config.ts
│   ├── db
│   │   ├── index.ts
│   │   ├── migrations
│   │   │   ├── 20190812000000-users.js
│   │   │   └── 20190812194755-create-things.js
│   │   ├── models
│   │   │   ├── Thing
│   │   │   │   ├── Thing.model.test.ts
│   │   │   │   └── Thing.model.ts
│   │   │   └── User
│   │   │       ├── User.model.test.ts
│   │   │       └── User.model.ts
│   │   ├── seeders
│   │   │   ├── 20190812205615-users.js
│   │   │   └── 20190812205616-things.js
│   │   └── sequelize.config.js
│   ├── middleware
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── typings
│   │   ├── IHigherOrderFunction
│   │   │   ├── IHigherOrderFunction.interface.ts
│   │   │   └── index.d.ts
│   │   ├── IResource
│   │   │   ├── IResource.interface.ts
│   │   │   └── index.d.ts
│   │   ├── ISocketManager
│   │   │   ├── ISocketManager.interface.ts
│   │   │   └── index.d.ts
│   │   └── ITypedEventEmitter
│   │       ├── ITypedEventEmitter.interface.ts
│   │       └── index.d.ts
│   └── util
│       ├── log.util.ts
│       └── response.util.ts
└── tsconfig.json
```

> **Notes**:
> * `/src/db`: contains all data models and DB connection, this folder can be taken out into its own package
>    * `/src/db/migrations`: migration files
>    * `/src/db/seeders`: db seed files for testing (sample data)
>    * `/src/db/models`: db model files using Sequelize + associated tests
> * `/src/api`: contains all API routes and handlers, it also contains an EventEmitter implementation for each service
> * `/src/typings`: contains interfaces and types used throughout the API
>    * This is especially useful for not doing interfaces inline within methods
>    * TypeScript makes this automatically accessible throughout the project without needing to specify the full path
> * `/src/util`: contains miscellaneous util files 
> * `/postman`: contains a collection and an environment file to be run as a Postman test suite
> * `env.yaml`: contains ENVIRONMENT vars which are then loaded into `/src/config.ts`
>    * Env vars set onto `process.env` will also be included in what `config.ts` reads/exports
> * `Thing` is simply an example of any arbitrary service/model to be built in the future


#### TODO

- [x] Add support for sockets via Socket.IO
- [x] Add support for internal events via EventEmitter
- [x] Add tests using Jest
- [x] Expand integration tests using PostmanBDD + Newman CLI
- [ ] Enable *unit* testing with Sequelize
    - Note: This task is more involved than it sounds
