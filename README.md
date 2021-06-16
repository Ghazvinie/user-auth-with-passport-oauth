# Sign Up App

## An app that authenticates a user using an email and password, or with their Google account (OAuth2)

The app allows a user to sign up and access a protected resource.
- User signs up with an email and password. Password is hashed and along with other details stored to the database. 
- The user can also sign up and sign in with their Google account.
- On successful user authentication, the user is then authorised to view dashboard.
- The app uses Passport strategies to implement this process.

### Built with:
- JavaScript
- NodeJs 16.1.0 / Express 4.17.1
- Passport 0.4.1
- HTML / CSS
- MongoDB / Mongoose 5.12.12

### To run:

```
$ npm install
```

```
$ npm run start
```

The app is now accessible from localhost:[YOUR_PORT]

You will need to provide your own MongoDB URI in environmental variables (process.env.MONG_URI), as well as your own Google client ID (PROCESS.ENV.CLIENT_ID) and client secret (process.env.CLIENT_SECRET).

### Tests


### License 
