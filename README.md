

CarService
![Backend](https://github.com/Tazi34/CarService/workflows/Backend/badge.svg) [![Netlify Status](https://api.netlify.com/api/v1/badges/8ef72f63-acbc-492b-abc7-5fa21d66fde7/deploy-status)](https://app.netlify.com/sites/carservice-tazi34/deploys)
====== 


Car booking site for both clients and admins. 

Learning project developed to practice frontend and backend skills.

Link to app: https://carservice-tazi34.netlify.com/

## Table of contents
* [Preview](#preview)
* [Built with](#built-with)
* [Getting started](#getting-started)
* [Setup](#setup)
* [Features](#features)

## Built with
#### Frontend
* React  v16.12.0
* Redux v7.2.0
* Material-UI v4.9.3
* Yup
* Final-Form
#### Backend
* Java 12
* Spring Boot v2.1.9
* Spring Security v5.1.6
* Spring Data v2.1.9


## Getting Started
To explore app you can create your own user account or use existing one with provided sample data.

Sample user credentials:
  * Email: test@test.com
  * Password: test

In order to access site as an admin you should use this predefined account:
   * Email: admin@admin.com
   * Password: admin  
## Setup
Backend is running on heroku and fronted is deployed to netlify. 

In order to run app on localhost follow these steps:
* Start backend
```
$ cd ../backend
$ mvn spring-boot:run
```
* Run
```
$ cd ../web-app
$ npm install
$ npm start
```
## Features
* User
  * car booking
  * booking cancelling
  * history of reservations
* Admin
  * making car unavailable (e.g visit to car repair shop)
  * listing all statuses (user's bookings, cars failures etc.)
  * adding, listing, deleting cars

* Other
  * Server side sorting and pagination
  * Role based authorization
  * Responsive
## Preview
### Admin home page
![Admin home page](https://i.imgur.com/h8QGEGd.png)
### Reservations history
![Reservation](https://i.imgur.com/qIXeoau.png)
### Admin car panel
![car panel](https://i.imgur.com/NbJZDZv.png)
### Booking summary
![summary](https://i.imgur.com/KZ3oeJq.png)

### Admin status panel
![status panel](https://i.imgur.com/BUgfq8K.png)
