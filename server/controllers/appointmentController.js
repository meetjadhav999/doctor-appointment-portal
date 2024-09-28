const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel")
const getallappointments = async (req, res) => {
  try {
    if(req.user.isDoctor){
      const doc = await Doctor.findOne({userId:req.user._id.toString()})
      const pendingAppointments = await Appointment.find({doctorId:doc._id.toString(),status:'Pending'})
      const approvedAppointments = await Appointment.find({doctorId:doc._id.toString(),status:'Approved'})
      const completedAppointments = await Appointment.find({doctorId:doc._id.toString(),status:'Completed'})

      return res.send({message:"Appointments fetched successfully",success:true,data:{
        pending:pendingAppointments,
        approved:approvedAppointments,
        completed:completedAppointments
      }});

    }
    const pendingAppointments = await Appointment.find({userId:req.user._id.toString(),status:'Pending'})
    const approvedAppointments = await Appointment.find({userId:req.user._id.toString(),status:'Approved'})
    const completedAppointments = await Appointment.find({userId:req.user._id.toString(),status:'Completed'})

  return res.send({message:"Appointments fetched successfully",success:true,data:{
    pending:pendingAppointments,
    approved:approvedAppointments,
    completed:completedAppointments
  }});
  } catch (error) {
    res.status(500).send("Unable to get apponintments");
  }
};

const bookappointment = async (req, res) => {
  try {
    console.log(req.body.time)
    const appointment = await Appointment({
      date: req.body.date,
      time: req.body.time,
      doctorId: req.body.doctorId,
      userId: req.user._id,
      username:req.user.name,
      doctorName:req.body.doctorName
    });
    const doctor = await Doctor.findById(req.body.doctorId)
    const doctorUser = await User.findById(doctor.userId)
    const unseenNotification = {
        message: `You booked an appointment with Dr. ${doctor.firstName} ${doctor.lastName} for ${req.body.date} at ${req.body.time[0]} to ${req.body.time[1]}`,
        
        onClickPath: "/appointments",
      };
          
      req.user.unseenNotification.push(unseenNotification)
      await req.user.save()
    

    const doctornotification = {
      message: `You have an appointment with ${req.user.name} on ${req.body.date} at ${req.body.time[0]} to ${req.body.time[1]}`,
      onClickPath: "/appointments",
    }
    doctorUser.unseenNotification.push(doctornotification)
    

    await doctorUser.save();

    const result = await appointment.save();
    return res.status(201).send({message:"appointment created successfully!",success:true,data:result});
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book appointment");
  }
};

const approved = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Approved" }
    );

    const usernotification = {
      message: `Your appointment with ${appointment.doctorName} has been Approved`
    }

    const patient = await User.findById(appointment.userId);
    console.log(patient)

    patient.unseenNotification.push(usernotification)
    await patient.save()


    const doctornotification = {
      message: `You have approved appointment with ${appointment.username}`,
    };

    const doctor = await Doctor.findById(appointment.doctorId)
    const doctorUser = await User.findById(doctor.userId)

    doctorUser.unseenNotification.push(doctornotification)

    await doctorUser.save();

    return res.status(201).send({message:"Appointment approved",success:true});
  } catch (error) {
    console.log(error.message)
    res.status(500).send({message:"Unable to approve appointment",success:false});
  }
};


const completed = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Completed" }
    );

    const usernotification = {
      message: `Your appointment with ${appointment.doctorName} has been completed`
    }

    const patient = await User.findById(appointment.userId);
    patient.unseenNotification.push(usernotification)
    await patient.save()


    const doctornotification = {
      message: `Your appointment with ${appointment.username} has been completed`,
    }

    const doctor = await Doctor.findById(appointment.doctorId)
    const doctorUser = await User.findById(doctor.userId)

    doctorUser.unseenNotification.push(doctornotification)

    await doctorUser.save();

    return res.status(201).send({message:"Appointment completed",success:true});
  } catch (error) {
    res.status(500).send({message:"Unable to complete appointment",success:false});
  }
};

const decline = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete(
      { _id: req.body.appointid }
    );
    console.log(appointment)

    const usernotification = {
      message: `Your appointment with ${appointment.doctorName} has been declined`
    }

    const patient = await User.findById(appointment.userId);
    patient.unseenNotification.push(usernotification)
    await patient.save()


    const doctornotification = {
      message: `Your appointment with ${appointment.username} has been declined`,
    }

    const doctor = await Doctor.findById(appointment.doctorId)
    const doctorUser = await User.findById(doctor.userId)

    doctorUser.unseenNotification.push(doctornotification)

    await doctorUser.save();

    return res.status(201).send({message:"Appointment declined",success:true});
  } catch (error) {
    res.status(500).send({message:"Unable to decline appointment",success:false});
  }
};
const cancel = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete(
      { _id: req.body.appointid }
    );
    console.log(appointment)

    const usernotification = {
      message: `Your appointment with ${appointment.doctorName} has been canceled`
    }

    const patient = await User.findById(appointment.userId);
    patient.unseenNotification.push(usernotification)
    await patient.save()


    const doctornotification = {
      message: `Your appointment with ${appointment.username} has been canceled`,
    }

    const doctor = await Doctor.findById(appointment.doctorId)
    const doctorUser = await User.findById(doctor.userId)

    doctorUser.unseenNotification.push(doctornotification)

    await doctorUser.save();

    return res.status(201).send({message:"Appointment canceled",success:true});
  } catch (error) {
    res.status(500).send({message:"Unable to cancel appointment",success:false});
  }
};



module.exports = {
  getallappointments,
  bookappointment,
  completed,
  approved,
  decline,
  cancel
};