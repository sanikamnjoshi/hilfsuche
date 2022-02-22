 ;

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const JwtSecret = process.env.JWT_SECRET  ||'very secret secret';

const UserModel = require('../models/UserModel');


const login = (req,res) => {
    // alert('login sendmail() function is called');
    console.log("auth login!!!")
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request - password',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request - email',
        message: 'The request body must contain a user email property'
    });

    // req.body.username
    // req.body: what we wrote in the fields
    // user
    UserModel.findOne({email: req.body.email}).exec()
        .then(user => {
            /*
            console.log('what we get from db:');
            console.log(user);
            console.log('req - what you input in web: ');
            console.log(req.body);
*/
            // check if the password is valid
            const isPasswordValid = req.body.password == user.password;
            // const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            // Hint: check bcrypt.compareSync() function
/*
            console.log('comparison:');
            console.log(isPasswordValid);
*/
            
            if (!isPasswordValid) return res.status(401).send({token: null });

            // if user is found and password is valid
            // create a token: sign(payload, privateKey, signOptions)
            const token = jwt.sign({ 
                id: user._id, 
                username: user.username, 
                email: user.email, 
                firstName: user.firstName, 
                lastName: user.lastName, 
                tel: user.phoneNr 
            }, 
            JwtSecret, 
            {
                expiresIn: 86400 // expires in 24 hours
            });

            console.log("token......"+token);
            res.status(200).json({token: token});

        })
        .catch(error => res.status(404).json({
            // error: 'User Not Found',
            error: req.body,
            // error: user.password,
            message: error.message
        }));

};


const register = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request - password',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request - email',
        message: 'The request body must contain a email property'
    });

    const user = Object.assign(req.body, {password: req.body.password});

    // mongoose: Model.create(): https://mongoosejs.com/docs/api.html#model_Model.create
    // Model.create(ObjectToInsert, [options], [callback])
    // RETURN: Promise
    UserModel.create(user)
        .then(user => {
            console.log('auth.js: register() ' + JSON.stringify(user));
            // if user is registered without errors
            // create a token
            const token = jwt.sign({ 
                id: user._id, 
                email: user.email,
                phoneNr: user.phoneNr,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                subscribe: user.subscribe
            }, 
            JwtSecret, 
            {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});
        })
        .catch(error => {
            if(error.code == 11000) {
                res.status(400).json({
                    error: 'User exists',
                    message: error.message
                })
            }
            else{
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });

};


const me = (req, res) => {
    /* select argument should be sperated by space "/\s+/" 
        --> find it in mongoose.findById() mongoose.select():
        /node_modules/mongoose/lib/query.js
           UserModel.findById(req.userId).select('username').exec()
        
        https://mongoosejs.com/docs/api.html#model_Model.findById
        Model.findById(id, [projection], [options], [callback]);
        RETURN: Query

        https://mongoosejs.com/docs/api.html#query_Query-select
        Query.prototype.select()
        RETURN: Query

        https://mongoosejs.com/docs/api.html#query_Query-exec
        Query.prototype.exec()
        RETURN: Promise
     */
    UserModel.findById(req.userId).select('userName firstName lastName email phoneNr password subscribe').exec()
        .then(user => {
            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });
            // console.log('controller-auth-me()' + user); // Output current user in backend-npm-terminal
            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};

module.exports = {
    login,
    register,
    logout,
    me
};