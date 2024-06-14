import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncError(async (req, res, next) => {
  const {firstName,lastName,email,phone,dob,gender,appdate,cause,address,status} = req.body;


  if(!firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appdate ||
    !cause ||
    !address ||
    !status){
        return next(new ErrorHandler("please fill all the details", 400))
    }

    const appointment = await Appointment.create({
        firstName,lastName,email,phone,dob,gender,appdate,cause,address,status
    })

    res.status(200).json({
        success:true,
        message:"Appointment sent successfully!",
        appointment
    })
});


export const getAllAppointments = catchAsyncError(async(req,res,next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments,
    })
})


export const updateAppointmentStatus = catchAsyncError(async(req,res,next) => {
    const{id} =  req.params;
    let appointment = await Appointment.findById(id)

    if(!appointment){
        return next(new ErrorHandler("Appointment does not exist", 400))
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        message:"Appointment Status Updated",
        appointment,
    })
}
)

export const deleteAppointment = catchAsyncError(async(req,res,next) => {
    const{id} =  req.params;
    let appointment = await Appointment.findById(id)

    if(!appointment){
        return next(new ErrorHandler("Appointment does not exist", 400))
    }

    await appointment.deleteOne()
    res.status(200).json({
        success:true,
        message: "Appointment deleted successfully!"
    })
})
