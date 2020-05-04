const User                  = require('../models/user');
const { normalizeErrors }   = require('../helpers/mongoose');
const jwt                   = require('jsonwebtoken');
const config                = require('../config/dev');

exports.auth = function(req,res) {
    const {email, password} = req.body;

    if(!password || !email) {
        return res.status(422).send({errors: [{title: 'Data is Missing!', detail: 'Please provide email and password'}]});
     }

     User.findOne({email}, function(err, user) {
         if(err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
         }
         if(!user) {
            return res.status(422).send({errors: [{title: 'Invalid User', detail: 'User does not exist'}]});
         }
         if(user.isSamePassword(password)) {
            const jwtAuth = jwt.sign({
                userId: user.id,
                username: user.username
            }, config.SECRET, {expiresIn: '1hr'});

            return res.json(jwtAuth);
        } else {
            return res.status(422).send({errors: [{title: 'Incorrect Data', detail: 'Incorrect Email or Password entered'}]});
         }
     });
};

exports.register = function(req,res) {
    const {username, email, password, passwordConfirmation} = req.body;

    if(!password || !email) {
       return res.status(422).send({errors: [{title: 'Data is Missing!', detail: 'Please provide email and password'}]});
    }
    if(password != passwordConfirmation) {
        return res.status(422).send({errors: [{title: 'Invalid password', detail: 'Please provide matching passwords'}]});
    }

    User.findOne({email}, function(err,existingUser) {
        if(err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if(existingUser) { 
            return res.status(422).send({errors: [{title: 'Invalid email', detail: 'A user with that email already exists'}]});
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function(err){
            if(err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            
            return res.json({'registered': true});
        });
    })
    // res.json({username, email});
};

exports.authMiddleware = function(req,res,next) {
    const token = req.headers.authorization;
    if(token) {
        const user = parseToken(token);

        User.findById(user.userId, function(err, user){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            } 
            if(user) {
                res.locals.user = user;
                next();
            }
            else {
                return notAuthorized(res);
            }
        });
    } else {
        return notAuthorized(res);
    }
}

function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
    return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'You need to login to do that...'}]});
}