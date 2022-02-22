const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = express.Router();
const userRoutes = express.Router();
const mailRoutes = express.Router(); // mail
const msgRoutes = express.Router(); // message inside our web
const PORT = 3000;

const middlewares    = require('./middlewares');
const AuthController = require('./src/controllers/auth');
const MailController = require('./src/controllers/mail');
const MsgController = require('./src/controllers/msg');

let Post = require('./src/models/PostModel');
let User = require('./src/models/UserModel');

app.use(cors());
app.use(bodyParser.json());
/* email */
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb://127.0.0.1:27017/hilfsuche', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

postRoutes.route('/').get(function(req, res) {
    Post.find(function(err, posts) {
        if (err) {
            console.log(err);
        } else {
            res.json(posts);
        }
    });
});

userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.post('/login', AuthController.login);    // http://localhost:3001/#/login
userRoutes.post('/register', AuthController.register);
userRoutes.get('/me', middlewares.checkAuthentication , AuthController.me);
userRoutes.get('/logout', middlewares.checkAuthentication, AuthController.logout);

postRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Post.findById(id, function(err, post) {
        res.json(post);
    });
});

userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

postRoutes.route('/add').post(function(req, res) {
    let post = new Post(req.body);
    post.save()
        .then(post => {
            res.status(200).json({'post': 'post added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new post failed');
        });
});

userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

postRoutes.route('/update/:id').post(function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (!post)
            res.status(404).send("data is not found");
        else
            post.title = req.body.title;
            post.content = req.body.content;
            post.location = req.body.location;
            post.locationName = req.body.locationName;            
            post.category = req.body.category;
            post.isFullfilled = req.body.isFullfilled;
            post.isGiver = req.body.isGiver;

        post.save().then(post => {
            res.json('Post updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

userRoutes.route('/update/:id').post(function(req, res) {
    Post.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.firstName = req.body.title;
            user.lastName = req.body.location;
            user.phoneNr = req.body.content;
            user.password = req.body.isFullfilled;
            user.subscribe = req.body.isGiver;

        user.save().then(user => {
            res.json('User updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/posts', postRoutes);
app.use('/auth', userRoutes);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

/* Mail */
app.use('/mail', mailRoutes);
mailRoutes.post('/sendemail', MailController.sendmail); // http://localhost:3001/#/mail/sendemail

/* Msg */
app.use('/msg', msgRoutes);
msgRoutes.get('/', MsgController.getMsgList);  // GET http://localhost:3001/#/msg/in
msgRoutes.get('/:id', MsgController.getMsg);  // GET http://localhost:3001/#/msg/:id	
msgRoutes.post('/', MsgController.sendMsg);  // POST http://localhost:3001/#/msg/