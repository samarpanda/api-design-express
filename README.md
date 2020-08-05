# API Design 
> [express](https://expressjs.com/) & [mongodb](https://www.mongodb.com/) as datastore

## Start the application 

1. Start mongodb
1. Run `yarn start` This starts the API

## Running mongodb local to this project

1. Create a `db` directory in this project. 
1. Change directory to that `cd db`
1. Run command `mongod --dbpath .`
1. This starts the mongodb within the `db` directory

## Misc commands

1. Check if mongo is running `ps aux | grep -v grep | grep mongod`
1. Install mongodb community version using brew i.e `brew install mongodb-community`
1. Stop mongodb community version if started globally `brew services stop mongodb-community`
1. Start mongodb community version `brew services start mongodb-community`