# INSTALL BASIC PACKAGES
```BASH
npm init
npm install express sequelize sequelize-cli
sequelize init
npx sequelize-cli init
npm install dotenv
npm install mariadb
```

# SET-UP ENVIRONMENT TO USE .env VARIABLES
1. Create .env file at the project root
2. Add file config/database.js
```JavaScript
const Sequelize = require("sequelize");

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const dbDialect = process.env.DB_DIALECT || 'mariadb';

const database = new Sequelize(dbDatabase, dbUser, dbPassword, {dialect:dbDialect,host:dbHost});

module.exports = database;
```
3. Include database file in index.js
```JavaScript
...
const database = require('./database');
...
database.authenticate()
.then(function(){
    console.log('DB CONNECTED SUCCESSFULLY');
})
.catch(function(error){
    console.log('DATABASE CONNECTION ERROR:',error);
})
...
```

# APP MODELS
```BASH
# TASKS:
sequelize-cli model:generate --name Tasks --attributes name:string,description:string,date_of_start:date,date_of_end:date,status:integer
# Goals:
sequelize-cli model:generate --name Goals --attributes name:string,description:string,date_of_start:date,date_of_end:date,status:integer
# Notes:
sequelize-cli model:generate --name Notes --attributes name:string,header:string,details:date,importance:integer
# Status
sequelize-cli model:generate --name Status --attributes name:string
```

# MIGRATIONS
1. Add ```timestamps:false``` to prevent fields CreatedAt and UpdatedAt when running migrations
2. Run migrations: ```sequelize-cli db:migrate```

