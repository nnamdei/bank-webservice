## Bank web service

- Run npm install
- change directory to src/db 
- Create an empty Postgres database table using PGAdmin4 
- setup .env file with required credentials
- update JWT_SECRET with random generated string of preferred length
- update the config.json file with database credentials in the development object.
- Run npx sequelize db:migrate or sequelize db:migrate
- change directory back to the main directory
- Run npm run start:dev
- Visit http://localhost:3000/docs to access swagger docs