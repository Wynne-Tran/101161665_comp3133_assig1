const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const {graphqlHTTP} = require('express-graphql')

const graphqlSchema = require('./graphql/schema')
const graphqlResolvers = require('./graphql/resolver')

const Profile = require('./models/profile');
const Listing = require('./models/list');
const Booking = require('./models/book')


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post('/login', async (req, res) => {
    console.log(req.body.username)
    const user = await Profile.findOne({username: req.body.username, password: req.body.password});
    console.log(user)
    try {
        if(user){
          res.send(user);
        }else{
          res.send(JSON.stringify({status:false, message: "No user found"}))
        }
      } catch (err) {
        res.status(500).send(err);
      }
})




app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
    })
)

const DB_URL = "mongodb+srv://101161665_assignment2:101161665@cluster0.ivcmc.mongodb.net/101161665_comp3133_assig1?retryWrites=true&w=majority"


// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => {
    app.listen(3000, console.log("sucessfully connected to the database mongoDB Atlas Server"))
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});