import { catchAsyncError } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"


export const patientRegister = catchAsyncError(async(req, res, next) => {
    const {firstName, lastName, email, phone, password, gender, dob, role} = req.body

    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !role
    ){
        return next(new ErrorHandler("Please fill all the fields", 400))
    }
    let user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler("User already exist", 400))
    }
    user = await User.create({firstName, lastName, email, phone, password, gender, dob, role});
    generateToken(user, "user registered", 200, res)
})



export const login = catchAsyncError(async(req,res,next) => {
    const {email, password, confirmPassword, role} = req.body

    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please provide all details", 400))
    }
    if(password !== confirmPassword){
        return next(new ErrorHandler("password does not matched", 400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user) {
        return next(new ErrorHandler("Invalid Password Or Email", 400))
    }


    const isPasswordMatched = await user.comparePass(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password Or Email", 400))
    }

    if (role !== user.role){
        return next(new ErrorHandler("user with this role not found", 400))
    }
    generateToken(user, "user logedin", 200, res)
});


export const addNewAdmin = catchAsyncError(async(req,res,next) => {
    const {firstName, lastName, email, phone, password, gender, dob} = req.body

    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob
    ){
        return next(new ErrorHandler("Please fill al the fields", 400))
    }

    const isRegistered = await User.findOne({email});

    if(isRegistered) {
        return next(new ErrorHandler("Admin with this already exists!", 400))
    }
    const admin = await User.create({
        firstName, lastName, email, phone, password, gender, dob, role: "Admin",
    })

    res.staus(200).json({
        success: true,
        message: "new admin created",
        admin
    })
})

export const getAllDoctors = catchAsyncError(async(req,res,next) => {
    const doctors = await User.find({role: "client"});
    res.status(200).json({
        success:true,
        doctors
    })
})

export const getUserDetails = catchAsyncError(async(req,res,next) => {
    const user = req.user
    res.status(200).json({
        success:true,
        user
    })
})

export const logoutAdmin = catchAsyncError(async(req,res,next) => {

    res.status(200).cookie("adminToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"Admin logged out successfully"
    })
})

export const logoutPatient = catchAsyncError(async(req,res,next) => {

    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now())
    }).json({
        success:true,
        message:"user logged out successfully"
    })
})

export const addNewDoctor = catchAsyncError(async(req,res,next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Image is required", 400))
    }
    console.log(req)

    const avatar = req.files.avatar;
    // const allowedFormats =["image/png", "image/jpg", "image/jpeg", "image/webp"];
    // if(!allowedFormats.includes(avatar.mimetype)){
    //     return next(new ErrorHandler("Image format not supported", 400))
    // }

    const {firstName, lastName, email, phone, gender, dob, reason} = req.body

    if(!firstName || !lastName || !email || !phone || !gender || !dob || !reason){
        return next(new ErrorHandler("fill all the details", 400))
    }

    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler("id with entered email is already registered", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath);

    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("cloudinary Error:", cloudinaryResponse.error || "unknown error(cloudinary)")
    }

    const doctor = await User.create({
        firstName, lastName, email, password:"12345678", phone, gender, dob, reason, role: "client", avatar:{
            public_id: cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    })

    res.status(200).json({
        success:true,
        message: "new client registered",
        doctor
    })
})