const express = require('express');
const app = express();
const User = require('./model/user');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
var cors = require('cors');
app.use(cors());

require('dotenv/config');

app.use(express.json());

const mongoose = require('mongoose');

app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
   res.send('Hello World');
});

app.post('/create_user', async (req, res) => {
   try {
      const myuser = new User(req.body);
      await myuser.save();
      return res.send(myuser);
   } catch (error) {
      console.log(error);
   }
});

app.post('/auth', async (req, res) => {
   const {email, password} = req.body;
   try {
      const user = await User.findOne({email: email, password: password});
      if (!user) {
         res.send('User not found');
      } else {
         console.log(user);
         res.send(user);
      }
   } catch (error) {
      return console.log(error);
   }
});

app.post('/addToken', async (req, res) => {
   const {email, token} = req.body;
   console.log(email, token);
   try {
      const userToken = await User.findOne({email: email});
      const user = await User.findOneAndUpdate({email: email}, {token: token});
      if (!user) {
         res.send('User not found');
      } else {
         res.send(user);
      }
   } catch (error) {
      return console.log(error);
   }
});

app.post('/subToken', async (req, res) => {
   const {email} = req.body;
   try {
      const userToken = await User.findOne({email: email});
      const user = await User.findOneAndUpdate({email: email}, {token: userToken.token - 1});
      if (!user) {
         res.send('User not found');
      } else {
         res.send(user);
      }
   } catch (error) {
      return console.log(error);
   }
});

app.get('/getToken', async (req, res) => {
   const {email} = req.body;
   try {
      const userToken = await User.findOne({email: email});
      if (!userToken) {
         res.send('User not found');
      } else {
         res.send(userToken);
      }
   } catch (error) {
      return console.log(error);
   }
});

mongoose.connect(process.env.DB_CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true}, (req, res) => {
   console.log('connected to db');
});

app.listen(port, () => {
   console.log('server is running on port 5000');
});
