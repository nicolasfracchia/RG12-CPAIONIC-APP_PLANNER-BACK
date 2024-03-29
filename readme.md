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
sequelize model:generate --name Tasks --attributes name:string,description:string,date_of_start:date,date_of_end:date,status:integer
# Goals:
sequelize model:generate --name Goals --attributes name:string,description:string,date_of_start:date,date_of_end:date,status:integer
# Notes:
sequelize model:generate --name Notes --attributes name:string,header:string,details:string,importance:integer
# Status
sequelize model:generate --name Status --attributes name:string
# Priorities
sequelize model:generate --name Priorities --attributes name:string
```

# MIGRATIONS
1. Add ```timestamps:false``` and delete fields "CreatedAt" and "UpdatedAt"
2. Run migrations: ```sequelize db:migrate```

# SEEDERS
1. Create seeders for each module:
```BASH
# STATUS
sequelize seed:generate --name status
# PRIORITIES
sequelize seed:generate --name priorities
# TASKS
sequelize seed:generate --name tasks
# GOALS
sequelize seed:generate --name goals
# NOTES
sequelize seed:generate --name notes
```
2. Set the information for each seed file:
3. Run seeders: ```sequelize db:seed:all```

# ASSOCIATING THE MODELS
1. Goals:
```JavaScript
...
static associate(models) {
    Goals.belongsTo(models.Status, {foreignKey:"status"})
}
...
```
2. Tasks:
```JavaScript
...
static associate(models) {
    Tasks.belongsTo(models.Status, {foreignKey:"status"})
}
...
```
3. Notes:
```JavaScript
...
static associate(models) {
    Notes.belongsTo(models.Priorities, {foreignKey:"importance"})
}
...
```
4. Status:
```JavaScript
...
static associate(models) {
    Status.hasMany(models.Goals, {foreignKey:"status"})
    Status.hasMany(models.Tasks, {foreignKey:"status"})
}
...
```
3. Priorities:
```JavaScript
...
static associate(models) {
    Priorities.hasMany(models.Notes, {foreignKey:"importance"})
}
...
```