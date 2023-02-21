<h1 align="center">API Rest Cookenu</h1>

##  ℹ️About
API REST developed with the objective of simulating a social media in which the users can share recipes. A user can follow other users to see their recipes and also share their own content. Data architecture, user authentication and cryptography were implemented.

## 🔗Documentation
https://documenter.getpostman.com/view/25256145/2s93CGRbBT

## 🔗Deploy
https://cookenu24.onrender.com

## ☑️Requests
- SignUp
- Login
- Delete Account
- Get Account Information
- Get Another User's Account Information
- Follow An Account
- Unfollow An Account
- Create Recipe
- Edit Recipe
- Delete Recipe
- Get Recipes
- Get Recipe By Id
- Recover Password

## 💻Technologies
- Node.js
- TypeScript
- Express.js
- Knex.js
- MySQL

## 🛰Running the project
<pre>
  <code>git clone https://github.com/future4code/Barros-cookenu24.git</code>
</pre>

<pre>
  <code>cd Barros-cookenu24</code>
</pre>

<pre>
  <code>npm install</code>
</pre>

Create a file .env and complete the following variables:
<pre>
  <code>
    DB_HOST = ""
    DB_USER = ""
    DB_PASSWORD = ""
    DB_SCHEMA = ""

    PORT = 3003
    JWT_KEY = "cookenu"
    BCRYPT_COST = 12

    NODEMAILER_USER = ""
    NODEMAILER_PASS = ""
  </code>
</pre>

To add the tables to your database, run the following command:
<pre>
  <code>npm run migrations</code>
</pre>

To initialize the project:
<pre>
  <code>npm run start</code>
</pre>

Finally, you can use Postman or another similar tool to test the endpoints.
