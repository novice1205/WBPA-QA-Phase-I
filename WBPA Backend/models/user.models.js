import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        lastLogin:{
            type: Date,
            default: Date.now
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date
    },{
        timestamps: true
    }
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,saltRound);

        this.password = hashedPassword;
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
    } catch (error) {
        
    }
};

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};
  

const User = mongoose.model('users',userSchema);

export default User;