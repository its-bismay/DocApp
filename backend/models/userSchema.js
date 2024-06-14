import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First name must contain at least 3 characters"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last name must contain at least 3 characters"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    phone:{
        type: String,
        required: true,
        minLength: [10, "Phone number must contain exact 11 digits!"],
        maxLength: [10, "Phone number must contain exact 11 digits!"]
    },
    password:{
        type: String,
        required: true,
        minLength:[8, "password must contain 10 characters!"],
        select: false
    },
    dob:{
        type:Date,
        required:[true, "DOB is required!"]
    },
    gender:{
        type:String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin", "Patient", "client"]
    },
    reason: {
        type: String,
    },
    avatar: {
        public_id: String,
        url: String,
    }
})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})


userSchema.methods.comparePass = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

export const User = mongoose.model("User", userSchema)