# Pushing you Onward with your knowledge of Authentication.

* **DISCLAIMER** Authentication is a subject that many people spend a large amount time throughout their careers obtaining knowledge over. This is not something we expect you to have a mastery over, rather, we're preparing you to be able have an intelligent conversation about the subject.

![UnAuthorized](keep-calm-you-are-not-authorized.png)

* The objective of this challenge is to get you used to answering a few questions about Authentication.
* We also have some more reps for you to help hammer in the knowledge you've thus far learned.
* Answers to your written questions will be recorded in _Answers.md_
* This is to be worked on alone but you can use outside resources. You can _reference_ any old code you may have, and the React Documentation, however, please refrain from copying and pasting any of your answers. Try and understand the question and put your responses in your own words. Be as thorough as possible when explaining something.
* **Just a friendly Reminder** Don't fret or get anxious about this, this is a no-pressure assessment that is only going to help guide you here in the near future. This is NOT a pass/fail situation.

## Start by forking and cloning this repository.

## Questions - Self Study - You can exercise your Google-Fu for this and any other _Sprint Challenge_ in the future.

1. Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.
   There are two types of middleware, the normal kind and higher order. Higher order is used as a server.use so that it is global middleware. The normal kind of middleware is basically a function that you write and have do whatever you want, but the main point is that it runs within a server request, but before it actually performs the request. For example you could have a server.get that shows all users in a database, but you can set an authenticate middleware that would run and check if your authenticated BEFORE it runs the remainder of the server.get.

1. What does bcrypt do in order to prevent attacks?
   Bcrypt allows one way encryption of passwords, and the ability to easily check and compare plain text passwords to see if they match the encrypted password thats stored in the database. This makes it so the plaintext password is never sent leaving the ability to sniff or hack much harder. Bcrypt also allows you to add a salt to the encrypted password making it that much harder to hack using techniques such as a rainbow table and bruteforce attack. You are also able to add rounds which basically add time between hash attemps. Changing the rounds could change it from 1 attempt per 1ms up to or more than 500ms per attempt which in the long run could add years to the time it would take to hack a password.

1. What are the three parts of the JSON Web Token?
   A JWT is broken down into 3 parts including the Header, payload, and Signature. It would be displayed in the Dev tools as
   XXXXXX.YYYYYYY.ZZZZZZZZZ
   HEADER.PAYLOAD.SIGNATURE
   Header - Usually contains the type of token (JWT) and the hashing type.
   Paypload - Contains claims which are statements about an entity, usually the user, and other metadata.
   Signature - The signature takes care of encoding it all so its easily readable in HTTP. You take the encoded header, the encoded paypload, a secret, and the algorithm specified in the header and sign it all.

## Project Description - User Management System - Jokes On YoU!

* What we have here is a wise-guy application. _Dad jokes_ are all the rage these days.
* Our main problem with the application now is that we are trying to receive some mad dad jokes that are being requested from an external api, but we are locked out.
* Trust me, we all need these dad jokes in our lives.
* In order to be able to access our Killer Jokes you'll need to implement a User Authentication System that uses bcrypt and JWT.

## Initializing the Project

* `cd` into the root of the project and run `npm install`.
* Once you have your `node_modules` go ahead and start your `mongod` server \* I recommend using the `mongod --dbpath data` flag.
* Run `nodemon app.js` to start your node server.
* **TEST** this project using **`POSTMAN`**. Once you finish the project, you'll be tasked to set up `cors` properly for use with a client.

### Step 1: Implement your User Schema in `api/models/userModels.js`

* The required fields are `username` (must be unique and required) and `password`.

```
{
  "username": "Tony@stark.com",
  "password": "pepperpots"
}
```

### Step 2: Implement your Create User Functionality.

* Start in `api/utils/middlewares.js`.
* Follow the steps provided in the `encryptPW` function. Once done there, head back here for further instructions.
* Check out `api/controllers/user.js`. There are some things to implement there.
* Once you have your controller implemented, head over to your `api/routes/routes.js` file and notice we have a controller missing. Go ahead and pass in this controller.
* **TEST** your `/api/user` _POST_ to ensure you can create a user with an encrypted password.

### Step 3: Users Gotta Login!

* This step will be real fun.
* Head over to your `comparePW` function in `api/utils/middlwares.js` and follow the instructions for the that piece of login `middleware`.
* Once you have compared passwords with `bcrypt`, you'll need to `**ENSURE THAT**` you have set the `req.username` as the user's `username`. Without it, your `login controller` won't know what to do and you'll receive this error:

```
 error: 'no username check your comparePW middleware'
```

### Step 4: _GET_ your Jokes!

* Grab your Token sent back to you in JWT format from _/login_.
* Send a `GET` request up to `/api/jokes` with the appropriate
* Without the appropriate request you'll get an error that looks like this from the `jwt` package

```
{
    "name": "JsonWebTokenError",
    "message": "invalid signature"
}
```

### Stretch Problem: Build a front end to interface with your User Auth System

* In order to play around with a client server app, you'll need to set up your `cors` inside of `server.js` properly.
* Using React and Redux and React Router, create a `Sign Up`, `Sign In` and `Jokes` page.
* Once you have the functionality down, you'll be able to style it up a bit and play around with the jokes etc.
