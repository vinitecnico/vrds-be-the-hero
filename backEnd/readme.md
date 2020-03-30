# Create tables

npx knex migrate:make create_ongs

npx knex migrate:make create_incidents

npx knex migrate:run 

# Create database

npx knex migrate:latest

# Run project

npm start