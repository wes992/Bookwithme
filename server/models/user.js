const   bcrypt      = require('bcrypt');
const   mongoose    = require('mongoose');
const   Schema      = mongoose.Schema;


const userSchema  = new Schema({
    username: {
        type: String,
        min: [4, 'username must be between 4 & 32 characters'],
        max: [32, 'username must be between 4 & 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Username is required'
    },
    email: {
        type: String,
        min: [4, 'username must be between 4 & 32 characters'],
        max: [32, 'username must be between 4 & 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        max: [32, 'password must be between 4 & 32 characters'],
        min: [4, 'password must be between 4 & 32 characters'],
        required: 'Password is Required'
    },
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}]
});

userSchema.methods.isSamePassword = function(requestedPassword) {
    return bcrypt.compareSync(requestedPassword, this.password);
}


userSchema.pre('save', function(next){

    const saltRounds = 10,
          user = this;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});
module.exports = mongoose.model('User', userSchema);