
module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var User = new Schema({
	    user: { type: String, required: true, index: { unique: true } },
	    pasword: { type: String, required: true },
	    roles:{ type: [String], required:false}
	});

/*
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
*/

    return mongoose.model('User', User);
};