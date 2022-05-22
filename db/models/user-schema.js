const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const bcrypt = require('bcrypt');
const saltRounds = 10;



//Define a schema
const Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: 'Two users cannot share the same email ({VALUE})',
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
    },
   phone: {
        type: String
    },
    ville: {
        type: String
    },
    adresse: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'GUEST'
    },
    avatar: {
        type: String,
        required: true,
        default: 'avatardefault.png'
    },
    paniers:[{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Panier' 
    }],

}, {
    timestamps: true
});


UserSchema.plugin(beautifyUnique);


// hash user password before saving into database
UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const user = this;
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();

});

function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}



module.exports = mongoose.model('User', UserSchema);