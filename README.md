# magical-tavern

Just a fun little SERN app for creating and managing d&d character sheets.

Postgres - Express - React - NodeJS

## Setup Instructions

* make sure you have postgres installed and running
* navigate to project root

* install yarn
> yarn

* install node_modules
> npm run reinstall 

* create the project database
> **createdb magical-tavern-db**

* run migrations
> up:: npm run migrate.dev.up
> down:: npm run migrate.dev.down

* start application
> npm run start