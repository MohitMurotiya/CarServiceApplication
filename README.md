<h1 align="center">On-Demand Car Service Application</h1>

## ▶️ [Demo](https://youtu.be/bNtYqpdhYRc)

## 🎯 About

I have started this project with the purpose of learning how to structure a Web App using MERN stack.

- Created REST-APIs with NodeJS & Express.
- Created Front-End using React.
- Used MongoDB Atlas for database.
- Used JWT for Authentication and Authorization.
- After Login Each User is route according to his/her role and will able to see only his/her functionalities only. And If he tries to access with URL he’ll be not able to do it.
- There are 3 Roles ADMIN, MECHANIC & CUSTOMER.
- For more Informatiom about the [functionalities](https://github.com/MohitMurotiya/CarServiceApplication/blob/master/Documentation) of each role. 

## Technologies Used 

- [React](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Material-Table](https://material-table.com/#/)
- [react-hook-form](https://react-hook-form.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud)
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)

## :white_check_mark: Requirements

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.<br/>

## Run Locally

- To clone the Project

```bash
  git clone https://github.com/MohitMurotiya/CarServiceApplication.git
```
- Go to the Front-End project directory

```bash
  cd Client/ca-wash-system
```
- To Run the [Font-End](https://github.com/MohitMurotiya/CarServiceApplication/blob/master/Client/car-wash-system/README.md) check this.

### For Back-End
- Create a account in [Atlas](https://account.mongodb.com/account/login)
- Deploy a free tier Cluster and create a Database.

#### Configure your Database with NodeJs

- Go to the Back-End project directory

```bash
  cd Server
```
- There are 4 Microservices
- Inside each Microservice a dbConfig.js file is there in config folder. Inside that you have to provide your database credentials.
- Install dependencies for each Microservice (Admin, Customer, Mechaninc, Order).

```bash
  cd Admin
```

```bash
  npm install
```
- Start the server of all Microservices.

```bash
  node Server.js
```

- For the ADMIN access you need to insert a record mannually in the members database as a role ADMIN. 


